const axios = require("axios");
const multer = require("multer");
const FormData = require("form-data");
const fs = require("fs");
const Victim = require("../models/VictimModel");
const Evidence = require("../models/EvidenceModel");
const { log } = require("console");

require("dotenv").config();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save uploads in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Add a unique timestamp to the filename
  },
});

// Initialize multer upload handler
const upload = multer({
  storage: storage
  // Additional options like file size limits or file types can be added here
}).fields([
  { name: "profilePicture", maxCount: 1 },
  { name: "evidenceImages", maxCount: 10 },
  { name: "evidenceVideos", maxCount: 5 },
]);

// Upload file to IPFS using Pinata
const uploadToIPFS = async (file) => {
  const formData = new FormData();
  formData.append("file", fs.createReadStream(file.path));
  formData.append("pinataMetadata", JSON.stringify({ name: file.originalname }));
  formData.append("pinataOptions", JSON.stringify({ cidVersion: 0 }));

  try {
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
        },
      }
    );
    return response.data.IpfsHash;
  } catch (error) {
    console.log("Error uploading to IPFS:", error.message);
    throw new Error("Error uploading to IPFS");
  }
};

// Main function to handle file upload for FIR
const fileFir = async (req, res) => {
  try {
    // Destructure body data
    const { descriptionOfCrime, place, crimeSection, dateTime, victimName, victimGender, victimAge, witnessName, victimAadharCardNo, witnessAadharCardNo } = req.body;
    
    let ipfsVictimHash;
    let ipfsEvidenceImageHash = [];
    let ipfsEvidenceVideoHash = [];
  
    let victimDocId;
    let evidenceImageDocId;
    let evidenceVideoDocId;

    // Ensure victim profile image is uploaded
    if (!req.files || !req.files.profilePicture) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    console.log("REACHED 1 ");
    
    // Upload victim profile image to IPFS
    try {
      ipfsVictimHash = await uploadToIPFS(req.files.profilePicture[0]);
    } catch (error) {
      return res.status(500).json({ message: "Error uploading victim profile image to IPFS" });
    }

    // Upload evidence images to IPFS (if any)
    if (req.files && req.files.evidenceImages) {
      try {
        // Iterate over each evidence image file and upload one by one
        for (let file of req.files.evidenceImages) {
          const ipfsHash = await uploadToIPFS(file);
          ipfsEvidenceImageHash.push(ipfsHash);

          // Save each image's IPFS hash to the Evidence collection one by one
          await Evidence.create({ hash: ipfsHash });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error uploading evidence images to IPFS" });
      }
    }
    console.log("REACHED 2 ");

    // Upload evidence videos to IPFS (if any)
    if (req.files && req.files.evidenceVideos) {
      try {
        // Iterate over each evidence video file and upload one by one
        for (let file of req.files.evidenceVideos) {
          const ipfsHash = await uploadToIPFS(file);
          ipfsEvidenceVideoHash.push(ipfsHash);

          // Save each video's IPFS hash to the Evidence collection one by one
          await Evidence.create({ hash: ipfsHash });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error uploading evidence videos to IPFS" });
      }
    }
    console.log("REACHED 3 ");

    // Send the data to MongoDB for victim information
    try {
      console.log(descriptionOfCrime, place, crimeSection, dateTime, victimName, victimGender, victimAge, witnessName, victimAadharCardNo, witnessAadharCardNo);

      const victim = await Victim.create({
        name: victimName,
        gender: victimGender,
        age: victimAge,
        aadharCardNo: victimAadharCardNo,
        profilePictureHash: ipfsVictimHash,
      });

      victimDocId = victim._id;
    } catch (error) {
      console.log("Error in MongoDB:", error.message);
      return res.status(500).json({ message: "Server Error when saving to MongoDB" });
    }

    console.log("DONE SUCCESS");
    
    // Send a success response with the collected data
    res.status(200).json({
      ipfsVictimHash,
      ipfsEvidenceImageHash,
      ipfsEvidenceVideoHash,
      victimDocId,
      place,
      crimeSection,
      descriptionOfCrime,
      dateTime,
      victimAadharCardNo,
      witnessName,
      witnessAadharCardNo,
    });
  } catch (error) {
    console.log("Error in fileFir:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getEvidence = async (req, res) => {
  try {
    const { documentId } = req.query; // Retrieve the documentId from the query parameters

    // Find the evidence document by the given documentId
    const evidenceDoc = await Evidence.findById(documentId);

    if (!evidenceDoc) {
      return res.status(404).json({ message: 'Evidence document not found' });
    }

    // Return the hash (image or video link) to the frontend
    res.status(200).json({hash: evidenceDoc.hash});
  } catch (error) {
    console.error('Error fetching evidence:', error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching the evidence',
    });
  }
};

module.exports = { fileFir, upload,getEvidence };

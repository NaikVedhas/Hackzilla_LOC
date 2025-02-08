const axios = require("axios");
const multer = require("multer");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save uploads in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const fileFir = async (req, res) => {
  try {
    // Ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload image to IPFS using Pinata
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    formData.append(
      "pinataMetadata",
      JSON.stringify({ name: req.file.originalname })
    );
    formData.append("pinataOptions", JSON.stringify({ cidVersion: 0 }));

    const pinataResponse = await axios.post(
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

    const ipfsHash = pinataResponse.data.IpfsHash;
    console.log("IPFS Hash:", ipfsHash);

    // Process the other form data (e.g., crime report, victim, witness info)
    const crimeData = {
      descriptionOfCrime: req.body.descriptionOfCrime,
      place: req.body.place,
      crimeAct: req.body.crimeAct,
      crimeSection: req.body.crimeSection,
      dateTime: req.body.dateTime,
      victim: {
        victimName: req.body.victimName,
        victimGender: req.body.victimGender,
        victimAge: req.body.victimAge,
      },
      witness: {
        witnessName: req.body.witnessName,
        witnessAge: req.body.witnessAge,
        witnessGender: req.body.witnessGender,
      },
      imageHash: ipfsHash, // Save the IPFS hash for the uploaded image
    };

    console.log("crimeData",crimeData);
    

    // Save crimeData to your database (MongoDB, etc.)

    res.status(200).json({ message: "Report successfully submitted", data: crimeData });
  } catch (error) {
    console.log("Error in fileFir", error);
    return res.status(500).json({ message: "Server Error bro" });
  }
};

module.exports = { fileFir, upload };

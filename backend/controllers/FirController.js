const axios = require("axios");
const multer = require("multer");
const FormData = require("form-data");
const fs = require("fs");
const Victim = require("../models/VictimModel");
const Evidence = require("../models/EvidenceModel");

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


const uploadToIpfs = () =>{

}



const fileFir = async (req, res) => {
  try {
    // Ensure file is uploaded
    const {descriptionOfCrime,place,crimeSection,dateTime,victimName,victimGender,victimAge,witnessName} = req.body;
  
    let ipfsVictimHash;
    let ipfsEvidenceImageHash;
    let ipfsEvidenceVideoHash;
    
    let victimDocId;
    let evidenceImageDocId;
    let evidenceVideoDocId;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    try {
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
  
      ipfsVictimHash = pinataResponse.data.IpfsHash;
      

      

    } catch (error) {
        console.log("Error in Ipfs",error.message);
        return res.status(500).json({message:"Server Error bro"})
    }
    

    try {
      //Send to mongodb
      const victim = await Victim.create({
        name:victimName,
        gender:victimGender,
        age:victimAge,
        aadharCardNo:victimAadharCardNo,
        profilePictureHash:ipfsVictimHash
      })

      victimDocId = victim._id;

      if(ipfsEvidenceImageHash){
        evidenceImageDocId = await Evidence.create({hash:ipfsEvidenceImageHash});
      }

      if(ipfsEvidenceVideoHash){
        evidenceVideoDocId = await Evidence.create({hash:ipfsEvidenceVideoHash});

      }

    } catch (error) {
      console.log("Error in MongoDb",error.message);
      return res.status(500).json({message:"Server Error bro"})
    }
    

    try {
      //Send data to blockchain

      

    } catch (error) {
      
    }



    


    res.status(200).json({ message: "Report successfully submitted"});
  } catch (error) {
    console.log("Error in fileFir", error);
    return res.status(500).json({ message: "Server Error bro" });
  }
};

module.exports = { fileFir, upload };

const axios = require("axios");
// const Web3 = require("web3");
const Victim = require("../models/VictimModel");
const Witness = require("../models/WitnessModel");
// const { ethers } = require("ethers");
const contractABI = require("../abi.json"); // Import contract ABI
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config();

// Set up Multer for file uploads
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
    try {
      //upload data to ipfs
      // const {place,timeDate,crimeSection,crimeDescription,victimAadharNumber,witnessName,}
      if (!req.file) {
        return res.status(400).json({ message: "Image file is required" });
      }

      console.log("Received Image:", req.file);

      // Upload to IPFS using Pinata
      const formData = new FormData();
      formData.append("file", fs.createReadStream(req.file.path));

      // Metadata required by Pinata
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
      return;
    } catch (error) {}

    try {
      //upload data to mongodb
    } catch (error) {}

    try {
      //upload data to block
    } catch (error) {}
  } catch (error) {
    console.log("Error in fileFir", error);
    return res.status(500).json({ message: "Server Error bro" });
  }
};

module.exports = {
  fileFir,
  upload,
};

const express = require('express');
const {fileFir,upload,getEvidence} = require('../controllers/FirController');

const router = express.Router();

router.post("/file",upload,fileFir);
router.get("/witness",getEvidence)

module.exports = router;
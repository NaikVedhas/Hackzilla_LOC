const express = require('express');
const {fileFir,upload} = require('../controllers/FirController');

const router = express.Router();

router.post("/file",upload.single("image"),fileFir);


module.exports = router;
const express = require('express');
const {fileFir} = require('../controllers/FirController');

const router = express.router();

router.post("/file",fileFir);


module.exports = router;
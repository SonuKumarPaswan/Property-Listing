const express = require("express");
const router = express.Router();
const {upload} = require("../config/cloudinary");
const { createOffice } = require("../controllers/office.controller");




router.post( "/", createOffice)


module.exports = router;
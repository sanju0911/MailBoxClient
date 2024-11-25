const express = require("express");
const router = express.Router();

const { sendMail } = require("../Controllers/mailController");
const authenticate = require("../Auth/Auth");



router.post("/sendmail", authenticate, sendMail);




module.exports = router;
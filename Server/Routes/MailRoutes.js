const express = require("express");
const router = express.Router();

const { sendMail, viewMail } = require("../Controllers/mailController");
const authenticate = require("../Auth/Auth");

router.post("/sendmail", authenticate, sendMail);

router.get("/getmail", authenticate, viewMail);

module.exports = router;

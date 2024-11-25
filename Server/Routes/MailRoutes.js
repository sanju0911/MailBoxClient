const express = require("express");
const router = express.Router();

const {
  sendMail,
  viewMail,
  markAsRead,
} = require("../Controllers/mailController");
const authenticate = require("../Auth/Auth");

router.post("/sendmail", authenticate, sendMail);

router.get("/getmail", authenticate, viewMail);

router.put("/markAsRead/:emailId", authenticate, markAsRead);

module.exports = router;

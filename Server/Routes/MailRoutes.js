const express = require("express");
const router = express.Router();

const {
  sendMail,
  viewMail,
  markAsRead,
  deleteEmail,
  getSentMails,
} = require("../Controllers/mailController");
const authenticate = require("../Auth/Auth");

router.post("/sendmail", authenticate, sendMail);

router.get("/getmail", authenticate, viewMail);

router.put("/markAsRead/:emailId", authenticate, markAsRead);
router.delete("/deleteEmail/:emailId", deleteEmail);

router.get("/getSentMail", authenticate, getSentMails);
module.exports = router;

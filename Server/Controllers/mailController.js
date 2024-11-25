const Email = require("../Models/sendMail");

const sendMail = async (req, res) => {
  try {
    const { to, subject, body } = req.body;

    if (!to || !subject || !body) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const from = req.user.email;

    if (!from) {
      return res.status(400).json({ message: "No user email found." });
    }

    const newEmail = new Email({
      from,
      to,
      subject,
      body,
    });

    await newEmail.save();

    return res.status(201).json({ message: "Mail sent successfully." });
  } catch (error) {
    console.error("Error sending mail:", error);
    return res.status(500).json({ message: "Failed to send mail." });
  }
};

const viewMail = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const emails = await Email.find({ to: userEmail });

    return res.status(200).json(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    return res.status(500).json({ message: "Failed to fetch mails." });
  }
};

module.exports = {
  sendMail,
  viewMail,
};

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

const markAsRead = async (req, res) => {
  try {
    const { emailId } = req.params;
    const userEmail = req.user.email;

    const email = await Email.findOne({ _id: emailId, to: userEmail });

    if (!email) {
      return res.status(404).json({ message: "Email not found." });
    }

    email.read = true;
    await email.save();

    return res.status(200).json({ message: "Email marked as read." });
  } catch (error) {
    console.error("Error marking email as read:", error);
    return res.status(500).json({ message: "Failed to mark email as read." });
  }
};

const deleteEmail = async (req, res) => {
  try {
    const { emailId } = req.params;

    
    const deletedEmail = await Email.findByIdAndDelete(emailId);

    if (!deletedEmail) {
      return res.status(404).json({ message: "Email not found." });
    }

    return res.status(200).json({ message: "Email deleted successfully." });
  } catch (error) {
    console.error("Error deleting email:", error);
    return res.status(500).json({ message: "Failed to delete email." });
  }
};

module.exports = {
  sendMail,
  viewMail,
  markAsRead,
  deleteEmail,
};

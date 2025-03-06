const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// 📩 Configure Nodemailer (Using Gmail SMTP)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,  // Your email
        pass: process.env.PASSWORD // Your email password (or App Password)
    }
});

// 📧 API Endpoint to Send Email
app.post("/send-email", async (req, res) => {
    const {to, subject, message } = req.body;
    if (!to || !subject || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email." });
    }
});

// 🚀 Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const nodemailer = require("nodemailer");
const QueryModel = require("../Model/QuerySchema"); // your Mongoose schema

const QueryRoute = express.Router();

QueryRoute.post("/submit", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Save to DB
    const newQuery = new QueryModel({ name, email, phone, message });
    await newQuery.save();

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "anusuyasoftwaresolutions@gmail.com",
        pass: "expd nlsi kpnb hmas", // use App Password, not your normal password
      },
    });

    // Admin notification
    const adminMailOptions = {
      from: "anusuyasoftwaresolutions@gmail.com",
      to: "anusuyasoftwaresolutions@gmail.com",
      subject: "🔔 New Contact Form Submission",
      html: `
        <h2>New Query Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    // User confirmation
    const userMailOptions = {
      from: "anusuyasoftwaresolutions@gmail.com",
      to: email,
      subject: "✅ We've received your message",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for contacting <strong>Anusuya Software Solutions</strong>. We’ve received your message and will get back to you shortly.</p>
        <br/>
        <p>Regards,<br/>Team Anusuya</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ success: true, message: "Query submitted and emails sent." });
  } catch (error) {
    console.error("Error in submitting query:", error);
    res.status(500).json({ success: false, message: "Something went wrong." });
  }
});

module.exports = QueryRoute;
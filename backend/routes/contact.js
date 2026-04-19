import { Router } from "express";
import { Message } from "../models/DataModels.js";
import nodemailer from 'nodemailer';

const router = Router();

// @route   POST /api/contact
// @desc    Save a contact message to the database and send email notification
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields (name, email, message) are required.",
    });
  }

  try {
    // 1. Save to Database
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // 2. Send Email Notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"${name} [via Portfolio]" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `🚀 New Message from ${name} (${email})`,
        text: `You have a new message from your portfolio:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #2563eb;">New Portfolio Inquiry</h2>
            <p><strong>Sender Name:</strong> ${name}</p>
            <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="background: #f9fafb; padding: 15px; border-radius: 5px;">${message}</p>
            <br />
            <p style="font-size: 12px; color: #6b7280;">You can reply directly to this email to contact the sender.</p>
          </div>
        `,
        replyTo: email,
      };

      await transporter.sendMail(mailOptions);
      console.log(`📧 Email notification sent for message from: ${name}`);
    }

    console.log(`📩 New message saved from: ${name} (${email})`);

    res.status(200).json({
      success: true,
      message: "Message received safely. Rajendra will review it in the Admin Panel soon!",
    });
  } catch (err) {
    console.error("Error saving message or sending email:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

export default router;

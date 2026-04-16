import { Router } from "express";
import { Message } from "../models/DataModels.js";

const router = Router();

// @route   POST /api/contact
// @desc    Save a contact message to the database
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: "All fields (name, email, message) are required.",
    });
  }

  try {
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    console.log(`📩 New message saved from: ${name} (${email})`);

    res.status(200).json({
      success: true,
      message: "Message received safely. Rajendra will review it in the Admin Panel soon!",
    });
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

export default router;

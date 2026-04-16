import { Router } from "express";
import fetch from "node-fetch";
import { generateRajendraResponse, isAboutRajendra, isCasual } from "../data/rajendraInfo.js";

const router = Router();

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  console.log("💬 User message:", message);

  const trimmedMessage = message.trim();
  const lowerMsg = trimmedMessage.toLowerCase();

  // Handle greetings
  const greetings = ["hello", "hi", "hey", "hello there", "hi there", "hey there", "greetings"];
  if (greetings.includes(lowerMsg) || (lowerMsg.includes("hello") && lowerMsg.length < 10)) {
    return res.json({
      reply: "Hello! I'm Rajendra's AI assistant. How can I help you learn about Rajendra Chaudhary today?",
    });
  }

  // Handle Rajendra-related or casual messages locally
  if (isAboutRajendra(message) || isCasual(message)) {
    const reply = generateRajendraResponse(message);
    return res.json({ reply });
  }

  // For general questions, use Gemini API
  console.log("🤖 Forwarding to Gemini API...");
  try {
    const response = await fetch(
      `${process.env.GEMINI_API_URL}?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful assistant. The user asked: ${message}. Please provide a helpful, concise response.`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("Gemini API error:", data.error);
      return res.json({ reply: generateRajendraResponse(message) });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || generateRajendraResponse(message);

    res.json({ reply });
  } catch (error) {
    console.error("Server error:", error);
    res.json({ reply: generateRajendraResponse(message) });
  }
});

export default router;

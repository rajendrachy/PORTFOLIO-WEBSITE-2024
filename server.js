// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are Rajendra Chaudhary's AI assistant." },
          { role: "user", content: message }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch AI response" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

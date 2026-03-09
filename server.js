import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // use only if Node <18

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API Error:", errorText);
      return res.status(500).json({ error: "Failed to fetch from OpenAI" });
    }

    const data = await response.json();
    // Send the AI's message directly to frontend
    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* ================= HOME ROUTE ================= */

app.get("/", (req, res) => {
  res.send("🚀 Rajendra AI Backend is running successfully!");
});

/* ================= AI CHAT ROUTE ================= */

app.post("/chat", async (req, res) => {

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      error: "Message is required"
    });
  }

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
          {
            role: "system",
            content: "You are Rajendra Chaudhary's personal AI assistant. Answer questions about his skills, projects, and experience."
          },
          {
            role: "user",
            content: message
          }
        ],

        max_tokens: 150
      })

    });

    if (!response.ok) {

      const errorText = await response.text();
      console.error("OpenAI API Error:", errorText);

      return res.status(500).json({
        error: "Failed to fetch AI response"
      });

    }

    const data = await response.json();

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {

    console.error("Server Error:", error);

    res.status(500).json({
      error: "Internal Server Error"
    });

  }

});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

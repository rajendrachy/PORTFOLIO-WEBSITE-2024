import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// ✅ Chat route
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    console.log("User message:", message);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // ✅ Log full response for debugging
    console.log("Gemini FULL response:", JSON.stringify(data, null, 2));

    // ❗ Handle Gemini API error properly
    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return res.status(500).json({
        error: "Gemini API error",
        details: data.error.message
      });
    }

    // ✅ Extract reply safely
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return res.status(500).json({
        error: "No reply from AI"
      });
    }

    res.json({ reply });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "AI request failed",
      details: error.message
    });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5:generateText?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: {
            text: message
          },
          temperature: 0.7, // Optional: controls creativity
          maxOutputTokens: 500 // Optional: max length of the reply
        })
      }
    );

    const data = await response.json();
    console.log("Gemini FULL response:", data);

    // The generateText response has a different structure:
    const reply =
      data?.candidates?.[0]?.output || "No response from AI";

    res.json({ reply });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "AI request failed"
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

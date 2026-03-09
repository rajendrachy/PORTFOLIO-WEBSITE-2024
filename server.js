import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 AI Backend Running");
});

app.post("/chat", async (req, res) => {

  const { message } = req.body;

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are Rajendra Chaudhary's AI assistant. ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    const reply = data.candidates[0].content.parts[0].text;

    res.json({ reply });

  } catch (error) {

    console.log(error);

    res.status(500).json({ error: "AI response failed" });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

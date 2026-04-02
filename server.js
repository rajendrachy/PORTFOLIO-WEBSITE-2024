import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Debug ENV (optional but useful)
console.log("API URL:", process.env.GEMINI_API_URL);
console.log(
  "API KEY:",
  process.env.GOOGLE_API_KEY ? "Loaded ✅" : "Missing ❌"
);

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

    // ✅ Build API URL from ENV
    const apiUrl = `${process.env.GEMINI_API_URL}?key=${process.env.GOOGLE_API_KEY}`;

    const response = await fetch(apiUrl, {
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
    });

    // ❗ Handle HTTP error
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);

      return res.status(500).json({
        error: "Failed to fetch AI response"
      });
    }

    const data = await response.json();

    // ✅ Debug full response
    console.log("Gemini FULL response:", JSON.stringify(data, null, 2));

    // ❗ Handle API-level error
    if (data.error) {
      return res.status(500).json({
        error: data.error.message
      });
    }

    // ✅ Extract AI reply safely
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

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

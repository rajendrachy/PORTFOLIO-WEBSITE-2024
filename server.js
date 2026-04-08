import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from root
app.use('/images', express.static('IMAGES'));

// Health check
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Chat route
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  console.log("GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY);

  // Mock response for development
  console.log("Mock response for:", message);
  const mockReplies = [
    "Hello! I'm Rajendra's AI assistant. Rajendra is a skilled web developer with expertise in HTML, CSS, JavaScript, Node.js, and more. He loves building interactive websites and solving complex problems.",
    "Rajendra Chaudhary is a passionate web developer from Nepal. He specializes in front-end and back-end development, creating responsive and user-friendly applications.",
    "That's interesting! Rajendra has experience with various technologies including React, Express, and database management. What specific aspect of his work would you like to know more about?",
    "Rajendra is always eager to learn new technologies and take on challenging projects. He believes in writing clean, efficient code and delivering high-quality solutions.",
    "Thanks for your interest in Rajendra! He's currently working on exciting projects and is open to collaborations. Feel free to ask about his skills, experience, or portfolio."
  ];
  const reply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
  return res.json({ reply });

  // Commented out API call for now
  /*
  try {
    console.log("User message:", message);
    console.log("API URL:", process.env.GEMINI_API_URL);

    const response = await fetch(
      `${process.env.GEMINI_API_URL}?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: {
            text: `You are Rajendra Chaudhary's AI assistant. Rajendra is a web developer specializing in HTML, CSS, JavaScript, Node.js, and more. Answer questions about him helpfully. User message: ${message}`
          }
        })
      }
    );

    const data = await response.json();

    console.log("Gemini FULL response:", JSON.stringify(data, null, 2));

    if (data.error) {
      console.error("Gemini API error:", data.error);
      return res.status(500).json({
        error: data.error.message || "AI service error"
      });
    }

    const reply =
      data?.candidates?.[0]?.output ||
      data?.candidates?.[0]?.text ||
      "I'm sorry, I couldn't generate a response.";

    res.json({ reply });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "AI request failed: " + error.message
    });
  }
  */
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




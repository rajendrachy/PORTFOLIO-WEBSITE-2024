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

  try {
    console.log("User message:", message);

    const response = await fetch(
      `${process.env.GEMINI_API_URL}?key=${process.env.GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `You are Rajendra Chaudhary's AI assistant. Rajendra is a skilled web developer with expertise in HTML, CSS, JavaScript, Node.js, and more. Answer questions about him helpfully and conversationally. User message: ${message}` }]
            }
          ]
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
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content ||
      "I'm sorry, I couldn't generate a response.";

    res.json({ reply });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "AI request failed: " + error.message
    });
  }

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




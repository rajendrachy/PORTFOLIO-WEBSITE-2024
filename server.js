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
  const msg = message.toLowerCase().trim();
  let reply;
  if (msg === "hi" || msg === "hello" || msg === "hey" || msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
    reply = "Hi there! 👋 I'm Rajendra's AI assistant. Rajendra is a talented web developer from Nepal. How can I help you learn more about him?";
  } else if (msg.includes("who") && (msg.includes("rajendra") || msg.includes("you"))) {
    reply = "Rajendra Chaudhary is a passionate full-stack web developer specializing in modern technologies like React, Node.js, and databases. He's from Nepal and loves creating user-friendly applications.";
  } else if (msg.includes("skill") || msg.includes("what do you know") || msg.includes("technologies")) {
    reply = "Rajendra's skills include: HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and more. He's always learning new tools to build better solutions!";
  } else if (msg.includes("experience") || msg.includes("work") || msg.includes("project")) {
    reply = "Rajendra has experience building responsive websites, web apps, and APIs. He focuses on clean code, performance, and great user experiences. Check out his portfolio for examples!";
  } else if (msg.includes("contact") || msg.includes("hire") || msg.includes("email")) {
    reply = "Interested in working with Rajendra? He's open to collaborations and new opportunities. You can reach him through the contact form on this site or LinkedIn!";
  } else if (msg.includes("thank") || msg.includes("bye")) {
    reply = "You're welcome! Feel free to ask more questions anytime. Have a great day! 😊";
  } else {
    reply = "That's a great question! Rajendra is dedicated to his craft and always eager to take on new challenges. What specific aspect would you like to know more about?";
  }
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




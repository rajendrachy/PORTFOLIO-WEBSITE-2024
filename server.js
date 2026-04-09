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

// Rajendra's information - trained data
const rajendraInfo = {
  name: "Rajendra Chaudhary",
  role: "Full Stack Web Developer, Software Engineer, and DevOps Engineer",
  location: "Nepal",
  education: "B.E. in Computer Science from Chitkara University, Himachal Pradesh",
  skills: ["MERN Stack", "Express.js", "Node.js", "React.js", "JavaScript", "HTML", "CSS", "Linux", "Java", "DevOps"],
  experience: "Building scalable web applications and managing reliable deployment pipelines",
  projects: [
    "Chat Application - MERN Stack real-time messaging app",
    "Home Buyer Portal - Government subsidy & loan platform",
    "AI Virtual Assistant - MERN + AI Integration"
  ],
  achievements: {
    certifications: ["Nutanix Cloud Certification", "Artificial Intelligence Certificate", "Discrete Mathematics Certificate"],
    stats: {
      projectsBuilt: "4+",
      githubRepos: "60+",
      technologiesUsed: "10+",
      problemsSolved: "130+",
      certifications: "12+",
      codingPlatforms: "3+",
      yearsLearning: "2+",
      devTools: "10+"
    }
  },
  tools: ["VS Code", "Canva", "SQL", "Cisco", "GitHub"],
  services: ["Web Development", "API Development", "DevOps Setup", "Deployment"],
  availability: "Available for internships, freelance projects, and full-time roles",
  contact: "chyrajendra32@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/rajendra1617/",
    github: "https://github.com/rajendrachy",
    twitter: "https://x.com/Rajendrachy32"
  },
  bio: "I am a passionate Full Stack Web | Software Developer and DevOps Engineer from Nepal building modern, scalable, and user-friendly web applications. I specialize in both frontend and backend development, creating seamless digital experiences using clean, efficient, and maintainable code."
};

// Function to check if question is about Rajendra
function isAboutRajendra(message) {
  const keywords = [
    'rajendra', 'chaudhary', 'rajendra chaudhary', 'he', 'him', 'his',
    'who is', 'tell me about', 'about rajendra', 'developer', 'portfolio',
    'skills', 'projects', 'experience', 'education', 'contact', 'email',
    'github', 'linkedin', 'achievements', 'certifications', 'tools',
    'services', 'availability', 'bio', 'work', 'job', 'role'
  ];
  
  const lowerMsg = message.toLowerCase();
  return keywords.some(keyword => lowerMsg.includes(keyword));
}

// Function to generate response based on question
function generateRajendraResponse(message) {
  const lowerMsg = message.toLowerCase();
  
  // Greetings
  if (lowerMsg === "hello" || lowerMsg === "hi" || lowerMsg === "hey" || lowerMsg === "hello there") {
    return "Hello! I'm Rajendra's AI assistant. How can I help you learn about Rajendra Chaudhary today?";
  }
  
  // Name / Who is
  if (lowerMsg.includes("who is") || (lowerMsg.includes("name") && lowerMsg.includes("rajendra"))) {
    return `${rajendraInfo.name} is a ${rajendraInfo.role} from ${rajendraInfo.location}. ${rajendraInfo.bio}`;
  }
  
  // Role / Profession
  if (lowerMsg.includes("role") || lowerMsg.includes("profession") || lowerMsg.includes("what does he do") || lowerMsg.includes("work as")) {
    return `Rajendra is a ${rajendraInfo.role}. He specializes in ${rajendraInfo.skills.slice(0, 5).join(", ")} and more.`;
  }
  
  // Skills
  if (lowerMsg.includes("skill") || lowerMsg.includes("technologies") || lowerMsg.includes("tech stack") || lowerMsg.includes("knows")) {
    return `Rajendra is skilled in: ${rajendraInfo.skills.join(", ")}. He continuously learns and improves his technical expertise.`;
  }
  
  // Education
  if (lowerMsg.includes("education") || lowerMsg.includes("study") || lowerMsg.includes("college") || lowerMsg.includes("university") || lowerMsg.includes("degree")) {
    return `Rajendra completed his ${rajendraInfo.education}. He is currently pursuing his Computer Science Engineering degree.`;
  }
  
  // Projects
  if (lowerMsg.includes("project") || lowerMsg.includes("built") || lowerMsg.includes("created") || lowerMsg.includes("work sample")) {
    return `Rajendra has built several impressive projects including:\n• ${rajendraInfo.projects.join("\n• ")}. You can check them out in his portfolio!`;
  }
  
  // Achievements / Certifications
  if (lowerMsg.includes("achievement") || lowerMsg.includes("certification") || lowerMsg.includes("award") || lowerMsg.includes("accomplishment")) {
    return `Rajendra's key certifications include: ${rajendraInfo.achievements.certifications.join(", ")}. He has also completed ${rajendraInfo.achievements.stats.projectsBuilt} projects and solved ${rajendraInfo.achievements.stats.problemsSolved} coding problems!`;
  }
  
  // Stats
  if (lowerMsg.includes("statistics") || lowerMsg.includes("stats") || lowerMsg.includes("portfolio stats")) {
    return `Here are Rajendra's portfolio statistics:\n• Projects Built: ${rajendraInfo.achievements.stats.projectsBuilt}\n• GitHub Repositories: ${rajendraInfo.achievements.stats.githubRepos}\n• Technologies Used: ${rajendraInfo.achievements.stats.technologiesUsed}\n• Problems Solved: ${rajendraInfo.achievements.stats.problemsSolved}\n• Certifications: ${rajendraInfo.achievements.stats.certifications}\n• Years Learning: ${rajendraInfo.achievements.stats.yearsLearning}`;
  }
  
  // Tools
  if (lowerMsg.includes("tool") || lowerMsg.includes("software") || lowerMsg.includes("use")) {
    return `Rajendra uses various tools including: ${rajendraInfo.tools.join(", ")}. He's proficient with modern development environments and version control systems.`;
  }
  
  // Services
  if (lowerMsg.includes("service") || lowerMsg.includes("offer") || lowerMsg.includes("provide")) {
    return `Rajendra offers professional services including: ${rajendraInfo.services.join(", ")}. He helps businesses build scalable, high-performance applications.`;
  }
  
  // Availability
  if (lowerMsg.includes("available") || lowerMsg.includes("hire") || lowerMsg.includes("freelance") || lowerMsg.includes("internship") || lowerMsg.includes("job")) {
    return `Yes! Rajendra is currently ${rajendraInfo.availability}. He's open for internships, freelance projects, and full-time roles. You can contact him via email or LinkedIn!`;
  }
  
  // Contact / Email
  if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("reach") || lowerMsg.includes("get in touch")) {
    return `You can contact Rajendra via:\n• Email: ${rajendraInfo.contact}\n• LinkedIn: ${rajendraInfo.social.linkedin}\n• GitHub: ${rajendraInfo.social.github}\n• Twitter: ${rajendraInfo.social.twitter}`;
  }
  
  // Experience
  if (lowerMsg.includes("experience") || lowerMsg.includes("background") || lowerMsg.includes("worked")) {
    return `Rajendra has experience ${rajendraInfo.experience}. He creates user-friendly, high-performance websites while ensuring efficient infrastructure, automation, and smooth CI/CD processes.`;
  }
  
  // Bio / About
  if (lowerMsg.includes("bio") || lowerMsg.includes("about him") || lowerMsg.includes("tell me about rajendra")) {
    return rajendraInfo.bio;
  }
  
  // Default response
  return `I'm Rajendra's AI assistant. I can tell you about his skills, projects, education, achievements, services, and how to contact him. What would you like to know about Rajendra Chaudhary?`;
}

// Chat route
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  console.log("User message:", message);

  const trimmedMessage = message.trim().toLowerCase();
  
  // Handle greetings
  if (trimmedMessage === "hello" || trimmedMessage === "hi" || trimmedMessage === "hey" || trimmedMessage === "hello there") {
    console.log("Greeting detected - returning greeting response");
    return res.json({ 
      reply: "Hello! I'm Rajendra's AI assistant. How can I help you learn about Rajendra Chaudhary today?"
    });
  }
  
  // Handle questions about Rajendra
  if (isAboutRajendra(message)) {
    console.log("Rajendra-related question detected - using trained responses");
    const reply = generateRajendraResponse(message);
    return res.json({ reply });
  }

  // For other questions, use Gemini API
  console.log("General question - using Gemini API");
  console.log("GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY);

  try {
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
              parts: [{ text: `You are a helpful assistant. The user asked: ${message}. Please provide a helpful, concise response.` }]
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
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

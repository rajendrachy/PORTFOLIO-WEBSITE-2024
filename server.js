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

// Casual responses
const casualResponses = [
  "You're welcome! Feel free to ask me anything else about Rajendra's skills, projects, or experience! 😊",
  "Great! Is there anything specific about Rajendra you'd like to know? His projects, skills, or maybe his contact info?",
  "Awesome! I'm here to help you learn more about Rajendra Chaudhary. What would you like to know next?",
  "Thanks! Ask me about Rajendra's certifications, GitHub repos, or how to contact him for opportunities!",
  "Cool! Want to know about his latest projects or tech stack? Just let me know!"
];

// Function to check if question is about Rajendra
function isAboutRajendra(message) {
  const keywords = [
    'rajendra', 'chaudhary', 'rajendra chaudhary', 'he', 'him', 'his',
    'who is', 'tell me about', 'about rajendra', 'developer', 'portfolio',
    'skills', 'projects', 'experience', 'education', 'contact', 'email',
    'github', 'linkedin', 'achievements', 'certifications', 'tools',
    'services', 'availability', 'bio', 'work', 'job', 'role', 'skill',
    'certificate', 'project', 'built', 'create', 'make', 'know', 'learn'
  ];
  
  const lowerMsg = message.toLowerCase();
  return keywords.some(keyword => lowerMsg.includes(keyword));
}

// Function to check if message is casual
function isCasual(message) {
  const casualKeywords = ['ok', 'okay', 'thanks', 'thank you', 'cool', 'nice', 'great', 'awesome', 'good', 'fine', 'alright', 'hmm', 'hmmm', 'yeah', 'yes', 'no', 'ok then', 'got it', 'i see'];
  const lowerMsg = message.toLowerCase().trim();
  return casualKeywords.includes(lowerMsg) || lowerMsg.length < 4;
}

// Function to generate response based on question
function generateRajendraResponse(message) {
  const lowerMsg = message.toLowerCase();
  
  // Greetings
  if (lowerMsg === "hello" || lowerMsg === "hi" || lowerMsg === "hey" || lowerMsg === "hello there" || lowerMsg.includes("hello")) {
    return "Hello! I'm Rajendra's AI assistant. How can I help you learn about Rajendra Chaudhary today?";
  }
  
  // Casual responses
  if (isCasual(message)) {
    const randomIndex = Math.floor(Math.random() * casualResponses.length);
    return casualResponses[randomIndex];
  }
  
  // Name / Who is
  if (lowerMsg.includes("who is") || (lowerMsg.includes("name") && lowerMsg.includes("rajendra")) || lowerMsg.includes("tell me about rajendra")) {
    return `${rajendraInfo.name} is a ${rajendraInfo.role} from ${rajendraInfo.location}. ${rajendraInfo.bio}`;
  }
  
  // Role / Profession
  if (lowerMsg.includes("role") || lowerMsg.includes("profession") || lowerMsg.includes("what does he do") || lowerMsg.includes("work as") || lowerMsg.includes("job")) {
    return `Rajendra is a ${rajendraInfo.role}. He specializes in ${rajendraInfo.skills.slice(0, 5).join(", ")} and more.`;
  }
  
  // Skills / Technologies
  if (lowerMsg.includes("skill") || lowerMsg.includes("technologies") || lowerMsg.includes("tech stack") || lowerMsg.includes("knows") || lowerMsg.includes("what can he do")) {
    return `Rajendra is skilled in: ${rajendraInfo.skills.join(", ")}. He continuously learns and improves his technical expertise. Ask me about his specific projects using these technologies!`;
  }
  
  // Education
  if (lowerMsg.includes("education") || lowerMsg.includes("study") || lowerMsg.includes("college") || lowerMsg.includes("university") || lowerMsg.includes("degree") || lowerMsg.includes("learn")) {
    return `Rajendra completed his ${rajendraInfo.education}. He is currently pursuing his Computer Science Engineering degree with focus on full stack development and DevOps.`;
  }
  
  // Projects
  if (lowerMsg.includes("project") || lowerMsg.includes("built") || lowerMsg.includes("created") || lowerMsg.includes("work sample") || lowerMsg.includes("made")) {
    return `Rajendra has built several impressive projects including:\n• ${rajendraInfo.projects.join("\n• ")}\n\nYou can check out these live projects in his portfolio section! Would you like to know more about any specific project?`;
  }
  
  // Achievements / Certifications
  if (lowerMsg.includes("achievement") || lowerMsg.includes("certification") || lowerMsg.includes("award") || lowerMsg.includes("accomplishment") || lowerMsg.includes("certificate")) {
    return `Rajendra's key certifications include: ${rajendraInfo.achievements.certifications.join(", ")}. He has also completed ${rajendraInfo.achievements.stats.projectsBuilt} projects and solved ${rajendraInfo.achievements.stats.problemsSolved} coding problems on various platforms!`;
  }
  
  // Stats / Portfolio Statistics
  if (lowerMsg.includes("statistics") || lowerMsg.includes("stats") || lowerMsg.includes("portfolio stats") || lowerMsg.includes("github stats")) {
    return `📊 Here are Rajendra's portfolio statistics:\n\n• Projects Built: ${rajendraInfo.achievements.stats.projectsBuilt}\n• GitHub Repositories: ${rajendraInfo.achievements.stats.githubRepos}\n• Technologies Used: ${rajendraInfo.achievements.stats.technologiesUsed}\n• Problems Solved: ${rajendraInfo.achievements.stats.problemsSolved}\n• Certifications: ${rajendraInfo.achievements.stats.certifications}\n• Coding Platforms: ${rajendraInfo.achievements.stats.codingPlatforms}\n• Years of Learning: ${rajendraInfo.achievements.stats.yearsLearning}\n• Developer Tools: ${rajendraInfo.achievements.stats.devTools}`;
  }
  
  // Tools
  if (lowerMsg.includes("tool") || lowerMsg.includes("software") || lowerMsg.includes("use") || lowerMsg.includes("editor")) {
    return `Rajendra uses various development tools including: ${rajendraInfo.tools.join(", ")}. He's proficient with VS Code, Git/GitHub, and various DevOps tools for CI/CD pipelines.`;
  }
  
  // Services
  if (lowerMsg.includes("service") || lowerMsg.includes("offer") || lowerMsg.includes("provide") || lowerMsg.includes("help with")) {
    return `💼 Rajendra offers professional services including:\n• ${rajendraInfo.services.join("\n• ")}\n\nHe helps businesses build scalable, high-performance applications with modern technologies and DevOps practices.`;
  }
  
  // Availability / Hire
  if (lowerMsg.includes("available") || lowerMsg.includes("hire") || lowerMsg.includes("freelance") || lowerMsg.includes("internship") || lowerMsg.includes("full-time") || lowerMsg.includes("job opportunity")) {
    return `✅ Yes! Rajendra is currently ${rajendraInfo.availability}. He's actively looking for:\n• Internship opportunities\n• Freelance projects\n• Full-time developer roles\n\nYou can contact him via email or LinkedIn to discuss opportunities!`;
  }
  
  // Contact / Email / Social
  if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("reach") || lowerMsg.includes("get in touch") || lowerMsg.includes("message") || lowerMsg.includes("social")) {
    return `📫 You can connect with Rajendra through:\n\n📧 Email: ${rajendraInfo.contact}\n🔗 LinkedIn: ${rajendraInfo.social.linkedin}\n💻 GitHub: ${rajendraInfo.social.github}\n🐦 Twitter: ${rajendraInfo.social.twitter}\n\nFeel free to reach out for collaborations or opportunities!`;
  }
  
  // Experience
  if (lowerMsg.includes("experience") || lowerMsg.includes("background") || lowerMsg.includes("worked") || lowerMsg.includes("career")) {
    return `💼 Rajendra has experience ${rajendraInfo.experience}. He creates user-friendly, high-performance websites while ensuring efficient infrastructure, automation, and smooth CI/CD processes. He has ${rajendraInfo.achievements.stats.yearsLearning}+ years of learning and building experience.`;
  }
  
  // Bio / About him
  if (lowerMsg.includes("bio") || lowerMsg.includes("about him") || lowerMsg.includes("introduce")) {
    return rajendraInfo.bio;
  }
  
  // Default response - suggest what user can ask
  return `I'm Rajendra's AI assistant! I can tell you about:\n\n📌 His skills & technologies\n📌 Projects he's built\n📌 Education & certifications\n📌 Portfolio statistics\n📌 Services he offers\n📌 Contact information\n📌 Availability for work\n\nWhat would you like to know about Rajendra Chaudhary?`;
}

// Chat route
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  console.log("User message:", message);

  const trimmedMessage = message.trim();
  const lowerMsg = trimmedMessage.toLowerCase();
  
  // Handle all greetings
  const greetings = ["hello", "hi", "hey", "hello there", "hi there", "hey there", "greetings"];
  if (greetings.includes(lowerMsg) || (lowerMsg.includes("hello") && lowerMsg.length < 10)) {
    console.log("Greeting detected - returning greeting response");
    return res.json({ 
      reply: "Hello! I'm Rajendra's AI assistant. How can I help you learn about Rajendra Chaudhary today?"
    });
  }
  
  // Handle all questions about Rajendra OR casual messages
  if (isAboutRajendra(message) || isCasual(message)) {
    console.log("Rajendra-related or casual question detected - using trained responses");
    const reply = generateRajendraResponse(message);
    return res.json({ reply });
  }

  // For other questions, use Gemini API
  console.log("General question - using Gemini API");
  console.log("GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY ? "Present" : "Missing");

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
      // Fallback to Rajendra response if API fails
      const fallbackReply = generateRajendraResponse(message);
      return res.json({ reply: fallbackReply });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.candidates?.[0]?.content ||
      generateRajendraResponse(message);

    res.json({ reply });

  } catch (error) {
    console.error("Server error:", error);
    // Fallback to Rajendra response on error
    const fallbackReply = generateRajendraResponse(message);
    res.json({ reply: fallbackReply });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

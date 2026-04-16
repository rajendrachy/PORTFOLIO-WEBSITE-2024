// ===================================================
// Rajendra Chaudhary - Portfolio Data & AI Responses
// ===================================================

export const rajendraInfo = {
  name: "Rajendra Chaudhary",
  role: "Full Stack Web Developer, Software Engineer, and DevOps Engineer",
  location: "Nepal",
  education: "B.E. in Computer Science from Chitkara University, Himachal Pradesh",
  skills: ["MERN Stack", "Express.js", "Node.js", "React.js", "JavaScript", "HTML", "CSS", "Linux", "Java", "DevOps"],
  experience: "Building scalable web applications and managing reliable deployment pipelines",
  projects: [
    "Chat Application - MERN Stack real-time messaging app",
    "Home Buyer Portal - Government subsidy & loan platform",
    "AI Virtual Assistant - MERN + AI Integration",
  ],
  achievements: {
    certifications: [
      "Nutanix Cloud Certification",
      "Artificial Intelligence Certificate",
      "Discrete Mathematics Certificate",
    ],
    stats: {
      projectsBuilt: "4+",
      githubRepos: "60+",
      technologiesUsed: "10+",
      problemsSolved: "130+",
      certifications: "12+",
      codingPlatforms: "3+",
      yearsLearning: "2+",
      devTools: "10+",
    },
  },
  tools: ["VS Code", "Canva", "SQL", "Cisco", "GitHub"],
  services: ["Web Development", "API Development", "DevOps Setup", "Deployment"],
  availability: "Available for internships, freelance projects, and full-time roles",
  contact: "chyrajendra32@gmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/rajendra1617/",
    github: "https://github.com/rajendrachy",
    twitter: "https://x.com/Rajendrachy32",
  },
  bio: "I am a passionate Full Stack Web | Software Developer and DevOps Engineer from Nepal building modern, scalable, and user-friendly web applications. I specialize in both frontend and backend development, creating seamless digital experiences using clean, efficient, and maintainable code.",
};

export const casualResponses = [
  "You're welcome! Feel free to ask me anything else about Rajendra's skills, projects, or experience! 😊",
  "Great! Is there anything specific about Rajendra you'd like to know? His projects, skills, or maybe his contact info?",
  "Awesome! I'm here to help you learn more about Rajendra Chaudhary. What would you like to know next?",
  "Thanks! Ask me about Rajendra's certifications, GitHub repos, or how to contact him for opportunities!",
  "Cool! Want to know about his latest projects or tech stack? Just let me know!",
];

export function isAboutRajendra(message) {
  const keywords = [
    "rajendra", "chaudhary", "he", "him", "his", "who is", "tell me about",
    "developer", "portfolio", "skills", "projects", "experience", "education",
    "contact", "email", "github", "linkedin", "achievements", "certifications",
    "tools", "services", "availability", "bio", "work", "job", "role", "skill",
    "certificate", "project", "built", "create", "make", "know", "learn",
  ];
  const lowerMsg = message.toLowerCase();
  return keywords.some((k) => lowerMsg.includes(k));
}

export function isCasual(message) {
  const casualKeywords = [
    "ok", "okay", "thanks", "thank you", "cool", "nice", "great", "awesome",
    "good", "fine", "alright", "hmm", "hmmm", "yeah", "yes", "no", "ok then",
    "got it", "i see",
  ];
  const lowerMsg = message.toLowerCase().trim();
  return casualKeywords.includes(lowerMsg) || lowerMsg.length < 4;
}

export function generateRajendraResponse(message) {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("hey")) {
    return "Hello! I'm Rajendra's AI assistant. How can I help you learn about Rajendra Chaudhary today?";
  }
  if (isCasual(message)) {
    return casualResponses[Math.floor(Math.random() * casualResponses.length)];
  }
  if (lowerMsg.includes("who is") || (lowerMsg.includes("name") && lowerMsg.includes("rajendra"))) {
    return `${rajendraInfo.name} is a ${rajendraInfo.role} from ${rajendraInfo.location}. ${rajendraInfo.bio}`;
  }
  if (lowerMsg.includes("role") || lowerMsg.includes("profession") || lowerMsg.includes("job")) {
    return `Rajendra is a ${rajendraInfo.role}. He specializes in ${rajendraInfo.skills.slice(0, 5).join(", ")} and more.`;
  }
  if (lowerMsg.includes("skill") || lowerMsg.includes("tech stack") || lowerMsg.includes("technologies")) {
    return `Rajendra is skilled in: ${rajendraInfo.skills.join(", ")}. He continuously learns and improves his technical expertise!`;
  }
  if (lowerMsg.includes("education") || lowerMsg.includes("college") || lowerMsg.includes("university") || lowerMsg.includes("degree")) {
    return `Rajendra completed his ${rajendraInfo.education}. He is pursuing Computer Science Engineering with a focus on full stack development and DevOps.`;
  }
  if (lowerMsg.includes("project") || lowerMsg.includes("built") || lowerMsg.includes("created")) {
    return `Rajendra has built several impressive projects:\n• ${rajendraInfo.projects.join("\n• ")}\n\nCheck them out in his portfolio section!`;
  }
  if (lowerMsg.includes("achievement") || lowerMsg.includes("certification") || lowerMsg.includes("certificate")) {
    return `Rajendra's key certifications: ${rajendraInfo.achievements.certifications.join(", ")}. He has also solved ${rajendraInfo.achievements.stats.problemsSolved} coding problems!`;
  }
  if (lowerMsg.includes("stats") || lowerMsg.includes("statistics")) {
    const s = rajendraInfo.achievements.stats;
    return `📊 Rajendra's stats:\n• Projects: ${s.projectsBuilt}\n• GitHub Repos: ${s.githubRepos}\n• Technologies: ${s.technologiesUsed}\n• Problems Solved: ${s.problemsSolved}\n• Certifications: ${s.certifications}`;
  }
  if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("reach")) {
    return `📫 Contact Rajendra:\n📧 ${rajendraInfo.contact}\n🔗 LinkedIn: ${rajendraInfo.social.linkedin}\n💻 GitHub: ${rajendraInfo.social.github}`;
  }
  if (lowerMsg.includes("available") || lowerMsg.includes("hire") || lowerMsg.includes("freelance")) {
    return `✅ Rajendra is currently ${rajendraInfo.availability}. Contact him via email or LinkedIn!`;
  }
  if (lowerMsg.includes("experience") || lowerMsg.includes("background")) {
    return `💼 Rajendra has experience ${rajendraInfo.experience} with ${rajendraInfo.achievements.stats.yearsLearning} years of learning.`;
  }
  return `I'm Rajendra's AI assistant! Ask me about:\n📌 Skills & technologies\n📌 Projects\n📌 Education & certifications\n📌 Services\n📌 Contact info\n📌 Availability for work`;
}

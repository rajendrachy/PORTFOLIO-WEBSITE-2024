# 🚀 Rajendra Chaudhary — Portfolio Website (Full Stack)

A modern full-stack portfolio website built with **Vite + React** (frontend) and **Node.js + Express** (backend).

---

## 📁 Folder Structure

```
PORTFOLIO-WEBSITE-2024/
├── frontend/                   ← Vite + React app
│   ├── src/
│   │   ├── assets/images/      ← All images
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── ExploreMore.jsx
│   │   │   ├── LiveProjects.jsx
│   │   │   ├── Journey.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── Work.jsx
│   │   │   ├── Achievements.jsx
│   │   │   ├── Notes.jsx
│   │   │   ├── GitHub.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── AiChat.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/                 ← PDFs, favicon
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                    ← Express API server
│   ├── data/
│   │   └── rajendraInfo.js     ← Portfolio data & AI responses
│   ├── routes/
│   │   ├── chat.js             ← POST /chat (AI assistant)
│   │   └── contact.js          ← POST /api/contact (contact form)
│   ├── server.js
│   ├── .env                    ← Your API keys (never commit)
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

| Layer     | Technology                         |
|-----------|------------------------------------|
| Frontend  | Vite, React, Tailwind CSS v4       |
| Backend   | Node.js, Express.js                |
| API       | Google Gemini AI (chat)            |
| Config    | dotenv                             |
| Dev Tools | nodemon, Vite proxy                |

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd backend

# Copy env file and add your API key
cp .env.example .env
# → Edit .env and add your GOOGLE_API_KEY

# Install dependencies
npm install

# Start backend (port 5000)
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start frontend (port 5173)
npm run dev
```

### 3. Open in Browser

```
Frontend  →  http://localhost:5173
Backend   →  http://localhost:5000
```

> The Vite dev server automatically proxies `/api` and `/chat` requests to the backend on port 5000. No CORS issues!

---

## 📡 API Routes

| Method | Route          | Description                     |
|--------|----------------|---------------------------------|
| GET    | `/`            | Backend health check            |
| POST   | `/chat`        | AI assistant for portfolio info |
| POST   | `/api/contact` | Contact form submission         |

### Example — Contact Form

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","message":"Hello!"}'
```

### Example — AI Chat

```bash
curl -X POST http://localhost:5000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"What are Rajendra skills?"}'
```

---

## 🌍 Deployment

| Service      | Deploy                                              |
|--------------|-----------------------------------------------------|
| **Frontend** | Vercel — connect repo, set root to `frontend/`      |
| **Backend**  | Render — connect repo, set root to `backend/`       |

> Remember to set env variables (`GOOGLE_API_KEY`, `GEMINI_API_URL`, `PORT`) in your cloud platform's dashboard.

---

## 🔧 Environment Variables (`backend/.env`)

```env
PORT=5000
GOOGLE_API_KEY=your_google_api_key_here
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

---

Made with ❤️ by Rajendra Chaudhary

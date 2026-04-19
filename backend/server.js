import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from './routes/chat.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import { Guestbook } from './models/DataModels.js';
import http from 'http';
import { Server } from 'socket.io';
import rateLimit from 'express-rate-limit';
import resumeRoutes from './routes/resume.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://portfolio-website-2024-zeta.vercel.app",
      "https://rajendrachaudhary32.com.np"
    ],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"]
  }
});

const PORT = process.env.PORT || 5000;

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per window
  message: { success: false, error: "Too many requests from this IP, please try again after 15 minutes" }
});

// Middleware


app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://portfolio-website-2024-zeta.vercel.app",
    "https://rajendrachaudhary32.com.np"
  ],
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true
}));

app.use(express.json());

// Attach io to request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Database Connection - Prioritizing Mongo Atlas from .env
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('❌ MONGO_URI is missing from .env file. Please check your configuration.');
  process.exit(1);
}

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB Atlas (Cloud)'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/chat', apiLimiter, chatRoutes);
app.use('/api/contact', apiLimiter, contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/resume', resumeRoutes);

app.get('/api/guestbook', async (req, res) => {
  try {
    const entries = await Guestbook.find({ approved: true }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) { res.status(500).send('Server error'); }
});

app.post('/api/guestbook', apiLimiter, async (req, res) => {
  try {
    const { name, message } = req.body;
    const newEntry = new Guestbook({ name, message });
    await newEntry.save();
    
    // Emit notification to admin
    if (req.io) {
      req.io.emit('new_notification', { type: 'guestbook', title: 'New Guestbook Entry', message: `${name} just signed your guestbook.` });
    }

    res.json(newEntry);
  } catch (err) { res.status(500).send('Server error'); }
});

app.get('/', (req, res) => {
  res.send('Rajendra Portfolio API is running...');
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

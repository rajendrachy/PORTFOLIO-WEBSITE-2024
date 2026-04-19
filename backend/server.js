import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from './routes/chat.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import { Guestbook } from './models/DataModels.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

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
app.use('/chat', chatRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/guestbook', async (req, res) => {
  try {
    const entries = await Guestbook.find({ approved: true }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) { res.status(500).send('Server error'); }
});

app.post('/api/guestbook', async (req, res) => {
  try {
    const { name, message } = req.body;
    const newEntry = new Guestbook({ name, message });
    await newEntry.save();
    res.json(newEntry);
  } catch (err) { res.status(500).send('Server error'); }
});

app.get('/', (req, res) => {
  res.send('Rajendra Portfolio API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

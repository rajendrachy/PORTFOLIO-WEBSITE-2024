import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import chatRoutes from './routes/chat.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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

app.get('/', (req, res) => {
  res.send('Rajendra Portfolio API is running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

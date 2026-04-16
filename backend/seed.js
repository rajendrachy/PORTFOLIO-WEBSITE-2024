import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import { Project, Stat } from './models/DataModels.js';

dotenv.config();

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

const seedData = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('🌱 Starting Data Seeding...');

    // 1. Create Admin User
    const existingUser = await User.findOne({ username: 'admin' });
    if (!existingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await User.create({
        username: 'admin',
        password: hashedPassword
      });
      console.log('✅ Admin User created: admin / admin123');
    } else {
      console.log('ℹ️ Admin user already exists.');
    }

    // 2. Initial Projects migration
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.create([
        {
          title: 'Chat Application',
          tech: 'MERN Stack • Socket.io',
          description: 'Real-time messaging platform with authentication and instant notifications.',
          link: 'https://chat-app-rho-pearl.vercel.app/',
        },
        {
          title: 'Home Buyer Portal',
          tech: 'MERN Stack • Full Stack',
          description: 'Comprehensive property portal with real-time status tracking for buyers.',
          link: 'https://home-buyer-portal.vercel.app',
        }
      ]);
      console.log('✅ Initial projects seeded.');
    }

    // 3. Initial Stats migration
    const statCount = await Stat.countDocuments();
    if (statCount === 0) {
      await Stat.create([
        { number: '4+', label: 'Projects Built', color: 'text-purple-500' },
        { number: '60+', label: 'GitHub Repositories', color: 'text-pink-500' },
        { number: '10+', label: 'Technologies Used', color: 'text-orange-500' },
        { number: '130+', label: 'Problems Solved', color: 'text-green-500' },
      ]);
      console.log('✅ Initial stats seeded.');
    }

    console.log('🚀 Seeding complete! Closing connection.');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedData();

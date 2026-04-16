import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { Project, Stat, Note, Achievement, Message } from '../models/DataModels.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// @route   POST api/admin/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// --- HELPER WRAPPER ---
const createCrudRoutes = (model, path) => {
    // GET ALL
    router.get(`/${path}`, async (req, res) => {
      try {
        const items = await model.find().sort({ createdAt: -1 });
        res.json(items);
      } catch (err) { res.status(500).send('Server Error'); }
    });
    // POST NEW
    router.post(`/${path}`, auth, async (req, res) => {
      try {
        const newItem = new model(req.body);
        const item = await newItem.save();
        res.json(item);
      } catch (err) { res.status(500).send('Server Error'); }
    });
    // DELETE
    router.delete(`/${path}/:id`, auth, async (req, res) => {
      try {
        await model.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Item removed' });
      } catch (err) { res.status(500).send('Server Error'); }
    });
};

createCrudRoutes(Project, 'projects');
createCrudRoutes(Stat, 'stats');
createCrudRoutes(Note, 'notes');
createCrudRoutes(Achievement, 'achievements');

// MESSAGES (Special Case)
router.get('/messages', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) { res.status(500).send('Server Error'); }
});

router.delete('/messages/:id', auth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Message removed' });
  } catch (err) { res.status(500).send('Server Error'); }
});

export default router;

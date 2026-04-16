import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tech: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String, required: true },
  image: { type: String },
  isLive: { type: Boolean, default: false },
}, { timestamps: true });

const statSchema = new mongoose.Schema({
  label: { type: String, required: true },
  number: { type: String, required: true },
  color: { type: String, default: 'text-purple-500' },
}, { timestamps: true });

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fullTitle: { type: String },
  desc: { type: String },
  link: { type: String, required: true },
  color: { type: String, default: 'border-blue-500/20' },
}, { timestamps: true });

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  pdfLink: { type: String },
  image: { type: String },
}, { timestamps: true });

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
const Stat = mongoose.model('Stat', statSchema);
const Note = mongoose.model('Note', noteSchema);
const Achievement = mongoose.model('Achievement', achievementSchema);
const Message = mongoose.model('Message', messageSchema);

export { Project, Stat, Note, Achievement, Message };

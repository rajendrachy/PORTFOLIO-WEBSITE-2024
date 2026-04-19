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
  description: { type: String },
  link: { type: String },
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

const siteConfigSchema = new mongoose.Schema({
  heroGreeting: { type: String, default: "Hi! I'm Rajendra Chaudhary 👋" },
  heroTitle: { type: String, default: "Full Stack Web Developer" },
  heroDescription: { type: String, default: "I am a Full Stack Web | Software Developer from Nepal, specializing in building scalable, secure web applications and robust infrastructure." },
  resumeLink: { type: String, default: "/resume.pdf" },
  contactText: { type: String, default: "Contact me" },
  aboutDescription: { type: String, default: "I am a passionate Full Stack Developer from Nepal with 2+ years of experience building modern, scalable, and user-friendly web applications." },
  aboutLanguages: { type: String, default: "JS, Node, Java, C++" },
  aboutEducation: { type: String, default: "B.E. Computer Science" },
  aboutProjects: { type: String, default: "4+ Major Full-Stack Apps" },
}, { timestamps: true });

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  icon: { type: String },
  color: { type: String },
  bg: { type: String },
}, { timestamps: true });

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String },
  cat: { type: String },
  darkInvert: { type: Boolean, default: false }
}, { timestamps: true });

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String },
  image: { type: String },
  date: { type: String },
  readTime: { type: String },
  tags: { type: [String] }, // Array of strings
}, { timestamps: true });

const journeySchema = new mongoose.Schema({
  title: { type: String, required: true },
  org: { type: String },
  date: { type: String },
  desc: { type: String },
  type: { type: String, enum: ['education', 'experience'], default: 'experience' }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
const Stat = mongoose.model('Stat', statSchema);
const Note = mongoose.model('Note', noteSchema);
const Achievement = mongoose.model('Achievement', achievementSchema);
const Message = mongoose.model('Message', messageSchema);
const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);
const Service = mongoose.model('Service', serviceSchema);
const Skill = mongoose.model('Skill', skillSchema);
const BlogPost = mongoose.model('BlogPost', blogPostSchema);
const Journey = mongoose.model('Journey', journeySchema);

export { Project, Stat, Note, Achievement, Message, SiteConfig, Service, Skill, BlogPost, Journey };

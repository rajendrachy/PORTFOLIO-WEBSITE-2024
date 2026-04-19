import { Router } from 'express';
import PDFDocument from 'pdfkit';
import { Project, Skill, Journey, SiteConfig } from '../models/DataModels.js';

const router = Router();

router.get('/download', async (req, res) => {
    try {
        const config = await SiteConfig.findOne() || {};
        const projects = await Project.find().limit(5);
        const skills = await Skill.find();
        const journeys = await Journey.find().sort({ createdAt: -1 });

        const doc = new PDFDocument({ margin: 50 });

        // Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=Rajendra_Chaudhary_Resume.pdf');

        doc.pipe(res);

        // Header
        doc.fillColor('#2563eb').fontSize(26).text('Rajendra Chaudhary', { align: 'center', stroke: true });
        doc.fillColor('#4b5563').fontSize(14).text('Full Stack Web Developer | Software Engineer', { align: 'center' });
        doc.moveDown();

        // Contact Info
        doc.fillColor('#1f2937').fontSize(10).text('Email: chyrajendra32@gmail.com | GitHub: github.com/rajendrachy', { align: 'center' });
        doc.moveDown();
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke('#e5e7eb');
        doc.moveDown();

        // About
        doc.fontSize(16).fillColor('#2563eb').text('Professional Summary');
        doc.moveDown(0.5);
        doc.fontSize(10).fillColor('#374151').text(config.aboutDescription || 'Passionate developer with expertise in building scalable MERN stack applications and DevOps best practices.');
        doc.moveDown();

        // Skills
        doc.fontSize(16).fillColor('#2563eb').text('Technical Skills');
        doc.moveDown(0.5);
        const skillList = skills.map(s => s.name).join(', ');
        doc.fontSize(10).fillColor('#374151').text(skillList || 'JavaScript, Node.js, React, Express, MongoDB, DevOps');
        doc.moveDown();

        // Experience / Journey
        doc.fontSize(16).fillColor('#2563eb').text('Experience & Education');
        doc.moveDown(0.5);
        journeys.forEach(j => {
            doc.fontSize(11).fillColor('#111827').text(`${j.title} @ ${j.org}`, { bold: true });
            doc.fontSize(9).fillColor('#6b7280').text(j.date);
            doc.fontSize(10).fillColor('#4b5563').text(j.desc);
            doc.moveDown(0.5);
        });
        doc.moveDown();

        // Projects
        doc.fontSize(16).fillColor('#2563eb').text('Featured Projects');
        doc.moveDown(0.5);
        projects.forEach(p => {
            doc.fontSize(11).fillColor('#111827').text(p.title, { bold: true });
            doc.fontSize(9).fillColor('#2563eb').text(`Stack: ${p.tech}`);
            doc.fontSize(10).fillColor('#4b5563').text(p.description);
            doc.moveDown(0.5);
        });

        doc.end();
    } catch (err) {
        console.error('PDF Generation Error:', err);
        res.status(500).send('Error generating PDF');
    }
});

export default router;

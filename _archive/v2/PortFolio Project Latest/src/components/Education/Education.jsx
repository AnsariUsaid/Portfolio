import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './Education.css';

const education = [
  {
    period: '2020 — 2022',
    title: 'Higher Secondary Education',
    institution: 'GMVV School',
    details: [
      'Percentage: 75%',
      'Focused on Mathematics, Physics, and Computer Science',
    ],
  },
  {
    period: '2025',
    title: 'Oracle Cloud Certifications',
    institution: 'Oracle',
    details: [
      'OCI 2025 Certified Generative AI Professional',
      'OCI 2025 Certified AI Foundations Associate',
    ],
  },
  {
    period: '2023 — Present',
    title: 'Bachelor of Technology in Computer Science',
    institution: 'Vellore Institute of Technology (VIT), Vellore',
    details: [
      'Current CGPA: 8.72',
      'Coursework: DSA, OOPs, System Design, Computer Architecture',
      'Projects: ALU Design, Maze Solver Bot, Portfolio Website',
    ],
  },
];

export default function Education() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.2'],
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section className="education section" id="education" ref={sectionRef}>
      <div className="education-inner">
        <motion.div
          className="education-header"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            My academic journey and certifications.
          </p>
        </motion.div>

        <div className="education-timeline" ref={timelineRef}>
          {/* Background track */}
          <div className="timeline-track" />

          {/* Animated progress */}
          <motion.div
            className="timeline-progress"
            style={{ scaleY: lineScale }}
          />

          {education.map((item, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45 }}
            >
              <motion.div
                className="timeline-dot active"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              />

              <div className="timeline-card">
                <span className="timeline-period">{item.period}</span>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-institution">{item.institution}</p>
                <div className="timeline-details">
                  {item.details.map((d, di) => (
                    <span key={di} className="timeline-detail">{d}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

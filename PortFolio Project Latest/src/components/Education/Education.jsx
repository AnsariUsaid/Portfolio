import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './Education.css';

const education = [
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
];

export default function Education() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.6'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="education section" id="education" ref={sectionRef}>
      <div className="education-inner">
        <motion.div
          className="education-header"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            My academic journey and certifications.
          </p>
        </motion.div>

        <div className="education-timeline">
          {/* Background track */}
          <div className="timeline-track" />

          {/* Animated progress */}
          <motion.div
            className="timeline-progress"
            style={{ height: lineHeight }}
          />

          {education.map((item, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ x: -30, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
            >
              <motion.div
                className={`timeline-dot${inView ? ' active' : ''}`}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.15 * i + 0.2 }}
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

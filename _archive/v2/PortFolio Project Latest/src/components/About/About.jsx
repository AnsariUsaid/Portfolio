import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import './About.css';

const highlights = [
  { value: '8.85', label: 'CGPA' },
  { value: '10+', label: 'Projects' },
  { value: '2', label: 'Certifications' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="about section" id="about" ref={ref}>
      <div className="about-inner">
        <motion.div
          className="about-header"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A glimpse into who I am and what drives me.
          </p>
        </motion.div>

        <div className="about-grid">
          {/* Image */}
          <motion.div
            className="about-image-wrapper"
            initial={{ x: -40, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <img
              className="about-image"
              src="https://avatars.githubusercontent.com/u/AnsariUsaid"
              alt="Ansari Usaid Anzer"
              onError={(e) => {
                e.target.src = 'https://ui-avatars.com/api/?name=Ansari+Usaid&background=1a1a1a&color=f0f0f0&size=400&font-size=0.33';
              }}
            />
            <div className="about-image-border" />
          </motion.div>

          {/* Text */}
          <motion.div
            className="about-text"
            initial={{ x: 40, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p>
              I&apos;m an aspiring IT professional and 3rd-year B.Tech CSE student at
              VIT Vellore, passionate about exploring Artificial Intelligence, Machine
              Learning, Web Development, and Cloud Computing.
            </p>
            <p>
              I enjoy solving challenging problems, experimenting with new technologies,
              and building applications that have real-world impact. My technical
              expertise spans deep learning with TensorFlow, full-stack web development
              with React and FastAPI, and cloud technologies with AWS.
            </p>
            <p>
              I hold Oracle Cloud Infrastructure certifications in Generative AI and AI
              Foundations, demonstrating my commitment to staying current with emerging
              technologies. Currently enhancing my knowledge in Database Management,
              Advanced Web Development, and Deep Learning applications.
            </p>

            <div className="about-highlights">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  className="about-highlight"
                  initial={{ y: 20, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                >
                  <div className="about-highlight-value">{h.value}</div>
                  <div className="about-highlight-label">{h.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import skills from '../../data/skills';
import './Skills.css';

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="skills-section section" id="skills" ref={ref}>
      <div className="skills-inner">
        <motion.div
          className="skills-header"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I work with across domains.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skills.map((category, ci) => (
            <motion.div
              key={category.category}
              className="skill-card"
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * ci }}
            >
              <h3 className="skill-card-title">{category.category}</h3>
              <div className="skill-items">
                {category.items.map((skill, si) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      className="skill-item"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: 0.08 * ci + 0.04 * si,
                      }}
                    >
                      <Icon />
                      <span>{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { FiGithub } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import './Activity.css';

export default function Activity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="activity" ref={ref}>
      <div className="activity-inner">
        <motion.div
          className="activity-header"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Coding Activity</h2>
          <p className="section-subtitle">
            Consistency in practice — my contributions across platforms.
          </p>
        </motion.div>

        <div className="activity-grid">
          {/* GitHub */}
          <motion.div
            className="activity-card"
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="activity-card-title">
              <FiGithub /> GitHub
            </h3>
            <p className="activity-card-subtitle">Contribution graph from the past year</p>
            <div className="activity-card-body">
              <GitHubCalendar
                username="AnsariUsaid"
                colorScheme="dark"
                blockSize={12}
                blockMargin={4}
                fontSize={12}
                hideColorLegend
                style={{ width: '100%' }}
              />
            </div>
          </motion.div>

          {/* LeetCode */}
          <motion.div
            className="activity-card"
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="activity-card-title">
              <SiLeetcode /> LeetCode
            </h3>
            <p className="activity-card-subtitle">Problem solving stats and activity</p>
            <div className="activity-card-body">
              <iframe
                className="leetcode-frame"
                src="https://leetcard.jacoblin.cool/ansariusaid?theme=dark&font=Inter&ext=heatmap"
                title="LeetCode Stats"
                loading="lazy"
              />
            </div>
            <div className="activity-stats">
              <div className="activity-stat">
                <span className="activity-stat-value">197</span>
                <span className="activity-stat-label">Problems Solved</span>
              </div>
              <div className="activity-stat">
                <span className="activity-stat-value">284</span>
                <span className="activity-stat-label">Submissions</span>
              </div>
              <div className="activity-stat">
                <span className="activity-stat-value">71</span>
                <span className="activity-stat-label">Active Days</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

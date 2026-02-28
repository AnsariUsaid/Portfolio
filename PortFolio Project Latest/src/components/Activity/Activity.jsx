import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { ActivityCalendar } from 'react-activity-calendar';
import { FiGithub } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import './Activity.css';

function useLeetCodeData(username) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://alfa-leetcode-api.onrender.com/${username}/calendar`
        );
        const json = await res.json();
        const calendar = JSON.parse(json.submissionCalendar);

        // Build a map of date strings → submission count from the API
        const countByDate = {};
        for (const [ts, count] of Object.entries(calendar)) {
          const d = new Date(Number(ts) * 1000);
          const y = d.getUTCFullYear();
          const m = String(d.getUTCMonth() + 1).padStart(2, '0');
          const day = String(d.getUTCDate()).padStart(2, '0');
          countByDate[`${y}-${m}-${day}`] = count;
        }

        // Fill all days in the past year
        const activities = [];
        const today = new Date();
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);

        for (
          let d = new Date(oneYearAgo);
          d <= today;
          d.setDate(d.getDate() + 1)
        ) {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          const dateStr = `${y}-${m}-${day}`;
          const count = countByDate[dateStr] || 0;
          const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 9 ? 3 : 4;

          activities.push({ date: dateStr, count, level });
        }

        setData({
          activities,
          streak: json.streak || 0,
          totalActiveDays: json.totalActiveDays || 0,
        });
      } catch (err) {
        console.error('Failed to fetch LeetCode data:', err);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [username]);

  return { data, loading };
}

export default function Activity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { data: leetcodeData, loading } = useLeetCodeData('Codelearner005');

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
            <p className="activity-card-subtitle">Problem solving activity heatmap</p>

            {/* Stats row */}
            {leetcodeData && (
              <div className="leetcode-stats-row">
                <div className="leetcode-stat">
                  <span className="leetcode-stat-value">{leetcodeData.totalActiveDays}</span>
                  <span className="leetcode-stat-label">Active Days</span>
                </div>
                <div className="leetcode-stat">
                  <span className="leetcode-stat-value">{leetcodeData.streak}</span>
                  <span className="leetcode-stat-label">Max Streak</span>
                </div>
              </div>
            )}

            {/* Heatmap */}
            <div className="activity-card-body">
              {loading ? (
                <div className="activity-loading">Loading heatmap...</div>
              ) : leetcodeData ? (
                <ActivityCalendar
                  data={leetcodeData.activities}
                  theme={{
                    dark: ['#161616', '#39d353'],
                  }}
                  colorScheme="dark"
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  hideColorLegend
                  hideTotalCount
                />
              ) : (
                <div className="activity-loading">Could not load LeetCode data</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

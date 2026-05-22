import { useState, useEffect } from 'react';
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

        const countByDate = {};
        for (const [ts, count] of Object.entries(calendar)) {
          const d = new Date(Number(ts) * 1000);
          const y = d.getUTCFullYear();
          const m = String(d.getUTCMonth() + 1).padStart(2, '0');
          const day = String(d.getUTCDate()).padStart(2, '0');
          countByDate[`${y}-${m}-${day}`] = count;
        }

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
  const { data: leetcodeData, loading } = useLeetCodeData('Codelearner005');
  const [activeIndex, setActiveIndex] = useState(0);

  const getCardStyle = (index) => ({
    flex: activeIndex === index ? 5 : 1,
    transition: "flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  });

  return (
    <section className="activity" id="activity">
      <div className="activity-inner">
        <div className="activity-header">
          <h2 className="section-title">Coding Activity</h2>
          <p className="section-subtitle">
            Consistency in practice — my contributions across platforms.
          </p>
        </div>

        <div className="activity-cards-wrapper">
          {/* GitHub Card */}
          <div
            className="activity-card github-card"
            data-active={activeIndex === 0}
            onMouseEnter={() => setActiveIndex(0)}
            onClick={() => setActiveIndex(0)}
            style={getCardStyle(0)}
          >
            {/* Collapsed view */}
            <div className="activity-card-collapsed">
              <FiGithub size={48} />
              <span className="collapsed-text">GitHub</span>
            </div>

            {/* Expanded Content */}
            <div className="activity-card-content">
              <h3 className="activity-card-title">
                <FiGithub /> GitHub
              </h3>
              <p className="activity-card-subtitle">Contribution graph from the past year</p>
              <div className="activity-card-body">
                <div className="activity-card-content-inner">
                  <GitHubCalendar
                    username="AnsariUsaid"
                    colorScheme="dark"
                    blockSize={12}
                    blockMargin={4}
                    fontSize={12}
                    hideColorLegend
                    showWeekdayLabels
                  />
                </div>
              </div>
            </div>
          </div>

          {/* LeetCode Card */}
          <div
            className="activity-card leetcode-card"
            data-active={activeIndex === 1}
            onMouseEnter={() => setActiveIndex(1)}
            onClick={() => setActiveIndex(1)}
            style={getCardStyle(1)}
          >
            {/* Collapsed view */}
            <div className="activity-card-collapsed">
              <SiLeetcode size={48} />
              <span className="collapsed-text">LeetCode</span>
            </div>

            {/* Expanded Content */}
            <div className="activity-card-content">
              <h3 className="activity-card-title">
                <SiLeetcode /> LeetCode
              </h3>
              <p className="activity-card-subtitle">Problem solving activity heatmap</p>

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

              <div className="activity-card-body">
                <div className="activity-card-content-inner">
                  {loading ? (
                    <div className="activity-loading">Loading heatmap...</div>
                  ) : leetcodeData ? (
                    <ActivityCalendar
                      data={leetcodeData.activities}
                      theme={{ dark: ['#161616', '#39d353'] }}
                      colorScheme="dark"
                      blockSize={12}
                      blockMargin={4}
                      fontSize={12}
                      hideColorLegend
                      hideTotalCount
                      showWeekdayLabels
                    />
                  ) : (
                    <div className="activity-loading">Could not load LeetCode data</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

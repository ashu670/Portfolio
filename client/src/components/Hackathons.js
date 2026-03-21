import React from "react";
import "./Hackathons.css";

const ACHIEVEMENTS = [
  {
    id: 1,
    type: "hackathon",
    title: "Hack-IOT Hackathon",
    org: "Lovely Professional University",
    date: "Feb 2024",
    icon: "🏆",
    description:
      "Participated in the Hack-IOT Hackathon organized by LPU, collaborating on an IoT-focused problem statement under competitive conditions.",
    link: process.env.REACT_APP_HACKATHON_LINK_1,
  },
];

const COMPETITIVE = [
  {
    id: 1,
    icon: "⚡",
    title: "50+ DSA Problems Solved",
    platforms: "LeetCode & GeeksforGeeks",
    period: "Jan 2025 – Present",
    color: "var(--accent)",
    link: process.env.REACT_APP_CP_LINK_1,
  },
  {
    id: 2,
    icon: "⭐",
    title: "5-Star Rating — Core Java",
    platforms: "HackerRank",
    period: "Dec 2025",
    color: "var(--amber)",
    link: process.env.REACT_APP_CP_LINK_2,
  },
];

export default function Hackathons() {
  return (
    <section id="hackathons" className="hack">
      <div className="container">
        <p className="section-label">09 // competitive programming & hackathons</p>
        <h2 className="section-title hack__title">Achievements</h2>

        <div className="hack__layout">
          {/* Hackathons */}
          <div className="hack__col">
            <h3 className="hack__col-title">
              <span className="hack__col-icon">🧩</span> Hackathons
            </h3>
            <div className="hack__events">
              {ACHIEVEMENTS.map((a) => (
                <div key={a.id} className="hack__event">
                  <div className="hack__event-icon">{a.icon}</div>
                  <div className="hack__event-body">
                    <h4 className="hack__event-title">{a.title}</h4>
                    <p className="hack__event-meta">
                      {a.org} · <span>{a.date}</span>
                    </p>
                    <p className="hack__event-desc">{a.description}</p>
                    {a.link && (
                      <a href={a.link} target="_blank" rel="noopener noreferrer" className="hack__btn">
                        View Certificate ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitive */}
          <div className="hack__col">
            <h3 className="hack__col-title">
              <span className="hack__col-icon">📊</span> Competitive Programming
            </h3>
            <div className="hack__cp-list">
              {COMPETITIVE.map((c) => (
                <div key={c.id} className="hack__cp-card" style={{ "--cp-color": c.color }}>
                  <span className="hack__cp-icon">{c.icon}</span>
                  <div>
                    <p className="hack__cp-title">{c.title}</p>
                    <p className="hack__cp-meta">
                      {c.platforms} · {c.period}
                    </p>
                    {c.link && (
                      <a href={c.link} target="_blank" rel="noopener noreferrer" className="hack__cp-link">
                        View Profile ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

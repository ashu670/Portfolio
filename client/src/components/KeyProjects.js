import React, { useState } from "react";
import "./KeyProjects.css";

const PROJECTS = [
  {
    id: 1, name: "GhostApp", tagline: "Full-Stack Social Media & Real-Time Chat", year: "2024",
    description: "A production-grade social platform built from scratch — JWT auth, dynamic post feed with media uploads, engagement system (likes, comments, shares), and one-to-one real-time messaging via Socket.io. Designed with scalable architecture and security best practices throughout.",
    live: "https://ghost-app-psi.vercel.app/", github: "https://github.com/ashu670/ghostapp",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT", "Multer"],
    highlights: ["Real-time 1-on-1 chat — text, images, GIFs, stickers", "JWT auth with bcrypt & fully protected routes", "Post system with text, media, pagination & notifications", "Deployed on Vercel + Render with production config"],
    accent: "#63ffb4", icon: "👻",
  },
  {
    id: 2, name: "SmartHome360", tagline: "IoT Smart Home Dashboard", year: "2024",
    description: "A comprehensive smart home control panel for managing and monitoring IoT devices from a single interface. Role-based family accounts, room-based device organisation, electricity analytics, activity logs, and Spotify OAuth media control — all with dark/light theming.",
    live: null, github: "https://github.com/ashu670/SmartIOTDashboard",
    stack: ["React", "Node.js", "Express", "MongoDB", "Spotify API", "JWT", "Tailwind"],
    highlights: ["Room-based device organisation with real-time toggle", "Role-based family access control (admin + members)", "Spotify OAuth — per-user linked playback control", "Electricity analytics & complete system activity log"],
    accent: "#4fc3f7", icon: "🏠",
  },
];

export default function KeyProjects() {
  const [active, setActive] = useState(null);
  return (
    <section id="key-projects" className="kp">
      <div className="container">
        <p className="section-label">02 // key projects</p>
        <div className="kp__header">
          <h2 className="section-title">Things I've Built</h2>
          <p className="kp__sub">Handpicked projects — production-grade work, not tutorials.</p>
        </div>
        <div className="kp__grid">
          {PROJECTS.map((p, i) => (
            <article key={p.id} className={`kp__card ${active === p.id ? "kp__card--open" : ""}`} style={{ "--card-accent": p.accent, animationDelay: `${i * 0.1}s` }}>
              <div className="kp__card-top-bar">
                <div className="kp__mac-dots">
                  <span className="kp__mac-dot kp__mac-dot--red"></span>
                  <span className="kp__mac-dot kp__mac-dot--yellow"></span>
                  <span className="kp__mac-dot kp__mac-dot--green"></span>
                </div>
                <div className="kp__card-links">
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer" className="kp__link kp__link--live"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>Live Demo ↗</a>}
                  {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="kp__link kp__link--gh"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>Code</a>}
                </div>
              </div>
              <h3 className="kp__name">{p.name}</h3>
              <p className="kp__tagline">{p.tagline}</p>
              <p className="kp__desc">{p.description}</p>
              <div className="kp__highlights">
                <p className="kp__highlights-label">Key highlights</p>
                <ul className="kp__highlights-list">
                  {p.highlights.map(h => <li key={h}>{h}</li>)}
                </ul>
              </div>
              <div className="kp__stack">
                {p.stack.map(s => <span key={s} className="kp__pill">{s}</span>)}
              </div>
              <button className="kp__toggle" onClick={() => setActive(active === p.id ? null : p.id)}>
                {active === p.id ? "Show less ↑" : "More details ↓"}
              </button>
              <div className="kp__corner" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

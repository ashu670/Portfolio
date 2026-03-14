import React from "react";
import "./About.css";

const SKILLS = [
  { cat:"Frontend",   items:["React","HTML5 / CSS3","JavaScript ES6+","TailwindCSS","Vite"] },
  { cat:"Backend",    items:["Node.js","Express.js","REST APIs","Socket.io","JWT"] },
  { cat:"Database",   items:["MongoDB","MySQL","PostgreSQL","Firebase"] },
  { cat:"Tools & CS", items:["Git & GitHub","Docker","Linux","DSA","OOP"] },
];

export default function About({ profile }) {
  return (
    <section id="about" className="about">
      <div className="container about__inner">
        <div className="about__text">
          <p className="section-label">01 // about</p>
          <h2 className="section-title about__title">Who I Am</h2>
          <div className="about__body">
            <p>I'm <strong>Abhay Lal</strong> — a B.Tech CSE student at Lovely Professional University with a genuine passion for full-stack development. I love turning ideas into working products, from pixel-perfect UIs to robust server-side logic.</p>
            <p>Whether it's architecting a REST API, wiring up a React frontend, or debugging a gnarly database query at 2am — I'm all in. I believe clean code and good user experience go hand in hand.</p>
            <p>Currently deepening my skills in system design and open-source contribution. Always looking for the next interesting problem to solve.</p>
            {profile?.location&&<p className="about__location"><span className="about__icon">📍</span>{profile.location}</p>}
            <p className="about__location"><span className="about__icon">🎓</span>B.Tech CSE — Lovely Professional University</p>
          </div>
          {profile?.html_url&&(
            <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost about__gh-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              github.com/ashu670 ↗
            </a>
          )}
        </div>
        <div className="about__skills">
          {SKILLS.map(({cat,items})=>(
            <div key={cat} className="about__skill-group">
              <h3 className="about__skill-cat">{cat}</h3>
              <ul className="about__skill-list">
                {items.map(s=><li key={s} className="about__skill-tag"><span className="about__skill-arrow">▸</span>{s}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

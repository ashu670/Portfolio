import React from "react";
import "./About.css";

export default function About({ profile }) {
  return (
    <section id="about" className="about">
      <div className="container about__inner">
        <div className="about__text">
          <p className="section-label">01 // about me</p>
          <h2 className="section-title about__title">Who I Am</h2>
          <div className="about__body">
            <p>
              I'm <strong>Abhay Lal</strong> — a B.Tech CSE student at Lovely Professional
              University with a genuine passion for full-stack development. I love turning ideas
              into working products, from pixel-perfect UIs to robust server-side logic.
            </p>
            <p>
              Whether it's architecting a REST API, building a real-time chat system with
              Socket.io, or designing a smart IoT dashboard — I'm all in. I believe clean
              code and great user experience go hand in hand.
            </p>
            <p>
              Currently deepening my skills in system design, competitive programming, and
              open-source contribution. Always looking for the next interesting problem to solve.
            </p>
          </div>

          <div className="about__meta-grid">
            <div className="about__meta-item">
              <span className="about__meta-label">📍 Location</span>
              <span className="about__meta-val">{profile?.location || "India"}</span>
            </div>
            <div className="about__meta-item">
              <span className="about__meta-label">🎓 Education</span>
              <span className="about__meta-val">B.Tech CSE — LPU (2023–Present)</span>
            </div>
            <div className="about__meta-item">
              <span className="about__meta-label">📊 CGPA</span>
              <span className="about__meta-val">6.84</span>
            </div>
            <div className="about__meta-item">
              <span className="about__meta-label">📧 Email</span>
              <span className="about__meta-val">abhaylal122@gmail.com</span>
            </div>
            <div className="about__meta-item">
              <span className="about__meta-label">📱 Phone</span>
              <span className="about__meta-val">+91-9205395518</span>
            </div>
            <div className="about__meta-item">
              <span className="about__meta-label">🟢 Status</span>
              <span className="about__meta-val about__meta-accent">Open to Internships</span>
            </div>
          </div>

          <div className="about__links">
            {profile?.html_url && (
              <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                github.com/ashu670 ↗
              </a>
            )}
            <a href="https://linkedin.com/in/abhay" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* Abstract Graphic Side */}
        <div className="about__graphic-side">
          <div className="about__quick-stats">
            <div className="about__qs">
              <span className="about__qs-n">{profile?.public_repos ?? "—"}</span>
              <span className="about__qs-l">Public Repos</span>
            </div>
            <div className="about__qs">
              <span className="about__qs-n">3+</span>
              <span className="about__qs-l">Projects</span>
            </div>
            <div className="about__qs">
              <span className="about__qs-n">50+</span>
              <span className="about__qs-l">DSA Solved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

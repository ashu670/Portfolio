import React, { useState } from "react";
import "./Contact.css";

export default function Contact({ profile }) {
  const [copied, setCopied] = useState(false);
  const email = profile?.email || "abhaylal122@gmail.com";

  const copy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">
        <div className="contact__glow" aria-hidden="true" />
        <p className="section-label">04 // contact</p>
        <h2 className="section-title contact__title">Let's Build Something</h2>
        <p className="contact__sub">
          Open to internships, collaborations, and interesting projects.<br />
          Drop a message — I respond fast.
        </p>

        <div className="contact__actions">
          <button className="contact__email-btn" onClick={copy}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            {copied ? "Copied! ✓" : email}
          </button>
        </div>

        <div className="contact__links">
          <a href={profile?.html_url || "https://github.com/ashu670"} target="_blank" rel="noopener noreferrer" className="contact__social-link contact__social-link--primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
            github.com/ashu670
          </a>
          <a href="https://linkedin.com/in/abhaylal" target="_blank" rel="noopener noreferrer" className="contact__social-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
            LinkedIn
          </a>
        </div>

        <p className="contact__footer-note">
          Currently studying B.Tech CSE @ LPU · Open to work · <span className="contact__accent">ashu670</span> on GitHub
        </p>
      </div>
    </section>
  );
}

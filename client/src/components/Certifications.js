import React from "react";
import "./Certifications.css";

const CERTS = [
  {
    id: 1,
    title: "Game Development Mastery",
    issuer: "Cipher School",
    date: "Sept 2025",
    icon: "🎮",
    color: "var(--accent)",
    link: process.env.REACT_APP_CERT_LINK_1,
  },
  {
    id: 2,
    title: "Build Generative AI Apps and Solutions with No-Code Tools",
    issuer: "Infosys",
    date: "Aug 2025",
    icon: "🤖",
    color: "var(--cyan)",
    link: process.env.REACT_APP_CERT_LINK_2,
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="certs">
      <div className="container">
        <p className="section-label">08 // certifications & courses</p>
        <h2 className="section-title certs__title">Certifications</h2>

        <div className="certs__grid">
          {CERTS.map((c) => (
            <div key={c.id} className="certs__card" style={{ "--cert-color": c.color }}>
              <div className="certs__card-top">
                <span className="certs__icon">{c.icon}</span>
                <span className="certs__date">{c.date}</span>
              </div>
              <h3 className="certs__name">{c.title}</h3>
              <p className="certs__issuer">Issued by <strong>{c.issuer}</strong></p>
              {c.link && (
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="certs__card-link">
                  View Certificate ↗
                </a>
              )}
              <div className="certs__bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

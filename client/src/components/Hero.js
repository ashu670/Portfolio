import React, { useEffect, useState } from "react";
import "./Hero.css";

const TITLES = ["Full Stack Developer", "B.Tech CSE @ LPU", "React & Node.js Dev", "Open Source Builder"];

function useTypewriter(texts, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = texts[idx];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx(c => c + 1); }, charIdx === current.length ? pause : speed);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => { setDisplay(current.slice(0, charIdx)); setCharIdx(c => c - 1); }, speed / 2);
    } else if (charIdx > current.length) { setDeleting(true); }
    else { setDeleting(false); setIdx(i => (i + 1) % texts.length); setCharIdx(0); }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, texts, speed, pause]);
  return display;
}

export default function Hero({ profile }) {
  const typed = useTypewriter(TITLES);
  const resUrl = process.env.REACT_APP_RESUME_LINK;
  return (
    <section id="hero" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__greeting fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="hero__greeting-line" />Hello, World.
          </p>
          <h1 className="hero__name fade-up" style={{ animationDelay: "0.2s" }}>
            {profile?.name || "Abhay Lal"}
          </h1>
          <div className="hero__typewriter fade-up" style={{ animationDelay: "0.3s" }}>
            <span className="hero__typed">{typed}</span>
          </div>
          <div className="hero__skills fade-up" style={{ animationDelay: "0.35s" }}>
            React • Node.js • System Design
          </div>
          <p className="hero__bio fade-up" style={{ animationDelay: "0.4s" }}>
            {profile?.bio || "B.Tech CSE student at LPU. Full-stack developer passionate about building production-grade web apps using React, Node.js, and scalable backend systems."}
          </p>
          <div className="hero__actions fade-up" style={{ animationDelay: "0.6s" }}>
            <a href={resUrl || "#"} target="_blank" rel="noopener noreferrer" className="btn btn-primary">My Resume</a>
            <a href="#projects" className="btn btn-ghost">View Projects ↓</a>
            <a href="#contact" className="btn btn-minimal">Get in Touch</a>
          </div>
          <div className="hero__availability fade-up" style={{ animationDelay: "0.7s" }}>
            <span className="hero__badge-dot" /> available for work
          </div>
        </div>
      </div>
      <div className="hero__scroll-hint fade-up" style={{ animationDelay: "1s" }}>
        <span>scroll</span><div className="hero__scroll-line" />
      </div>
    </section>
  );
}

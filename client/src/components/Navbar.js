import React, { useState, useEffect } from "react";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "about",          href: "#about" },
  { label: "skills",         href: "#skills" },
  { label: "projects",       href: "#key-projects" },
  { label: "repos",          href: "#projects" },
  { label: "activity",       href: "#contributions" },
  { label: "contact",        href: "#contact" },
];

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__logo">
          <span className="navbar__logo-bracket">&lt;</span>
          {profile?.login || "ashu670"}
          <span className="navbar__logo-bracket">/&gt;</span>
        </a>
        <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className="navbar__link" onClick={() => setMenuOpen(false)}>
                <span className="navbar__link-num">./</span>{label}
              </a>
            </li>
          ))}
          {profile?.html_url && (
            <li>
              <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost navbar__cta">
                GitHub ↗
              </a>
            </li>
          )}
        </ul>
        <button className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

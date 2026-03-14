import React from "react";
import "./Footer.css";

export default function Footer({ profile }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span className="footer__brand">
          <span className="footer__bracket">&lt;</span>
          {profile?.login || "ashu670"}
          <span className="footer__bracket">/&gt;</span>
        </span>
        <span className="footer__note">
          Built with React + Node.js · Live via GitHub API
        </span>
        <span className="footer__year">© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

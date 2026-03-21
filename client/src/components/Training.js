import React from "react";
import "./Training.css";

const TRAININGS = [
  {
    id: 1,
    title: "Game Development Mastery",
    org: "Cipher School",
    period: "Jun 2025 – Jul 2025",
    icon: "🎮",
    description:
      "An intensive hands-on training in C# programming and the Unity engine, covering everything from core scripting fundamentals to building fully playable 2D games.",
    highlights: [
      "Mastered C# scripting fundamentals and Unity engine workflows — scene management, game object lifecycle, and editor tooling",
      "Built complete 2D gameplay systems: player controllers, camera tracking, collision detection, object interaction, and collectible mechanics",
      "Implemented reusable prefabs, modular component-based scripts, and structured project organisation aligned with production-level game dev practices",
      "Delivered working game prototypes applying core design patterns for scalable, maintainable game codebases",
    ],
    tech: ["Unity", "C#", "2D Game Dev", "Prefabs", "Component Architecture"],
    cert: "Sept 2025",
    link: process.env.REACT_APP_GM_LINK,
  },
];

export default function Training() {
  return (
    <section id="training" className="training">
      <div className="container">
        <p className="section-label">07 // training</p>
        <h2 className="section-title training__title">Training</h2>

        <div className="training__list">
          {TRAININGS.map((t) => (
            <div key={t.id} className="training__card">
              <div className="training__card-left">
                <div className="training__icon-wrap">
                  <span className="training__icon">{t.icon}</span>
                </div>
                <div className="training__line" />
              </div>

              <div className="training__card-body">
                <div className="training__header">
                  <div>
                    <h3 className="training__title-text">{t.title}</h3>
                    <p className="training__org">
                      <span className="training__org-name">{t.org}</span>
                      <span className="training__sep">·</span>
                      <span className="training__period">{t.period}</span>
                    </p>
                  </div>
                  <div className="training__actions">
                    {t.cert && (
                      <div className="training__badge">
                        <span>🏅</span> Certified {t.cert}
                      </div>
                    )}
                    {t.link && (
                      <a
                        href={t.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="training__btn"
                      >
                        View Project <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>

                <p className="training__desc">{t.description}</p>

                <ul className="training__highlights">
                  {t.highlights.map((h) => (
                    <li key={h}>
                      <span className="training__bullet">▸</span>{h}
                    </li>
                  ))}
                </ul>

                <div className="training__tech">
                  {t.tech.map((s) => (
                    <span key={s} className="training__pill">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

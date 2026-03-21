import React from "react";
import "./Skills.css";

const SKILL_GROUPS = [
  {
    cat: "Languages",
    icon: "⌨",
    items: [
      { name: "JavaScript", level: 85 },
      { name: "Java (Core + Advanced)", level: 80 },
      { name: "C++", level: 70 },
      { name: "Python", level: 65 },
      { name: "C#", level: 60 },
    ],
  },
  {
    cat: "Frontend",
    icon: "🖥",
    items: [
      { name: "React", level: 85 },
      { name: "HTML5 / CSS3", level: 90 },
      { name: "TailwindCSS", level: 80 },
      { name: "Vite", level: 75 },
    ],
  },
  {
    cat: "Backend",
    icon: "⚙",
    items: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 82 },
      { name: "REST APIs", level: 80 },
      { name: "Socket.io", level: 75 },
      { name: "JWT Auth", level: 78 },
    ],
  },
  {
    cat: "Databases",
    icon: "🗄",
    items: [
      { name: "MongoDB", level: 80 },
      { name: "PostgreSQL", level: 70 },
      { name: "MySQL", level: 72 },
    ],
  },
  {
    cat: "Tools & Platforms",
    icon: "🛠",
    items: [
      { name: "Git & GitHub", level: 85 },
      { name: "IntelliJ IDEA", level: 75 },
      { name: "Unity (C#)", level: 55 },
      { name: "Linux", level: 60 },
    ],
  },
  {
    cat: "Soft Skills",
    icon: "🤝",
    items: [
      { name: "Problem Solving", level: 88 },
      { name: "Team Collaboration", level: 85 },
      { name: "Adaptability", level: 90 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <p className="section-label">02 // skills & technologies</p>
        <h2 className="section-title skills__title">My Tech Stack</h2>

        <div className="skills__grid">
          {SKILL_GROUPS.map(({ cat, icon, items }) => (
            <div key={cat} className="skills__card">
              <div className="skills__card-head">
                <span className="skills__icon">{icon}</span>
                <h3 className="skills__cat">{cat}</h3>
              </div>
              <div className="skills__items">
                {items.map(({ name, level }) => (
                  <div key={name} className="skills__item">
                    <div className="skills__item-top">
                      <span className="skills__item-name">{name}</span>
                      <span className="skills__item-pct">{level}%</span>
                    </div>
                    <div className="skills__bar-bg">
                      <div
                        className="skills__bar-fill"
                        style={{ "--w": `${level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { getLangColor, timeAgo } from "../utils";
import "./RepoCard.css";

export default function RepoCard({ repo, index }) {
  const langColor = getLangColor(repo.language);
  const desc = repo.description || "No description provided.";

  return (
    <article className="repo-card" style={{ animationDelay: `${index * 0.06}s` }}>
      <div className="repo-card__header">
        <div className="repo-card__icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm1 2v14h16V5H4zm2 2h12v2H6V7zm0 4h12v2H6v-2zm0 4h8v2H6v-2z" /></svg></div>
        <h3 className="repo-card__name">{repo.name.replace(/-/g, " ")}</h3>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-card__link" aria-label="Open on GitHub">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
        </a>
      </div>
      <p className="repo-card__desc">{desc}</p>
      {repo.topics?.length > 0 && (
        <div className="repo-card__topics">
          {repo.topics.slice(0, 3).map(t => <span key={t} className="repo-card__topic">{t}</span>)}
        </div>
      )}
      <div className="repo-card__footer">
        <div className="repo-card__meta">
          {repo.language && <span className="repo-card__lang"><span className="lang-dot" style={{ background: langColor }} />{repo.language}</span>}
          {repo.stargazers_count > 0 && <span className="repo-card__stat"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>{repo.stargazers_count}</span>}
          {repo.forks_count > 0 && <span className="repo-card__stat">{repo.forks_count} forks</span>}
        </div>
        <span className="repo-card__updated">Updated {timeAgo(repo.updated_at)}</span>
      </div>
      {repo.homepage && <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="repo-card__demo">Live Demo ↗</a>}
    </article>
  );
}

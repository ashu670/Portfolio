import React, { useState } from "react";
import { useGitHubRepos } from "../hooks/useGitHub";
import RepoCard from "./RepoCard";
import "./Projects.css";

export default function Projects() {
  const { repos, allRepos, loading, error, filter, setFilter, search, setSearch, languages } = useGitHubRepos();
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? repos : repos.slice(0, 9);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="projects__header">
          <div>
            <p className="section-label">03 // projects</p>
            <h2 className="section-title">My Repositories</h2>
          </div>
          <div className="projects__live-badge">
            <span className="projects__live-dot" />
            Live from GitHub
            {!loading && <span className="projects__count">({allRepos.length} repos)</span>}
          </div>
        </div>

        <div className="projects__controls">
          <div className="projects__search-wrap">
            <svg className="projects__search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input className="projects__search" type="text" placeholder="Search repos..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="projects__filters">
            {languages.map(lang => (
              <button key={lang} className={`projects__filter-btn ${filter === lang ? "projects__filter-btn--active" : ""}`} onClick={() => setFilter(lang)}>
                {lang}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="projects__loading">
            <div className="projects__spinner" />
            <p>Fetching repositories from GitHub…</p>
          </div>
        ) : error ? (
          <div className="projects__error">
            <p>⚠ Could not load repositories. Check your GitHub username in server config.</p>
            <code>{error}</code>
          </div>
        ) : repos.length === 0 ? (
          <div className="projects__empty"><p>No repositories found for the current filter.</p></div>
        ) : (
          <>
            <div className="projects__grid">
              {displayed.map((repo, i) => <RepoCard key={repo.id} repo={repo} index={i} />)}
            </div>
            {repos.length > 9 && (
              <div className="projects__more">
                <button className="btn btn-ghost" onClick={() => setShowAll(!showAll)}>
                  {showAll ? "Show Less ↑" : `Show All ${repos.length} Repos ↓`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

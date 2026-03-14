import { useState, useEffect } from "react";

export function useGitHubProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Note: This project uses Create React App (react-scripts) based on package.json, so we use process.env.REACT_APP_API_URL
  const API_BASE = process.env.REACT_APP_API_URL || "";

  useEffect(() => {
    fetch(`${API_BASE}/api/github/profile`)
      .then(r => r.json())
      .then(data => { setProfile(data); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);
  return { profile, loading, error };
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const API_BASE = process.env.REACT_APP_API_URL || "";

  useEffect(() => {
    fetch(`${API_BASE}/api/github/repos`)
      .then(async r => {
        if (!r.ok) {
          const text = await r.text();
          throw new Error(text.startsWith('<') ? 'Received HTML error instead of JSON API response. Verify backend URL.' : 'API Error');
        }
        return r.json();
      })
      .then(data => { setRepos(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  const languages = ["all", ...new Set(repos.map(r => r.language).filter(Boolean))].sort((a, b) => a === "all" ? -1 : a.localeCompare(b));

  const filtered = repos.filter(r => {
    const matchLang = filter === "all" || r.language === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || (r.description || "").toLowerCase().includes(q) || (r.topics || []).some(t => t.includes(q));
    return matchLang && matchSearch;
  });

  return { repos: filtered, allRepos: repos, loading, error, filter, setFilter, search, setSearch, languages };
}

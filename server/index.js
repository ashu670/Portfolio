require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const NodeCache = require("node-cache");
const path = require("path");

const app = express();
const cache = new NodeCache({ stdTTL: 300 });

app.use(cors());
app.use(express.json());

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
const PORT = process.env.PORT || 5000;

const githubHeaders = {
  Accept: "application/vnd.github.v3+json",
  ...(GITHUB_TOKEN && { Authorization: `token ${GITHUB_TOKEN}` }),
};

app.get("/api/github/profile", async (req, res) => {
  const cacheKey = `profile_${GITHUB_USERNAME}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);
  try {
    const { data } = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers: githubHeaders });
    cache.set(cacheKey, data);
    res.json(data);
  } catch (err) {
    console.error("GitHub profile error:", err.message);
    res.status(500).json({ error: "Failed to fetch GitHub profile" });
  }
});

app.get("/api/github/repos", async (req, res) => {
  const cacheKey = `repos_${GITHUB_USERNAME}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);
  try {
    let allRepos = [];
    let page = 1;
    let hasMore = true;
    while (hasMore) {
      const { data } = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
        headers: githubHeaders,
        params: { per_page: 100, page, sort: "updated", direction: "desc" },
      });
      allRepos = [...allRepos, ...data];
      hasMore = data.length === 100;
      page++;
    }
    const ownRepos = allRepos.filter((r) => !r.fork);
    const enriched = ownRepos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      topics: repo.topics,
      updated_at: repo.updated_at,
      created_at: repo.created_at,
    }));
    cache.set(cacheKey, enriched);
    res.json(enriched);
  } catch (err) {
    console.error("GitHub repos error:", err.message);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (_, res) => res.sendFile(path.join(__dirname, "../client/build/index.html")));
}

app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio server running on http://localhost:${PORT}`);
  console.log(`📡 GitHub username: ${GITHUB_USERNAME}\n`);
});

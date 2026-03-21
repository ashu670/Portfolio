require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const NodeCache = require("node-cache");
const path = require("path");

const app = express();
const cache = new NodeCache({ stdTTL: 300 });

app.use(cors({ origin: "*" }));
app.use(express.json());

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "ashu670";
const GITHUB_TOKEN    = process.env.GITHUB_TOKEN    || "";
const PORT            = process.env.PORT            || 5000;

const githubHeaders = {
  Accept: "application/vnd.github.v3+json",
  ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
};

// ── Profile ──────────────────────────────────────────────
app.get("/api/github/profile", async (req, res) => {
  const key = `profile_${GITHUB_USERNAME}`;
  const hit = cache.get(key);
  if (hit) return res.json(hit);
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      { headers: githubHeaders }
    );
    cache.set(key, data);
    res.json(data);
  } catch (err) {
    console.error("Profile error:", err.message);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// ── Repos ─────────────────────────────────────────────────
app.get("/api/github/repos", async (req, res) => {
  const key = `repos_${GITHUB_USERNAME}`;
  const hit = cache.get(key);
  if (hit) return res.json(hit);
  try {
    // Fetch first page to get data and determine total pages from 'link' header
    const firstPageRes = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
      { headers: githubHeaders, params: { type: "all", per_page: 100, page: 1, sort: "created", direction: "desc" } }
    );
    let all = [...firstPageRes.data];

    let totalPages = 1;
    const linkHeader = firstPageRes.headers.link;
    if (linkHeader) {
      const match = linkHeader.match(/page=(\d+)>; rel="last"/);
      if (match && match[1]) totalPages = parseInt(match[1], 10);
    }

    if (totalPages > 1) {
      const pageRequests = [];
      for (let page = 2; page <= totalPages; page++) {
        pageRequests.push(
          axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
            headers: githubHeaders,
            params: { type: "all", per_page: 100, page, sort: "created", direction: "desc" }
          }).catch(() => ({ data: [] }))
        );
      }
      const responses = await Promise.all(pageRequests);
      responses.forEach(res => {
        if (res?.data) all = [...all, ...res.data];
      });
    }
    const enriched = all.map(r => ({
      id: r.id, name: r.name, description: r.description,
      html_url: r.html_url, homepage: r.homepage, language: r.language,
      stargazers_count: r.stargazers_count, forks_count: r.forks_count,
      topics: r.topics, updated_at: r.updated_at, created_at: r.created_at,
    })).sort((a,b) => new Date(b.updated_at) - new Date(a.updated_at));
    cache.set(key, enriched);
    res.json(enriched);
  } catch (err) {
    console.error("Repos error:", err.message);
    res.status(500).json({ error: "Failed to fetch repos" });
  }
});

// ── Contributions via GraphQL (matches GitHub profile heatmap exactly) ───────
app.get("/api/github/contributions", async (req, res) => {
  const key = `contributions_${GITHUB_USERNAME}`;
  const hit = cache.get(key);
  if (hit) return res.json(hit);

  // GraphQL requires a token — fall back to REST events if no token
  if (!GITHUB_TOKEN) {
    console.warn("No GITHUB_TOKEN — falling back to public events (limited data)");
    return fallbackToEvents(req, res, key);
  }

  try {
    const query = `
      query($login: String!) {
        user(login: $login) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                  color
                }
              }
            }
          }
        }
      }
    `;

    const { data: gql } = await axios.post(
      "https://api.github.com/graphql",
      { query, variables: { login: GITHUB_USERNAME } },
      { headers: { ...githubHeaders, "Content-Type": "application/json" } }
    );

    if (gql.errors) {
      console.error("GraphQL errors:", gql.errors);
      return fallbackToEvents(req, res, key);
    }

    const cal = gql.data.user.contributionsCollection.contributionCalendar;

    // Reshape to match our frontend format: { weeks, totalContributions }
    const weeks = cal.weeks.map(w =>
      w.contributionDays.map(d => ({
        date:  d.date,
        count: d.contributionCount,
        color: d.color,
      }))
    );

    const result = {
      weeks,
      totalContributions: cal.totalContributions,
      // also expose totalCommits alias so frontend works either way
      totalCommits: cal.totalContributions,
    };

    cache.set(key, result);
    res.json(result);
  } catch (err) {
    console.error("GraphQL contributions error:", err.message);
    return fallbackToEvents(req, res, key);
  }
});

// Fallback: public REST events (only ~90 days, public pushes only)
async function fallbackToEvents(req, res, cacheKey) {
  try {
    let allEvents = [];
    const pageRequests = [1, 2, 3].map(page =>
      axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
        headers: githubHeaders,
        params: { per_page: 100, page }
      }).catch(() => ({ data: [] }))
    );
    const responses = await Promise.all(pageRequests);
    responses.forEach(res => {
      if (res?.data) allEvents = [...allEvents, ...res.data];
    });

    const commitsByDay = {};
    allEvents.forEach(event => {
      if (event.type === "PushEvent") {
        const day = event.created_at.slice(0, 10);
        const n   = event.payload?.commits?.length || 0;
        commitsByDay[day] = (commitsByDay[day] || 0) + n;
      }
    });

    // Build 52-week grid
    const weeks = [];
    const today = new Date(); today.setHours(0,0,0,0);
    const start = new Date(today); start.setDate(start.getDate() - 364);
    while (start.getDay() !== 0) start.setDate(start.getDate() - 1);
    const cur = new Date(start);
    while (cur <= today) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        const s = cur.toISOString().slice(0, 10);
        week.push({ date: s, count: commitsByDay[s] || 0 });
        cur.setDate(cur.getDate() + 1);
      }
      weeks.push(week);
    }

    const totalCommits = Object.values(commitsByDay).reduce((a,b)=>a+b, 0);
    const result = { weeks, totalCommits, totalContributions: totalCommits, fallback: true };
    cache.set(cacheKey, result);
    res.json(result);
  } catch (err) {
    console.error("Fallback events error:", err.message);
    res.status(500).json({ error: "Failed to fetch contributions" });
  }
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (_, res) => res.sendFile(path.join(__dirname, "../client/build/index.html")));
}

app.listen(PORT, () => {
  console.log(`\n🚀 Server → http://localhost:${PORT}`);
  console.log(`📡 GitHub: ${GITHUB_USERNAME}`);
  console.log(`🔑 Token:  ${GITHUB_TOKEN ? "✅ set (GraphQL heatmap active)" : "❌ missing — add to .env for full heatmap"}\n`);
});

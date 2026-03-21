import React, { useState, useEffect } from "react";
import "./Contributions.css";

// Use GitHub's own color if available, otherwise map count to level
function getLevel(count) {
  if (count === 0)  return 0;
  if (count <= 2)   return 1;
  if (count <= 5)   return 2;
  if (count <= 9)   return 3;
  return 4;
}

// Map GitHub's hex colors to our CSS level classes
function colorToLevel(color) {
  if (!color || color === "#ebedf0" || color === "#161b22") return 0;
  const map = {
    "#9be9a8": 1, "#40c463": 2, "#30a14e": 3, "#216e39": 4,
    // dark theme variants
    "#0e4429": 4, "#006d32": 3, "#26a641": 2, "#39d353": 1,
  };
  return map[color.toLowerCase()] ?? 1;
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function Contributions() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    fetch("/api/github/contributions")
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // Build month label positions from first day of each week
  const monthLabels = [];
  if (data?.weeks) {
    let lastMonth = -1;
    data.weeks.forEach((week, wi) => {
      if (!week[0]) return;
      const m = new Date(week[0].date).getMonth();
      if (m !== lastMonth) {
        monthLabels.push({ wi, label: MONTHS[m] });
        lastMonth = m;
      }
    });
  }

  const total = data?.totalContributions ?? data?.totalCommits ?? 0;

  return (
    <section id="contributions" className="contrib">
      <div className="container">
        <p className="section-label">06 // open source contributions</p>

        <div className="contrib__head">
          <h2 className="section-title">GitHub Activity</h2>
          {data && (
            <div className="contrib__stats">
              <div className="contrib__stat">
                <span className="contrib__stat-n">{total}</span>
                <span className="contrib__stat-l">contributions in the last year</span>
              </div>
              {data.fallback && (
                <span className="contrib__fallback-note">
                  ⚠ Add GITHUB_TOKEN to .env for full heatmap data
                </span>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="contrib__loading">
            <div className="contrib__spinner" />
            <span>Loading activity…</span>
          </div>
        ) : !data ? (
          <p className="contrib__error">Could not load GitHub activity.</p>
        ) : (
          <div className="contrib__wrap">

            {/* Month labels */}
            <div className="contrib__months">
              <div className="contrib__day-spacer" />
              {data.weeks.map((_, wi) => {
                const found = monthLabels.find(m => m.wi === wi);
                return (
                  <div key={wi} className="contrib__month-cell">
                    {found ? found.label : ""}
                  </div>
                );
              })}
            </div>

            {/* Day labels + grid */}
            <div className="contrib__grid-row">
              <div className="contrib__day-labels">
                {DAYS.map((d, i) => (
                  <span key={d} className="contrib__day-label">
                    {i % 2 === 1 ? d : ""}
                  </span>
                ))}
              </div>

              <div className="contrib__grid">
                {data.weeks.map((week, wi) => (
                  <div key={wi} className="contrib__week">
                    {week.map((day) => {
                      const level = day.color
                        ? colorToLevel(day.color)
                        : getLevel(day.count);
                      return (
                        <div
                          key={day.date}
                          className={`contrib__cell contrib__cell--l${level}`}
                          onMouseEnter={(e) =>
                            setTooltip({ day, x: e.clientX, y: e.clientY })
                          }
                          onMouseLeave={() => setTooltip(null)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="contrib__legend">
              <span className="contrib__legend-label">Less</span>
              {[0,1,2,3,4].map(l => (
                <div key={l} className={`contrib__cell contrib__cell--l${l} contrib__cell--lg`} />
              ))}
              <span className="contrib__legend-label">More</span>
            </div>

            <div className="contrib__footer">
              <a
                href={`https://github.com/ashu670`}
                target="_blank"
                rel="noopener noreferrer"
                className="contrib__gh-link"
              >
                View full profile on GitHub ↗
              </a>
            </div>
          </div>
        )}

        {/* Tooltip — rendered at fixed position */}
        {tooltip && (
          <div
            className="contrib__tooltip"
            style={{ left: tooltip.x + 14, top: tooltip.y - 48, position:"fixed", zIndex:9999 }}
          >
            <strong>
              {tooltip.day.count} contribution{tooltip.day.count !== 1 ? "s" : ""}
            </strong>
            <span>{tooltip.day.date}</span>
          </div>
        )}
      </div>
    </section>
  );
}

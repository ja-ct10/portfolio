"use client";

import { useEffect, useState } from "react";

const GITHUB_USERNAME = "ja-ct10";

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4
}

export default function GitHubActivity() {
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContributions() {
      try {
        // Use GitHub's GraphQL API via a public proxy for contribution data
        const query = `query {
          user(login: "${GITHUB_USERNAME}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    contributionLevel
                  }
                }
              }
            }
          }
        }`;

        // Try the official GitHub GraphQL with a public token approach
        // Fallback: use the contributions API
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.contributions) {
            const days: ContributionDay[] = data.contributions.map((d: { date: string; count: number; level: number }) => ({
              date: d.date,
              count: d.count,
              level: d.level,
            }));
            setContributions(days);
            // Sum all day counts for accurate total
            const computedTotal = days.reduce((sum: number, d: ContributionDay) => sum + d.count, 0);
            setTotalCount(computedTotal);
          }
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchContributions();
  }, []);

  // Group contributions into weeks (columns of 7 days)
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <div className="github-graph-section">
      {/* Header */}
      <div className="github-graph-header">
        <span className="section-subtitle mb-2">03 - GITHUB CONTRIBUTIONS</span>
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="github-graph-link"
        >
          @{GITHUB_USERNAME} &#8599;
        </a>
      </div>

      {/* Contribution graph */}
      <div className="github-graph-wrap">
        {loading ? (
          <div className="github-graph-loading">Loading contributions...</div>
        ) : (
          <div className="github-graph-grid">
            {weeks.map((week, wi) => (
              <div key={wi} className="github-graph-col">
                {week.map((day, di) => (
                  <div
                    key={`${wi}-${di}`}
                    className={`github-graph-dot github-graph-dot--${day.level}`}
                    title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="github-graph-footer">
        <span>{totalCount.toLocaleString()} CONTRIBUTIONS IN THE LAST YEAR</span>
      </div>
    </div>
  );
}

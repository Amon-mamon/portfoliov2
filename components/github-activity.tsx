"use client";

import React from "react";
import useSWR from "swr";

export interface GitHubStats {
  totalContributions: number;
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalIssueContributions: number;
  totalRepositoryContributions: number;
  weeks: Array<{
    contributionDays: Array<{
      contributionCount: number;
      date: string;
      color: string;
    }>;
  }>;
}

// Global SWR Fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GitHubActivity({ username }: { username: string }) {
  // SWR automatically handles caching, revalidation, and loading states
  const { data, error, isLoading } = useSWR<GitHubStats>(
    username ? `/api/github?username=${username}` : null,
    fetcher,
    {
      revalidateOnFocus: false, // Prevents unnecessary re-fetches when switching browser tabs
      dedupingInterval: 60000, // Dedupes requests within 1 minute
    }
  );

  // 1. Loading Skeleton State
  if (isLoading) {
    return (
      <div className="@container w-full min-w-0 max-w-full bg-[#181818] border border-[#2b2b2b] rounded-xl p-5 space-y-4 font-mono animate-pulse">
        <div className="flex items-center justify-between border-b border-[#2b2b2b] pb-3 text-xs">
          <span className="text-[#808080]">// loading github_activity.graphql...</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-[#1e1e1e] rounded-lg border border-[#2b2b2b]" />
          ))}
        </div>
      </div>
    );
  }

  // 2. Error Fallback State
  if (error || !data) {
    return (
      <div className="w-full bg-[#181818] border border-[#2b2b2b] rounded-xl p-5 font-mono text-xs text-[#f14c4c]">
        // Error fetching github_activity.graphql
      </div>
    );
  }

  // Extract flat array of recent days for mini heatmap display
  const recentDays = data.weeks.flatMap((w) => w.contributionDays).slice(-120);

  // 3. Rendered Content
  return (
    <section className="@container w-full min-w-0 max-w-full bg-[#181818] border border-[#2b2b2b] rounded-xl p-5 md:p-6 space-y-4 shadow-2xl overflow-hidden relative font-mono">
      {/* VS Code Panel Header */}
      <div className="flex items-center justify-between border-b border-[#2b2b2b] pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[#569cd6]">03.</span>
          <span className="text-[#808080]">.git/</span>
          <span className="text-[#ce9178]">activity_log.graphql</span>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-[#6a9955]">
          <span className="w-2 h-2 rounded-full bg-[#4ec9b0] animate-pulse" />
          <span>swr_cached</span>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#1e1e1e] border border-[#2b2b2b] p-3 rounded-lg">
          <p className="text-[#808080] text-[10px] uppercase">Total Commits</p>
          <p className="text-[#4ec9b0] font-bold text-lg mt-0.5">
            {data.totalCommitContributions.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#1e1e1e] border border-[#2b2b2b] p-3 rounded-lg">
          <p className="text-[#808080] text-[10px] uppercase">Pull Requests</p>
          <p className="text-[#569cd6] font-bold text-lg mt-0.5">
            {data.totalPullRequestContributions.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#1e1e1e] border border-[#2b2b2b] p-3 rounded-lg">
          <p className="text-[#808080] text-[10px] uppercase">Repos Created</p>
          <p className="text-[#b5cea8] font-bold text-lg mt-0.5">
            {data.totalRepositoryContributions.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#1e1e1e] border border-[#2b2b2b] p-3 rounded-lg">
            <p className="text-[#808080] text-[10px] uppercase">Total Contributions</p>
            <p className="text-[#4ec9b0] font-bold text-lg mt-0.5">
                {data.totalContributions.toLocaleString()}
            </p>
        </div>
      </div>

      {/* Contribution Grid */}
     {/* Full 52-Week Contribution Grid */}
<div className="pt-2">
  <div className="flex items-center justify-between mb-2 font-mono">
    <p className="text-[#808080] text-xs">// full_year_contribution_calendar</p>
    <div className="flex items-center gap-1.5 text-[10px] text-[#808080]">
      <span>Less</span>
      <span className="w-2.5 h-2.5 rounded-xs bg-[#252526]" />
      <span className="w-2.5 h-2.5 rounded-xs bg-[#0e4429]" />
      <span className="w-2.5 h-2.5 rounded-xs bg-[#006d32]" />
      <span className="w-2.5 h-2.5 rounded-xs bg-[#26a641]" />
      <span className="w-2.5 h-2.5 rounded-xs bg-[#39d353]" />
      <span>More</span>
    </div>
  </div>

    {/* Horizontal Scroll Wrapper */}
    <div className="bg-[#1e1e1e] border border-[#2b2b2b] p-4 rounded-lg overflow-x-auto min-w-0 w-full scrollbar-thin scrollbar-thumb-[#333333]">
        {/* 
        CRITICAL GRID LAYOUT:
        grid-rows-7 forces Sunday-Saturday rows.
        grid-flow-col forces weeks to fill horizontally left-to-right.
        */}
        <div className="inline-grid grid-rows-3 grid-flow-col gap-1 min-w-max">
        {data.weeks.flatMap((week) =>
            week.contributionDays.map((day) => {
            let bg = "bg-[#252526]";
            if (day.contributionCount > 0) bg = "bg-[#0e4429]";
            if (day.contributionCount > 3) bg = "bg-[#006d32]";
            if (day.contributionCount > 6) bg = "bg-[#26a641]";
            if (day.contributionCount > 10) bg = "bg-[#39d353]";

            return (
                <div
                key={day.date}
                title={`${day.date}: ${day.contributionCount} contributions`}
                className={`w-3 h-3 rounded-xs ${bg} transition-transform hover:scale-125 cursor-pointer`}
                />
            );
            })
        )}
        </div>
    </div>
    </div>

      {/* VS Code Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-[#2b2b2b]/60 text-[11px] text-[#666666]">
        <span>query &#123; user(login: &quot;{username}&quot;) &#125;</span>
        <span className="text-[#4ec9b0]">200 OK</span>
      </div>
    </section>
  );
}
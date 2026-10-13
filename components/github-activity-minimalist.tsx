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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GitHubActivityMinimalist({ username }: { username: string }) {
  const { data, error, isLoading } = useSWR<GitHubStats>(
    username ? `/api/github?username=${username}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  // 1. Skeleton Loading State
  if (isLoading) {
    return (
      <div className="w-full bg-white border border-slate-200 rounded-2xl p-6 space-y-4 animate-pulse shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="h-5 w-40 bg-slate-200 rounded" />
          <div className="h-4 w-20 bg-slate-100 rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-slate-50 border border-slate-100 rounded-xl" />
          ))}
        </div>
        <div className="h-28 bg-slate-50 border border-slate-100 rounded-xl" />
      </div>
    );
  }

  // 2. Error State
  if (error || !data || !Array.isArray(data.weeks)) {
    return (
      <div className="w-full bg-red-50/50 border border-red-200 rounded-2xl p-6 font-mono text-xs text-red-600">
        Unable to load GitHub activity for &quot;{username}&quot;. Please check API configuration.
      </div>
    );
  }

  return (
    <section className="w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">GitHub Activity <span className="text-sm">@</span> 2026</h3>
          <p className="text-xs text-slate-500">Real-time open source contributions &amp; commit metrics</p>
        </div>

        <div className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-mono text-slate-600 border border-slate-200/60 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>@{username}</span>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-50/70 border border-slate-200/80 p-4 rounded-xl">
          <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider">Commits</p>
          <p className="text-slate-900 font-extrabold text-xl sm:text-2xl mt-1 tracking-tight">
            {data.totalCommitContributions.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-50/70 border border-slate-200/80 p-4 rounded-xl">
          <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider">Pull Requests</p>
          <p className="text-indigo-600 font-extrabold text-xl sm:text-2xl mt-1 tracking-tight">
            {data.totalPullRequestContributions.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-50/70 border border-slate-200/80 p-4 rounded-xl">
          <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider">Repos Created</p>
          <p className="text-slate-900 font-extrabold text-xl sm:text-2xl mt-1 tracking-tight">
            {data.totalRepositoryContributions.toLocaleString()}
          </p>
        </div>

        <div className="bg-slate-50/70 border border-slate-200/80 p-4 rounded-xl">
          <p className="text-slate-500 text-[11px] font-medium uppercase tracking-wider">Total Contributions</p>
          <p className="text-emerald-600 font-extrabold text-xl sm:text-2xl mt-1 tracking-tight">
            {data.totalContributions.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Contribution Calendar Heatmap */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono font-medium text-slate-700">Contribution Calendar</span>
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Less</span>
            <span className="w-3 h-3 rounded-xs bg-slate-100 border border-slate-200" />
            <span className="w-3 h-3 rounded-xs bg-emerald-200" />
            <span className="w-3 h-3 rounded-xs bg-emerald-400" />
            <span className="w-3 h-3 rounded-xs bg-emerald-600" />
            <span className="w-3 h-3 rounded-xs bg-emerald-800" />
            <span>More</span>
          </div>
        </div>

        {/* Scrollable Grid Container */}
        <div className="bg-slate-50/60 border border-slate-200/80 p-4 rounded-xl overflow-x-auto min-w-0 w-full scrollbar-thin scrollbar-thumb-slate-300">
          <div className="inline-grid grid-rows-4 grid-flow-col gap-1 min-w-max">
            {data.weeks.flatMap((week) =>
              week.contributionDays.map((day) => {
                let bg = "bg-slate-100 border border-slate-200/50";
                if (day.contributionCount > 0) bg = "bg-emerald-200 border border-emerald-300/60";
                if (day.contributionCount > 3) bg = "bg-emerald-400 border border-emerald-500/60";
                if (day.contributionCount > 6) bg = "bg-emerald-600 border border-emerald-700/60";
                if (day.contributionCount > 10) bg = "bg-emerald-800 border border-emerald-900/60";

                return (
                  <div
                    key={day.date}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    className={`w-3 h-3 rounded-xs ${bg} transition-all duration-150 hover:scale-125 cursor-pointer`}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-400">
        <span>data_source: github_graphql_v4</span>
        <span className="text-emerald-600 font-medium">Status: Active</span>
      </div>
    </section>
  );
}
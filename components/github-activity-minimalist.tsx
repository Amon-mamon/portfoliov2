"use client";

import React from "react";
import useSWR from "swr";
import { CountUp } from "@/components/minimalist/Reveal";

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

  // No data and no error yet = loading. (SWR's isLoading is false on the server but
  // true on the client's first render, which caused a hydration mismatch.)
  if (isLoading || (!data && !error)) {
    return (
      <div className="w-full animate-pulse space-y-6 rounded-3xl bg-paper-deep p-6 sm:p-8">
        <div className="h-6 w-48 rounded bg-sand" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 rounded-xl bg-sand" />
          ))}
        </div>
        <div className="h-24 rounded-xl bg-sand" />
      </div>
    );
  }

  if (error || !data || !Array.isArray(data.weeks)) {
    return (
      <div className="w-full rounded-3xl bg-paper-deep p-6 text-base text-ink-soft sm:p-8">
        GitHub activity is unavailable right now.{" "}
        <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-ember-deep underline underline-offset-4">
          View @{username} on GitHub
        </a>
      </div>
    );
  }

  const stats = [
    { label: "Contributions", value: data.totalContributions, accent: true },
    { label: "Commits", value: data.totalCommitContributions },
    { label: "Pull requests", value: data.totalPullRequestContributions },
    { label: "Repos created", value: data.totalRepositoryContributions },
  ];

  const level = (n: number) =>
    n > 10 ? "bg-ember-deep" : n > 6 ? "bg-ember" : n > 3 ? "bg-[#f29a7a]" : n > 0 ? "bg-[#f7c9b6]" : "bg-[#dcd2c2]";

  return (
    <section className="w-full space-y-7 rounded-3xl bg-paper-deep p-6 sm:p-8">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-xl font-bold text-ink">GitHub activity</h3>
          <p className="text-sm text-ink-soft">Contributions over the past year</p>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper sm:self-auto"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500" />@{username}
        </a>
      </div>

      <dl className="grid grid-cols-2 gap-5 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <dt className="text-sm font-medium text-stone-warm">{s.label}</dt>
            <dd className={`mt-1 text-3xl font-bold tracking-tight ${s.accent ? "text-ember-deep" : "text-ink"}`}>
              <CountUp value={s.value} />
            </dd>
          </div>
        ))}
      </dl>

      <div className="space-y-2">
        <div className="overflow-x-auto pb-2">
          <div className="inline-grid min-w-max grid-flow-col grid-rows-7 gap-[3px]">
            {data.weeks.flatMap((week) =>
              week.contributionDays.map((day) => (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.contributionCount} contributions`}
                  className={`h-2.5 w-2.5 rounded-[2px] ${level(day.contributionCount)}`}
                />
              ))
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-1.5 text-xs text-stone-warm">
          <span>Less</span>
          {[0, 1, 4, 7, 11].map((n) => (
            <span key={n} className={`h-2.5 w-2.5 rounded-[2px] ${level(n)}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </section>
  );
}

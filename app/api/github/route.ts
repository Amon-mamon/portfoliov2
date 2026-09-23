import { NextResponse } from "next/server";

const GITHUB_GRAPHQL_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoryContributions
        restrictedContributionsCount # Captures private contributions
        contributionCalendar {
          totalContributions # <-- THIS MATCHES THE 375 NUMBER ON YOUR PROFILE
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username parameter is required" },
      { status: 400 }
    );
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN is missing in .env.local" },
      { status: 500 }
    );
  }

  // Set date range for the current calendar year (Jan 1 - Dec 31)
  const currentYear = new Date().getFullYear();
  const from = new Date(currentYear, 0, 1, 0, 0, 0).toISOString();
  const to = new Date(currentYear, 11, 31, 23, 59, 59).toISOString();

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "NextJS-App",
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: { username, from, to },
      }),
      next: { revalidate: 3600 },
    });

    const { data, errors } = await res.json();

    if (errors && errors.length > 0) {
      return NextResponse.json({ error: errors[0].message }, { status: 400 });
    }

    if (!data?.user) {
      return NextResponse.json(
        { error: `GitHub user "${username}" was not found.` },
        { status: 404 }
      );
    }

    const collection = data.user.contributionsCollection;

    return NextResponse.json({
      year: currentYear,
      // Use totalContributions for exact match with GitHub profile header
      totalContributions: collection.contributionCalendar.totalContributions,
      totalCommitContributions: collection.totalCommitContributions,
      totalPullRequestContributions: collection.totalPullRequestContributions,
      totalRepositoryContributions: collection.totalRepositoryContributions,
      privateContributions: collection.restrictedContributionsCount,
      weeks: collection.contributionCalendar.weeks,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub GraphQL API" },
      { status: 500 }
    );
  }
}
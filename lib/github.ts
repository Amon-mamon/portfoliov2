// lib/github.ts

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

const GITHUB_GRAPHQL_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
        totalRepositoryContributions
        contributionCalendar {
          totalContributions
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

export async function getGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GITHUB_GRAPHQL_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600 }, // Revalidate data every hour
    });

    const { data } = await res.json();
    const collection = data.user.contributionsCollection;

    return {
      totalContributions: collection.contributionCalendar.totalContributions,
      totalCommitContributions: collection.totalCommitContributions,
      totalPullRequestContributions: collection.totalPullRequestContributions,
      totalIssueContributions: collection.totalIssueContributions,
      totalRepositoryContributions: collection.totalRepositoryContributions,
      weeks: collection.contributionCalendar.weeks,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub GraphQL data:", error);
    return null;
  }
}
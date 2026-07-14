import { useQuery } from "@tanstack/react-query";
import { GITHUB_USERNAME } from "@/data/github";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  private: boolean;
}

export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

const GH_HEADERS = { Accept: "application/vnd.github+json" };

async function fetchRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    { headers: GH_HEADERS }
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

async function fetchUser(): Promise<GitHubUser> {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
    headers: GH_HEADERS,
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

/** All public repositories, refreshed every 5 minutes. */
export function useGitHubRepos() {
  return useQuery<GitHubRepo[]>({
    queryKey: ["github-repos", GITHUB_USERNAME],
    queryFn: fetchRepos,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

/** Public profile stats, refreshed every 5 minutes. */
export function useGitHubUser() {
  return useQuery<GitHubUser>({
    queryKey: ["github-user", GITHUB_USERNAME],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
}

/** Total stars across all repos. */
export function useTotalStars() {
  const { data: repos, ...rest } = useGitHubRepos();
  const total = repos?.reduce((sum, r) => sum + r.stargazers_count, 0) ?? 0;
  return { data: total, ...rest };
}

/** Language usage breakdown (sorted by repo count). */
export function useLanguageStats() {
  const { data: repos, ...rest } = useGitHubRepos();
  const counts: Record<string, number> = {};
  repos?.forEach((r) => {
    if (r.language) counts[r.language] = (counts[r.language] ?? 0) + 1;
  });
  const total = Object.values(counts).reduce((s, v) => s + v, 0) || 1;
  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count, percent: Math.round((count / total) * 100) }));
  return { data: sorted, ...rest };
}

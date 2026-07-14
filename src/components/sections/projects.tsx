import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  Calendar,
  ExternalLink,
  Code2,
  AlertCircle,
  ChevronDown,
  RefreshCw,
} from "lucide-react";
import { useGitHubRepos, type GitHubRepo } from "@/hooks/useGitHub";
import { FEATURED_REPOS, HIDDEN_REPOS, GITHUB_USERNAME } from "@/data/github";

// GitHub's official language colours (subset)
const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  "Jupyter Notebook": "#DA5B0B",
  Shell: "#89e051",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  C: "#555555",
  "C++": "#f34b7d",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Single repo card ────────────────────────────────────────────────────────

function RepoCard({
  repo,
  featured = false,
  delay = 0,
}: {
  repo: GitHubRepo;
  featured?: boolean;
  delay?: number;
}) {
  const langColor = repo.language
    ? (LANG_COLORS[repo.language] ?? "#8b949e")
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-6 flex flex-col h-full group border border-border hover:border-primary/40 transition-colors duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Code2 className="w-4 h-4 text-primary shrink-0" />
          <h3
            className="font-bold text-sm group-hover:text-primary transition-colors truncate"
            title={repo.name}
          >
            {repo.name}
          </h3>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {featured && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 font-semibold whitespace-nowrap">
              ★ Featured
            </span>
          )}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label={`Open ${repo.name} on GitHub`}
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-grow line-clamp-3 min-h-[3.5rem]">
        {repo.description ?? (
          <span className="italic opacity-60">No description provided.</span>
        )}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/60 border border-border text-foreground/70"
            >
              {t}
            </span>
          ))}
          {repo.topics.length > 4 && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/40 border border-border text-foreground/40">
              +{repo.topics.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-border/50">
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          {langColor && (
            <span className="flex items-center gap-1.5 font-medium">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: langColor }}
              />
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            {repo.forks_count}
          </span>
        </div>
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground whitespace-nowrap">
          <Calendar className="w-3 h-3" />
          {formatDate(repo.updated_at)}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Skeleton loader ─────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-6 flex flex-col gap-3 animate-pulse">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded bg-muted" />
        <div className="h-3.5 w-36 rounded bg-muted" />
      </div>
      <div className="h-3 w-full rounded bg-muted" />
      <div className="h-3 w-4/5 rounded bg-muted" />
      <div className="h-3 w-2/3 rounded bg-muted" />
      <div className="mt-auto flex gap-2 pt-3 border-t border-border/40">
        <div className="h-4 w-14 rounded-full bg-muted" />
        <div className="h-4 w-8 rounded-full bg-muted" />
        <div className="h-4 w-8 rounded-full bg-muted" />
      </div>
    </div>
  );
}

// ─── Section header with divider ─────────────────────────────────────────────

function SubHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-8"
    >
      <span className="text-primary">{icon}</span>
      <h3 className="text-base font-bold font-mono tracking-wide text-foreground">
        {label}
      </h3>
      <div className="flex-1 h-px bg-border/60" />
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function Projects() {
  const { data: repos, isLoading, isError, refetch, isFetching } = useGitHubRepos();
  const [showAll, setShowAll] = useState(false);

  const visible = repos?.filter((r) => !HIDDEN_REPOS.includes(r.name)) ?? [];
  const featured = visible.filter((r) => FEATURED_REPOS.includes(r.name));
  const others = visible.filter((r) => !FEATURED_REPOS.includes(r.name));
  const displayedOthers = showAll ? others : others.slice(0, 6);

  return (
    <section id="projects" className="py-24 relative bg-muted/20">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            <span className="text-primary">04.</span> Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 rounded-full" />
        </motion.div>

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <span className="text-xs text-muted-foreground font-mono">
            Live from{" "}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline"
            >
              github.com/{GITHUB_USERNAME}
            </a>
            {repos && (
              <span className="text-foreground/50">
                {" · "}{visible.length} public repositories
              </span>
            )}
          </span>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-40"
            title="Refresh from GitHub"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? "animate-spin" : ""}`} />
          </button>
        </motion.div>

        {/* Error state */}
        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3 text-muted-foreground py-12 mb-16"
          >
            <AlertCircle className="w-8 h-8 text-red-400" />
            <p className="text-sm">Couldn't reach GitHub API. Check your connection.</p>
            <button
              onClick={() => refetch()}
              className="text-xs font-mono px-4 py-2 border border-border rounded-lg hover:border-primary/40 hover:text-primary transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {/* ── Featured Projects ── */}
        {(isLoading || featured.length > 0) && (
          <div className="mb-16">
            <SubHeader
              icon={<Github className="w-5 h-5" />}
              label="Featured Projects"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : featured.map((repo, i) => (
                    <RepoCard
                      key={repo.id}
                      repo={repo}
                      featured
                      delay={i * 0.07}
                    />
                  ))}
            </div>
          </div>
        )}

        {/* ── Other Projects ── */}
        {(isLoading || others.length > 0) && (
          <div>
            <SubHeader
              icon={<Code2 className="w-5 h-5" />}
              label={`Other Projects${!isLoading && others.length > 0 ? ` (${others.length})` : ""}`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))
                : displayedOthers.map((repo, i) => (
                    <RepoCard key={repo.id} repo={repo} delay={i * 0.05} />
                  ))}
            </div>

            {!isLoading && others.length > 6 && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setShowAll((v) => !v)}
                  className="flex items-center gap-2 text-sm font-mono px-6 py-3 rounded-xl border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                >
                  {showAll ? "Show Less" : `Show All ${others.length} Repos`}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      showAll ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

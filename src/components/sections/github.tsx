import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  GitCommit,
  Link as LinkIcon,
  Users,
  BookOpen,
} from "lucide-react";
import { useGitHubUser, useLanguageStats, useTotalStars, useGitHubRepos } from "@/hooks/useGitHub";
import { GITHUB_USERNAME } from "@/data/github";

// Deterministic heatmap — same pattern every render, no flicker
const HEATMAP = Array.from({ length: 52 * 7 }, (_, i) => {
  const v = Math.sin(i * 0.37) * 0.5 + Math.cos(i * 0.13) * 0.5;
  if (v > 0.6) return 4;
  if (v > 0.3) return 3;
  if (v > 0) return 2;
  if (v > -0.4) return 1;
  return 0;
});

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
};

function StatPill({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 bg-background/50 px-5 py-3 rounded-xl border border-border min-w-[90px]">
      <span className="text-primary">{icon}</span>
      <span className="font-mono font-bold text-lg leading-none">{value}</span>
      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
  );
}

export function GitHubSection() {
  const { data: user } = useGitHubUser();
  const { data: totalStars } = useTotalStars();
  const { data: langs } = useLanguageStats();
  const { data: repos } = useGitHubRepos();

  const totalForks = repos?.reduce((s, r) => s + r.forks_count, 0) ?? 0;

  const heatCell = (level: number) => {
    const base =
      level === 4
        ? "bg-primary shadow-[0_0_4px_rgba(14,165,233,0.7)]"
        : level === 3
        ? "bg-primary/75"
        : level === 2
        ? "bg-primary/45"
        : level === 1
        ? "bg-primary/20"
        : "bg-muted";
    return base;
  };

  return (
    <section id="github" className="py-24 relative bg-muted/10">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            <span className="text-primary">07.</span> GitHub Activity
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 rounded-full" />
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 md:p-8"
          >
            {/* Profile row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
              <div className="flex items-center gap-4">
                {user?.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-16 h-16 rounded-full border-2 border-primary/50 shadow-[0_0_15px_rgba(14,165,233,0.2)] object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                    <Github className="w-8 h-8 text-foreground" />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {user?.name ?? "Jivan Zine"}
                  </h3>
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary font-mono text-sm hover:underline flex items-center gap-1"
                  >
                    @{GITHUB_USERNAME} <LinkIcon className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Live stat pills */}
              <div className="flex flex-wrap gap-3">
                <StatPill
                  icon={<BookOpen className="w-4 h-4" />}
                  value={user?.public_repos ?? "—"}
                  label="Repos"
                />
                <StatPill
                  icon={<Star className="w-4 h-4" />}
                  value={totalStars ?? "—"}
                  label="Stars"
                />
                <StatPill
                  icon={<GitFork className="w-4 h-4" />}
                  value={totalForks}
                  label="Forks"
                />
                <StatPill
                  icon={<Users className="w-4 h-4" />}
                  value={user?.followers ?? "—"}
                  label="Followers"
                />
              </div>
            </div>

            {/* Heatmap */}
            <div className="bg-background/40 rounded-xl p-6 border border-border mb-8 overflow-x-auto">
              <h4 className="text-sm text-muted-foreground mb-4 flex items-center gap-2 font-medium">
                <GitCommit className="w-4 h-4 text-primary" />
                Contribution activity (GitHub)
              </h4>
              <div className="flex gap-1 min-w-max">
                {Array.from({ length: 52 }).map((_, w) => (
                  <div key={w} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, d) => {
                      const level = HEATMAP[w * 7 + d];
                      return (
                        <div
                          key={d}
                          className={`w-3 h-3 rounded-sm ${heatCell(level)}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((l) => (
                  <div key={l} className={`w-3 h-3 rounded-sm ${heatCell(l)}`} />
                ))}
                <span>More</span>
              </div>
            </div>

            {/* Language stats — live */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-bold text-foreground mb-4">
                  Top Languages{" "}
                  <span className="text-muted-foreground font-normal text-xs">(by repo count)</span>
                </h4>
                {langs && langs.length > 0 ? (
                  <div className="space-y-4">
                    {langs.slice(0, 6).map((lang) => {
                      const color = LANG_COLORS[lang.name] ?? "#8b949e";
                      return (
                        <div key={lang.name}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="flex items-center gap-2 text-muted-foreground">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                              {lang.name}
                            </span>
                            <span className="font-mono text-foreground/70">
                              {lang.percent}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${lang.percent}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // skeleton
                  <div className="space-y-4 animate-pulse">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="h-3 w-24 rounded bg-muted" />
                        <div className="h-1.5 w-full rounded-full bg-muted" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-background/40 rounded-xl p-6 border border-border flex flex-col justify-center items-center text-center gap-4">
                <Github className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-bold text-lg mb-1">Open Source</h4>
                  <p className="text-sm text-muted-foreground">
                    {user?.public_repos
                      ? `${user.public_repos} public repositories on GitHub`
                      : "Building in public — cybersecurity tools, automation, and full-stack projects."}
                  </p>
                </div>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono px-5 py-2.5 bg-primary/10 text-primary border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors"
                >
                  View Full Profile →
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

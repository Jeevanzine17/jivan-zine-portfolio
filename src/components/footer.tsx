import { ChevronUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-background py-10 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start">
            <span className="font-mono font-bold text-lg tracking-tighter mb-2">
              <span className="text-primary">JS</span>Zine
            </span>
            <p className="text-muted-foreground text-sm text-center md:text-left max-w-sm">
              Securing applications through offensive testing, defensive analysis, and continuous learning.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <button 
              onClick={scrollToTop}
              className="p-3 rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-all group shadow-sm"
              aria-label="Back to top"
            >
              <ChevronUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </button>
            <p className="text-sm font-mono text-muted-foreground">
              © {new Date().getFullYear()} Jivan Suresh Zine. All rights reserved.
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

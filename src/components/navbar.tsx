import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Security Labs", href: "#labs" },
  { name: "Stats", href: "#stats" },
  { name: "GitHub", href: "#github" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active section logic based on scroll position
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = "home";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          current = section;
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 py-3 shadow-lg shadow-black/10"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a 
          href="#home" 
          className="flex items-center gap-2 group cursor-pointer"
          data-clickable="true"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 overflow-hidden group-hover:border-primary transition-colors">
            <ShieldAlert className="w-5 h-5 text-primary" />
            <div className="absolute inset-0 bg-primary/20 scale-0 group-hover:scale-100 transition-transform rounded-full blur-md" />
          </div>
          <span className="font-mono font-bold text-lg tracking-tighter">
            <span className="text-primary">JS</span>Zine
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all relative ${
                activeSection === link.href.substring(1)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              data-clickable="true"
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-4 p-2 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            data-clickable="true"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 hidden dark:block" />
            <Moon className="h-4 w-4 block dark:hidden" />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex xl:hidden items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:text-foreground"
            data-clickable="true"
          >
            <Sun className="h-4 w-4 hidden dark:block" />
            <Moon className="h-4 w-4 block dark:hidden" />
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground"
            data-clickable="true"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-xl p-4 flex flex-col gap-2 max-h-[80vh] overflow-y-auto"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === link.href.substring(1)
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

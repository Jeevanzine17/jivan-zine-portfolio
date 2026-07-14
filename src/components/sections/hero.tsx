import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, Github, Linkedin, Mail, Terminal, ChevronDown, Rocket } from "lucide-react";
import { Eye } from "lucide-react";


export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const phrases = [
  "Application Security Engineer",
  "Security Researcher",
  "SOC Analyst",
  "Backend Developer",
  "Bug Bounty Hunter"
];

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Typing effect
  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const delay = !isDeleting && typedText === currentPhrase ? 2000 : 
                  isDeleting && typedText === "" ? 500 : typingSpeed;

    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentPhrase) {
        setIsDeleting(true);
      } else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      } else {
        setTypedText(
          isDeleting
            ? currentPhrase.substring(0, typedText.length - 1)
            : currentPhrase.substring(0, typedText.length + 1)
        );
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex, phrases]);

  // Particle network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 80;
    const connectionDistance = 150;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isLight = document.documentElement.classList.contains("dark") === false;
      const primaryColor = isLight ? "14, 165, 233" : "14, 165, 233"; // Cyan RGB

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryColor}, 0.5)`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${primaryColor}, ${0.2 * (1 - dist / connectionDistance)})`;
            ctx.stroke();
          }
        }
      });
    };

    init();
    animate();
    window.addEventListener("resize", init);

    return () => window.removeEventListener("resize", init);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines">
      {/* Scroll Progress Bar at top */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-primary z-50 origin-left shadow-[0_0_10px_hsl(var(--primary))]"
        style={{ scaleX: scrollYProgress, width: "100%" }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50 dark:opacity-40"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <motion.div 
        className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center mt-16"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono backdrop-blur-md"
        >
          <Terminal className="w-4 h-4" />
          <span>initialize_security()</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4"
        >
          Jivan Suresh <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 text-glow">Zine</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-12 md:h-16 flex items-center justify-center mb-6"
        >
          <h2 className="text-2xl md:text-4xl font-mono text-muted-foreground">
            {">"} <span className="text-foreground">{typedText}</span>
            <span className="animate-pulse text-primary">_</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10"
        >
          Securing applications through offensive testing, defensive analysis, and continuous learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/jivan_zine_scv.pdf"
            download="jivan_zine_scv.pdf"
            className="flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] hover:-translate-y-1"
            data-clickable="true"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
          <a
            href="/jivan_zine_scv.pdf"
            target="_blank"
            rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-card border border-border hover:border-primary/50 text-foreground font-medium transition-all hover:bg-muted hover:-translate-y-1"
            data-clickable="true"> 
          <Eye className="w-5 h-5" />
          View Resume
          </a>
          <a
            href="https://github.com/Jeevanzine17"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-md bg-card border border-border hover:border-primary/50 text-foreground font-medium transition-all hover:bg-muted hover:-translate-y-1"
            data-clickable="true"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jivan-zine-321aa918b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-md bg-card border border-border hover:border-primary/50 text-foreground font-medium transition-all hover:bg-muted hover:-translate-y-1"
            data-clickable="true"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-6 py-3 rounded-md bg-card border border-border hover:border-primary/50 text-foreground font-medium transition-all hover:bg-muted hover:-translate-y-1"
            data-clickable="true"
          >
            <Mail className="w-5 h-5" />
            Contact Me
          </a>
        
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 rounded-md bg-card border border-border hover:border-primary/50 text-foreground font-medium transition-all hover:bg-muted hover:-translate-y-1"
>
           <Rocket className="w-5 h-5" />
           View Projects
          </a>
          
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs uppercase tracking-widest font-mono">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}

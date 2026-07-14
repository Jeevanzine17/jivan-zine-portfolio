import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Server, Award, Github, BookOpen, Clock } from "lucide-react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function: easeOutQuart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOut * end));

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const STATS = [
  { label: "Projects Completed", value: 4, icon: <Code className="w-6 h-6" /> },
  { label: "Security Labs", value: 5, suffix: "+", icon: <Server className="w-6 h-6" /> },
  { label: "Certifications", value: 5, icon: <Award className="w-6 h-6" /> },
  { label: "GitHub Repositories", value: 1, suffix: "+", icon: <Github className="w-6 h-6" /> },
  { label: "Languages Known", value: 4, icon: <BookOpen className="w-6 h-6" /> },
  { label: "Learning Hours", value: 500, suffix: "+", icon: <Clock className="w-6 h-6" /> },
];

export function Achievements() {
  return (
    <section id="stats" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-96 bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="glass-card rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3 relative group"
            >
              <div className="absolute top-0 right-0 p-2 opacity-5">
                {stat.icon}
              </div>
              <div className="text-primary bg-primary/10 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(14,165,233,0.2)] group-hover:shadow-[0_0_25px_rgba(14,165,233,0.4)]">
                {stat.icon}
              </div>
              <h4 className="text-4xl md:text-5xl font-bold font-mono tracking-tighter text-foreground">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </h4>
              <p className="text-sm md:text-base text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { PenTool, Lock, Network, BookOpen, AlertTriangle } from "lucide-react";

const TOPICS = [
  { name: "Bug Bounty", icon: <AlertTriangle className="w-4 h-4" /> },
  { name: "Web Security", icon: <Lock className="w-4 h-4" /> },
  { name: "API Security", icon: <Network className="w-4 h-4" /> },
  { name: "SOC", icon: <Shield className="w-4 h-4" /> },
  { name: "Writeups", icon: <PenTool className="w-4 h-4" /> },
  { name: "Research", icon: <BookOpen className="w-4 h-4" /> },
];

import { Shield } from "lucide-react";

export function Blog() {
  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      {/* Abstract background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(14,165,233,0.05)_0,transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            <span className="text-primary">08.</span> Technical Blog
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 rounded-full" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card rounded-2xl p-10 md:p-16 text-center border-dashed border-2 hover:border-primary/50 transition-colors group relative overflow-hidden"
        >
          {/* Animated background scanline */}
          <div className="absolute inset-0 w-full h-[200%] bg-gradient-to-b from-transparent via-primary/5 to-transparent -translate-y-full group-hover:animate-[scan_3s_linear_infinite]" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-card rounded-full border border-border flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(14,165,233,0.1)] group-hover:scale-110 transition-transform duration-500">
              <PenTool className="w-8 h-8 text-primary" />
            </div>
            
            <h3 className="text-3xl font-bold mb-4">Coming Soon</h3>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              I'm currently documenting my findings, methodologies, and security research. 
              The blog will feature deep-dives into vulnerability assessments, API security testing, and CTF writeups.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {TOPICS.map((topic, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-full text-sm font-medium text-muted-foreground"
                >
                  {topic.icon}
                  {topic.name}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            <span className="text-primary">03.</span> Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden group"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
            
            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              <div className="hidden md:flex flex-col items-center mt-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="w-px h-full bg-gradient-to-b from-primary/30 to-transparent mt-4" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">Software Development Engineer Intern</h3>
                    <h4 className="text-lg text-primary font-medium flex items-center gap-2">
                      Bluestock.in
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground font-mono text-sm mt-2 md:mt-0 bg-muted/50 px-3 py-1 rounded-full border border-border w-fit">
                    <Calendar className="w-4 h-4" />
                    Apr 2025 – May 2025
                  </div>
                </div>

                <ul className="space-y-4 mt-6 text-muted-foreground">
                  {[
                    "Investigated and resolved application and API integration issues through systematic debugging and analysis",
                    "Tested REST APIs using Postman to validate request/response integrity and application functionality",
                    "Analyzed application behavior across multiple environments to identify edge cases and improve reliability",
                    "Assisted in identifying application stability issues through structured testing and documentation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

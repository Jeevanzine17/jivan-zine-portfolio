import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Target } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            <span className="text-primary">01.</span> About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {/* Profile Photo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-sm mx-auto lg:mx-0 cursor-default"
              data-testid="about-headshot-container"
            >
              {/* Glow ring — container only, never touches the image */}
              <div className="absolute -inset-[3px] rounded-[20px] bg-gradient-to-br from-cyan-400/40 via-blue-500/30 to-cyan-400/10 blur-sm pointer-events-none" />
              {/* Border frame */}
              <div
                className="relative rounded-[18px] overflow-hidden border border-cyan-500/30 shadow-xl shadow-black/50"
                style={{ boxShadow: "0 8px 40px -8px rgba(0,212,255,0.18), 0 4px 24px -4px rgba(0,0,0,0.6)" }}
              >
                <img
                  src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/profile.jpeg`}
                  alt="Jivan Suresh Zine"
                  data-testid="about-headshot"
                  draggable={false}
                  className="w-full h-auto block"
                />
              </div>
            </motion.div>

            <div className="glass-card rounded-2xl p-6 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Target className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Career Objective
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Aspiring Cybersecurity Analyst with hands-on experience in SOC operations, web application security, vulnerability assessment, and security testing. Skilled in Python, Linux, networking fundamentals, and API security with a strong interest in threat detection and incident response.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Education & Timeline
            </h3>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/50 before:to-transparent">
              
              {/* Item 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-primary shadow-[0_0_15px_rgba(14,165,233,0.5)] text-primary-foreground md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-5 rounded-xl">
                  <div className="flex flex-col mb-1">
                    <span className="font-mono text-xs text-primary font-medium mb-1">Ongoing</span>
                    <h4 className="font-bold text-lg">Cybersecurity Journey</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Focusing on Application Security, Threat Detection, and continuous learning.</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shrink-0">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-5 rounded-xl hover:border-primary/50 transition-colors">
                  <div className="flex flex-col mb-1">
                    <span className="font-mono text-xs text-muted-foreground font-medium mb-1">Apr 2025 – May 2025</span>
                    <h4 className="font-bold text-lg">Software Engineer Intern</h4>
                  </div>
                  <p className="text-sm text-foreground">Bluestock.in</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-5 rounded-xl hover:border-primary/50 transition-colors">
                  <div className="flex flex-col mb-1">
                    <span className="font-mono text-xs text-muted-foreground font-medium mb-1">2023 – 2025</span>
                    <h4 className="font-bold text-lg">Master of Computer Applications (MCA)</h4>
                  </div>
                  <p className="text-sm text-foreground">Dr. D. Y. Patil Institute of MCA, Akurdi, Pune</p>
                  <p className="text-xs font-mono text-primary mt-2">CGPA: 7.03/10</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-card text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-5 rounded-xl hover:border-primary/50 transition-colors">
                  <div className="flex flex-col mb-1">
                    <span className="font-mono text-xs text-muted-foreground font-medium mb-1">2020 – 2023</span>
                    <h4 className="font-bold text-lg">BSc Computer Science</h4>
                  </div>
                  <p className="text-sm text-foreground">Panchavati College of Management and Computer Science, Nashik</p>
                  <p className="text-xs font-mono text-primary mt-2">CGPA: 7.56/10</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

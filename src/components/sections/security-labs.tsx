import { motion } from "framer-motion";
import { Server, Shield, CheckCircle2, CircleDashed } from "lucide-react";

const LABS = [
  {
    title: "PortSwigger Web Security Academy",
    status: "In Progress",
    progress: 60,
    topics: "Authentication, Access Control, SQL Injection, Server-Side Vulnerabilities",
    icon: <Server className="w-5 h-5" />
  },
  {
    title: "TryHackMe",
    status: "In Progress",
    progress: 70,
    topics: "SOC Level 1, Web Fundamentals, Network Fundamentals",
    icon: <Shield className="w-5 h-5" />
  },
  {
    title: "InfoSecLabs",
    status: "Completed",
    progress: 100,
    topics: "SOC Analyst Level 1",
    icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
  },
  {
    title: "OWASP Juice Shop",
    status: "Completed",
    progress: 100,
    topics: "Hands-on OWASP vulnerability practice",
    icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
  },
  {
    title: "DVWA",
    status: "Completed",
    progress: 100,
    topics: "Damn Vulnerable Web Application",
    icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
  },
  {
    title: "Security Research",
    status: "Ongoing",
    progress: 85,
    topics: "Web App Security Testing, Recon & Asset Enumeration, API Security",
    icon: <CircleDashed className="w-5 h-5 text-primary" />
  }
];

export function SecurityLabs() {
  return (
    <section id="labs" className="py-24 relative bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            <span className="text-primary">06.</span> Security Labs
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {LABS.map((lab, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 flex flex-col relative overflow-hidden group"
            >
              {/* Progress background bar at bottom */}
              <div className="absolute bottom-0 left-0 h-1 bg-muted w-full">
                <motion.div 
                  className={`h-full ${lab.progress === 100 ? 'bg-green-500' : 'bg-primary'}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lab.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>

              <div className="flex justify-between items-start mb-4">
                <div className="p-2 rounded-lg bg-card border border-border group-hover:border-primary/30 transition-colors">
                  {lab.icon}
                </div>
                <span className={`text-xs font-mono px-2 py-1 rounded-md border ${
                  lab.progress === 100 
                    ? 'border-green-500/30 text-green-500 bg-green-500/10' 
                    : 'border-primary/30 text-primary bg-primary/10'
                }`}>
                  {lab.status}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{lab.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">{lab.topics}</p>

              <div className="flex justify-between items-center text-sm font-mono mt-auto">
                <span className="text-foreground">Progress</span>
                <span className={lab.progress === 100 ? 'text-green-500' : 'text-primary'}>{lab.progress}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

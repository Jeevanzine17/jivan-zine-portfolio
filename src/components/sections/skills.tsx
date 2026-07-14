import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, ShieldAlert, Network, Terminal } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    id: "security",
    label: "Security",
    icon: <ShieldAlert className="w-4 h-4" />,
    skills: [
      { name: "OWASP Top 10", level: 90 },
      { name: "Web Application Security", level: 85 },
      { name: "Reconnaissance", level: 85 },
      { name: "API Security", level: 80 },
      { name: "Vulnerability Assessment", level: 80 },
      { name: "Authentication & Authorization", level: 80 },
      { name: "Access Control", level: 75 },
      { name: "SOC Operations", level: 75 },
    ]
  },
  {
    id: "tools",
    label: "Tools & OS",
    icon: <Terminal className="w-4 h-4" />,
    skills: [
      { name: "Burp Suite", level: 85 },
      { name: "Postman", level: 85 },
      { name: "Linux/Ubuntu", level: 85 },
      { name: "Nmap", level: 80 },
      { name: "Nuclei", level: 80 },
      { name: "Subfinder", level: 80 },
      { name: "Git", level: 80 },
      { name: "Kali Linux", level: 80 },
      { name: "Wireshark", level: 75 },
      { name: "HTTPX", level: 75 },
      { name: "Amass", level: 75 },
      { name: "Katana", level: 70 },
    ]
  },
  {
    id: "programming",
    label: "Programming",
    icon: <Code2 className="w-4 h-4" />,
    skills: [
      { name: "Python", level: 85 },
      { name: "Bash", level: 80 },
      { name: "SQL", level: 75 },
      { name: "FastAPI", level: 75 },
      { name: "JavaScript", level: 70 },
      { name: "Flask", level: 70 },
      { name: "PostgreSQL", level: 70 },
    ]
  },
  {
    id: "networking",
    label: "Networking",
    icon: <Network className="w-4 h-4" />,
    skills: [
      { name: "HTTP/HTTPS", level: 85 },
      { name: "TCP/IP", level: 80 },
      { name: "REST APIs", level: 80 },
      { name: "DNS", level: 75 },
    ]
  }
];

export function Skills() {
  const [activeTab, setActiveTab] = useState(SKILL_CATEGORIES[0].id);

  const activeCategory = SKILL_CATEGORIES.find(c => c.id === activeTab);

  return (
    <section id="skills" className="py-24 relative bg-muted/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.03)_0,transparent_100%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            <span className="text-primary">02.</span> Technical Arsenal
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 rounded-full" />
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {SKILL_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === category.id
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_rgba(14,165,233,0.4)]"
                    : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>

          {/* Skill Bars */}
          <div className="glass-card rounded-2xl p-6 md:p-10 min-h-[400px]">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8"
            >
              {activeCategory?.skills.map((skill, index) => (
                <div key={skill.name} className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="font-mono text-xs text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden relative">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/80 to-primary rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/20" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Code2,
} from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 relative bg-muted/20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            <span className="text-primary">09.</span> Establish Connection
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Let's Connect
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                Whether you have an internship opportunity,
                full-time role, freelance project, or simply
                want to connect, I'd love to hear from you.
                I'm actively looking for opportunities in
                Application Security, SOC, and Backend Development.
              </p>
            </div>

            <div className="space-y-6">

              <a
                href="mailto:jeevanzine2052@gmail.com"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all shadow-sm">
                  <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <div>
                  <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                    Email
                  </p>

                  <p className="font-medium group-hover:text-primary transition-colors">
                    jeevanzine2052@gmail.com
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all shadow-sm">
                  <Phone className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <div>
                  <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                    Phone
                  </p>

                  <p className="font-medium group-hover:text-primary transition-colors">
                    +91 8308778734
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-lg bg-card border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all shadow-sm">
                  <MapPin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <div>
                  <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                    Location
                  </p>

                  <p className="font-medium group-hover:text-primary transition-colors">
                    Pune, Maharashtra, India
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border flex flex-wrap gap-4">

              <a
                href="https://github.com/Jeevanzine17"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:text-primary transition-all shadow-sm"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="https://linkedin.com/in/jivan-zine"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:text-primary transition-all shadow-sm"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="https://leetcode.com/jeevanzine_17"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:text-primary transition-all shadow-sm"
              >
                <Code2 className="w-5 h-5" />
              </a>

            </div>
          </motion.div>

          {/* RIGHT SIDE */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-2xl p-8 flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-4">
              Ready to Collaborate?
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-8">
              I'm always interested in discussing cybersecurity,
              backend engineering, bug bounty, application security,
              and exciting opportunities.
              Feel free to reach out anytime.
            </p>

            <div className="space-y-4">

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=jeevanzine2052@gmail.com&su=Hiring%20Opportunity"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground py-3 font-semibold hover:bg-primary/90 transition-all shadow-lg"
>
                <Mail className="w-5 h-5" />
                  Email Me
              </a>

              <a
                href="https://www.linkedin.com/in/jivan-zine-321aa918b/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-border py-3 hover:border-primary hover:text-primary transition-all"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>

              <a
                href="https://github.com/Jeevanzine17"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-border py-3 hover:border-primary hover:text-primary transition-all"
              >
                <Github className="w-5 h-5" />
                View GitHub
              </a>

            </div>

            <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-5">

              <h4 className="font-semibold text-primary mb-3">
                Current Availability
              </h4>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✅ Open to Internships</li>
                <li>✅ Full-time Opportunities</li>
                <li>✅ Freelance Projects</li>
                <li>✅ Remote / Hybrid / On-site</li>
              </ul>

            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
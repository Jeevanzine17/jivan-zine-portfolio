import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Certifications } from "@/components/sections/certifications";
import { SecurityLabs } from "@/components/sections/security-labs";
import { Achievements } from "@/components/sections/achievements";
import { GitHubSection } from "@/components/sections/github";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <SecurityLabs />
        <Achievements />
        <GitHubSection />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

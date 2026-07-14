import { Link } from "wouter";
import { Terminal, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground scanlines relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1)_0,transparent_70%)] pointer-events-none" />
      
      <div className="container px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(220,38,38,0.2)]">
            <Terminal className="w-12 h-12 text-red-500" />
          </div>
          
          <h1 className="text-8xl font-bold font-mono text-foreground mb-4 tracking-tighter drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            404
          </h1>
          
          <div className="bg-card border border-border rounded-lg p-6 w-full text-left mb-8 font-mono text-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
            <p className="text-red-500 mb-2">{"[ERROR] Target endpoint not found"}</p>
            <p className="text-muted-foreground mb-1">{">"} The requested resource could not be located.</p>
            <p className="text-muted-foreground">{">"} Connection terminated.</p>
            <div className="mt-4 flex items-center text-primary">
              <span className="mr-2">root@system:~$</span> <span className="w-2 h-4 bg-primary animate-pulse inline-block" />
            </div>
          </div>
          
          <Link href="/">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(14,165,233,0.3)] hover:-translate-y-1 cursor-pointer">
              <Home className="w-5 h-5" />
              Return to Base
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

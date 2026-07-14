import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download, ZoomIn, ZoomOut, ShieldCheck } from "lucide-react";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const CERTIFICATES = [
  {
    title: "SOC Analyst Level 1",
    issuer: "InfoSecLabs",
    year: "2026",
    image: `${BASE}/certificates/soc-analyst.png`,
    verifyUrl: "https://infoseclabs.com/verify",
    credentialId: "ISL-SOC-2026",
  },
  {
    title: "Ethical Hacker",
    issuer: "Cisco Networking Academy",
    year: "2026",
    image: `${BASE}/certificates/ethical-hacker.png`,
    verifyUrl: "https://www.netacad.com/verify",
    credentialId: "CISCO-EH-2026",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    year: "2026",
    image: `${BASE}/certificates/intro-cybersec.png`,
    verifyUrl: "https://www.netacad.com/verify",
    credentialId: "CISCO-ICS-2026",
  },
  {
    title: "Python for Data Science",
    issuer: "Infosys Springboard",
    year: "2024",
    image: `${BASE}/certificates/python-datascience.png`,
    verifyUrl: "https://infosysspringboard.com/verify",
    credentialId: "ISB-PDS-2024",
  },
  {
    title: "C Programming",
    issuer: "VS Programming Institute",
    year: "2023",
    image: `${BASE}/certificates/c-programming.png`,
    verifyUrl: "#",
    credentialId: "VSPI-CP-2023",
  },
  {
    title: "Web Development",
    issuer: "Certification Authority",
    year: "2023",
    image: `${BASE}/certificates/web-dev.png`,
    verifyUrl: "#",
    credentialId: "WD-2023",
  },
];

type Certificate = typeof CERTIFICATES[0];

/* ─── Marquee track ─────────────────────────────────────────────────────── */
function CertificateCard({
  cert,
  onClick,
}: {
  cert: Certificate;
  onClick: (c: Certificate) => void;
}) {
  return (
    <div
      data-testid={`cert-card-${cert.title}`}
      onClick={() => onClick(cert)}
      className="cert-card flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] cursor-pointer group select-none"
    >
      <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 shadow-lg shadow-black/40 transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-cyan-500/20 group-hover:shadow-xl group-hover:scale-[1.03]">
        <img
          src={cert.image}
          alt={cert.title}
          draggable={false}
          className="w-full h-auto block object-cover"
        />
        {/* hover overlay label */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2 border border-cyan-500/30">
            <p className="text-white text-sm font-semibold leading-tight">{cert.title}</p>
            <p className="text-cyan-400 text-xs">{cert.issuer}</p>
          </div>
        </div>
        {/* glow ring */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5 pointer-events-none" />
      </div>
    </div>
  );
}

/* ─── Marquee strip ─────────────────────────────────────────────────────── */
function Marquee({ onCardClick }: { onCardClick: (c: Certificate) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);

  // Speed: pixels per second
  const SPEED = 40; // px/s  → full strip ~40 s

  const getHalfWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    // half = first set of cards (children / 2)
    const children = Array.from(track.children) as HTMLElement[];
    const half = children.slice(0, children.length / 2);
    return half.reduce((acc, el) => acc + el.offsetWidth + 24, 0); // 24 = gap
  }, []);

  useEffect(() => {
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!pausedRef.current && !draggingRef.current) {
        posRef.current += SPEED * dt;
        const half = getHalfWidth();
        if (half > 0 && posRef.current >= half) {
          posRef.current -= half;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
        }
      } else {
        last = now; // reset so no jump when resuming
      }

      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [getHalfWidth]);

  /* Pointer drag */
  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    dragStartX.current = e.clientX;
    dragStartPos.current = posRef.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const delta = dragStartX.current - e.clientX;
    let next = dragStartPos.current + delta;
    const half = getHalfWidth();
    if (half > 0) {
      next = ((next % half) + half) % half;
    }
    posRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${posRef.current}px)`;
    }
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  /* Click guard: don't open modal if user was dragging */
  const handleCardClick = (cert: Certificate, e: React.MouseEvent) => {
    // If pointer moved more than 5px, treat as drag not click
    const dx = Math.abs(e.clientX - dragStartX.current);
    if (dx > 5) return;
    onCardClick(cert);
  };

  // Duplicate list for seamless loop
  const doubled = [...CERTIFICATES, ...CERTIFICATES];

  return (
    <div
      className="relative overflow-hidden w-full py-4"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {/* left/right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

      <div
        ref={trackRef}
        className="flex gap-6 will-change-transform cursor-grab active:cursor-grabbing"
        style={{ width: "max-content" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {doubled.map((cert, i) => (
          <div key={i} onClick={(e) => handleCardClick(cert, e)}>
            <CertificateCard cert={cert} onClick={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Modal ─────────────────────────────────────────────────────────────── */
function CertModal({
  cert,
  onClose,
}: {
  cert: Certificate;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(1);

  const adjustZoom = (delta: number) => {
    setZoom((z) => Math.min(3, Math.max(1, z + delta)));
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 24 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="relative z-10 w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col bg-[#0d1117] border border-cyan-500/20 shadow-2xl shadow-cyan-900/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="font-mono text-base font-semibold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            {cert.title}
          </h3>
          <div className="flex items-center gap-2">
            <button
              data-testid="cert-modal-zoom-out"
              onClick={() => adjustZoom(-0.5)}
              disabled={zoom <= 1}
              className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors disabled:opacity-30"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-muted-foreground w-10 text-center">{Math.round(zoom * 100)}%</span>
            <button
              data-testid="cert-modal-zoom-in"
              onClick={() => adjustZoom(0.5)}
              disabled={zoom >= 3}
              className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors disabled:opacity-30"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-white/10 mx-1" />
            <button
              data-testid="cert-modal-close"
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image viewer */}
        <div className="overflow-auto max-h-[55vh] bg-black/40 flex items-start justify-center p-4" style={{ cursor: zoom > 1 ? "move" : "default" }}>
          <img
            src={cert.image}
            alt={cert.title}
            style={{ transform: `scale(${zoom})`, transformOrigin: "top center", transition: "transform 0.25s ease" }}
            className="max-w-full rounded-lg shadow-xl"
          />
        </div>

        {/* Meta grid */}
        <div className="px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetaField label="Issuer" value={cert.issuer} />
          <MetaField label="Issue Date" value={cert.year} />
          <MetaField label="Credential ID" value={cert.credentialId} mono />
          <div className="bg-white/3 border border-white/5 rounded-lg p-3 flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-emerald-400 text-xs font-medium">Verified</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-5 flex flex-wrap gap-3">
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="cert-modal-verify"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Verify Certificate
          </a>
          <a
            href={cert.image}
            download={`${cert.title.replace(/\s+/g, "-")}.png`}
            data-testid="cert-modal-download"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-muted-foreground text-sm font-medium hover:bg-white/10 hover:text-white transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      </motion.div>
    </div>
  );
}

function MetaField({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="bg-white/3 border border-white/5 rounded-lg p-3">
      <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-sm text-white truncate ${mono ? "font-mono" : "font-medium"}`}>{value}</p>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export function Certifications() {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <section id="certifications" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-mono">
            <span className="text-primary">05.</span> Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary/10 via-primary to-primary/10 rounded-full mb-4" />
          <p className="text-muted-foreground text-sm font-mono">
            Hover to pause &middot; Click to inspect &middot; Drag to browse
          </p>
        </motion.div>
      </div>

      {/* Full-bleed marquee (outside container for edge-to-edge) */}
      <Marquee onCardClick={setSelected} />

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <CertModal cert={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

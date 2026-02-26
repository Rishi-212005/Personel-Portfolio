import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiMail, FiGithub, FiLinkedin, FiChevronDown } from "react-icons/fi";
import { lazy, Suspense } from "react";
import { useEditMode } from "@/context/EditModeContext";
import EditableText from "./EditableText";

const Hero3DScene = lazy(() => import("@/components/Hero3DScene"));

const defaultTitles = ["Full Stack Developer", "Software Engineer", "Cybersecurity Enthusiast"];
const defaultHero = {
  name: "Sai Rishi Kumar",
  surname: "Vedi",
  initials: "SRK",
  tagline: "Available for opportunities",
  description: "Crafting secure, scalable web applications with a passion for cybersecurity and clean architecture",
  email: "Sairishikumar.2005@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
};

const HeroSection = () => {
  const { editMode, getData, setData } = useEditMode();
  const [hero, setHero] = useState(() => getData("hero", defaultHero));
  const [typingTitles, setTypingTitles] = useState(() => getData("hero_titles", defaultTitles));

  const [titleIndex, setTitleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => { if (editMode) return; const t = setTimeout(() => setShowContent(true), 300); return () => clearTimeout(t); }, [editMode]);
  useEffect(() => { setShowContent(true); }, []);

  useEffect(() => {
    if (editMode) return;
    const current = typingTitles[titleIndex];
    if (!current) return;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) { setIsDeleting(false); setTitleIndex((prev) => (prev + 1) % typingTitles.length); }
      }
    }, isDeleting ? 35 : 70);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, titleIndex, editMode, typingTitles]);

  const updateHero = (key: string, val: string) => {
    const updated = { ...hero, [key]: val };
    setHero(updated);
    setData("hero", updated);
  };

  const updateTitles = (val: string) => {
    const arr = val.split("\n").filter(Boolean);
    setTypingTitles(arr);
    setData("hero_titles", arr);
  };

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } } };
  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 animated-bg" />
      <Suspense fallback={null}><Hero3DScene /></Suspense>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <motion.div animate={{ x: [0, 50, -20, 30, 0], y: [0, -30, 20, -10, 0], scale: [1, 1.2, 0.9, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[10%] w-80 h-80 rounded-full blur-[100px]"
          style={{ background: "hsl(175 80% 45% / 0.07)" }} />
        <motion.div animate={{ x: [0, -40, 30, -20, 0], y: [0, 20, -40, 30, 0], scale: [1, 0.9, 1.15, 1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full blur-[120px]"
          style={{ background: "hsl(260 60% 55% / 0.07)" }} />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background)/0.4)_70%,hsl(var(--background)/0.8)_100%)]" style={{ zIndex: 2 }} />

      <AnimatePresence>
        {showContent && (
          <motion.div variants={containerVariants} initial="hidden" animate="visible"
            className="relative max-w-5xl mx-auto px-4 text-center pt-20" style={{ zIndex: 10 }}>
            
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium tracking-wider uppercase text-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <EditableText value={hero.tagline} onChange={(v) => updateHero("tagline", v)} className="text-primary" />
              </span>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-10 relative inline-block">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, hsl(175 80% 45% / 0.5), hsl(260 60% 60% / 0.5), hsl(200 70% 50% / 0.5), hsl(175 80% 45% / 0.5))",
                  mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))",
                  WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))",
                }} />
              <div className="w-28 h-28 rounded-full flex items-center justify-center relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, hsl(175 80% 45%), hsl(260 60% 60%))" }}>
                <span className="text-3xl font-bold text-white heading-display drop-shadow-lg">{hero.initials}</span>
              </div>
              <motion.div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center border-2 border-background"
                style={{ background: "linear-gradient(135deg, hsl(175 80% 45%), hsl(200 70% 50%))" }}
                animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                <span className="text-[10px] text-white font-bold">✓</span>
              </motion.div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="heading-display text-5xl sm:text-6xl md:text-8xl mb-3 leading-[1.1]">
              {editMode ? (
                <div className="space-y-2 max-w-md mx-auto">
                  <EditableText value={hero.name} onChange={(v) => updateHero("name", v)} className="text-3xl heading-display" />
                  <EditableText value={hero.surname} onChange={(v) => updateHero("surname", v)} className="text-3xl heading-display" />
                  <EditableText value={hero.initials} onChange={(v) => updateHero("initials", v)} className="text-xl heading-display" />
                </div>
              ) : (
                <>
                  <span className="text-gradient-subtle">{hero.name}</span><br />
                  <span className="glow-text relative inline-block">
                    {hero.surname}
                    <motion.span className="absolute -bottom-2 left-0 h-[3px] rounded-full gradient-bg-solid"
                      initial={{ width: 0 }} animate={{ width: "100%" }}
                      transition={{ delay: 1.8, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }} />
                  </span>
                </>
              )}
            </motion.h1>

            <motion.div variants={itemVariants} className="h-auto mb-6 flex items-center justify-center">
              {editMode ? (
                <div className="w-full max-w-md">
                  <label className="text-xs text-muted-foreground mb-1 block">Typing titles (one per line)</label>
                  <textarea
                    value={typingTitles.join("\n")}
                    onChange={(e) => updateTitles(e.target.value)}
                    rows={3}
                    className="w-full bg-primary/10 border border-primary/30 rounded px-3 py-2 text-sm outline-none focus:border-primary font-mono-code resize-none"
                  />
                </div>
              ) : (
                <span className="font-mono-code text-lg md:text-xl text-primary">
                  {"<"}<span className="text-accent">Developer</span>{" /> "}{text}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="text-primary">█</motion.span>
                </span>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="max-w-xl mx-auto mb-10">
              <EditableText value={hero.description} onChange={(v) => updateHero("description", v)}
                as="p" className="text-muted-foreground text-base md:text-lg leading-relaxed" multiline />
            </motion.div>

            {editMode ? (
              <motion.div variants={itemVariants} className="max-w-md mx-auto space-y-2 mb-12">
                <label className="text-xs text-muted-foreground">Social Links</label>
                <EditableText value={hero.email} onChange={(v) => updateHero("email", v)} className="text-sm" />
                <EditableText value={hero.github} onChange={(v) => updateHero("github", v)} className="text-sm" />
                <EditableText value={hero.linkedin} onChange={(v) => updateHero("linkedin", v)} className="text-sm" />
              </motion.div>
            ) : (
              <>
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
                  <motion.a href="#contact" whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                    className="btn-primary-glow px-8 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 text-sm font-semibold">
                    <FiMail size={16} /> Get In Touch
                  </motion.a>
                  <motion.a href="/Vedi_Sai_Rishi_Kumar.pdf" download whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                    className="btn-outline-glow px-8 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 text-sm font-semibold">
                    <FiDownload size={16} /> Download CV
                  </motion.a>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-center gap-3">
                  {[
                    { icon: <FiGithub size={18} />, href: hero.github, label: "GitHub" },
                    { icon: <FiLinkedin size={18} />, href: hero.linkedin, label: "LinkedIn" },
                    { icon: <FiMail size={18} />, href: `mailto:${hero.email}`, label: "Email" },
                  ].map((s, i) => (
                    <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -4 }} whileTap={{ scale: 0.9 }}
                      className="w-11 h-11 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                      aria-label={s.label}>{s.icon}</motion.a>
                  ))}
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2" style={{ zIndex: 10 }}>
        <motion.a href="#about" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-muted-foreground/50 hover:text-primary/70 transition-colors">
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Scroll</span>
          <FiChevronDown size={16} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;

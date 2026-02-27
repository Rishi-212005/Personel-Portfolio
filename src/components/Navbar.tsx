import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, href: string, closeMobile?: boolean) => {
    const targetId = href.replace("#", "");
    const el = document.getElementById(targetId);
    if (!el) return;

    event.preventDefault();

    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({ top: offsetPosition, behavior: "smooth" });

    if (closeMobile) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);

      const sections = navLinks.map(l => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-[60]">
        <motion.div className="h-full gradient-bg-solid" style={{ width: `${scrollProgress}%` }} />
      </div>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass shadow-lg shadow-background/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <a href="#" className="heading-display text-lg glow-text">
            SRK<span className="text-primary">.</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.label}
              </a>
            ))}
            <div className="w-px h-5 bg-border mx-2" />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-1">
            <button onClick={toggleTheme} className="p-2 rounded-lg text-muted-foreground" aria-label="Toggle theme">
              {theme === "dark" ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-muted-foreground" aria-label="Menu">
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-border/50 overflow-hidden"
            >
              <div className="flex flex-col px-4 py-3 gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href, true)}
                    className="text-sm font-medium text-muted-foreground hover:text-primary py-2.5 px-3 rounded-lg hover:bg-secondary/50 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;

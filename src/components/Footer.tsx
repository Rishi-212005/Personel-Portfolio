import { FiHeart, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => (
  <footer className="border-t border-border/50 py-10 px-4">
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="heading-display text-lg glow-text mb-1">SRK.</h3>
          <p className="text-xs text-muted-foreground">Building the future, one line at a time.</p>
        </div>
        
        <div className="flex gap-3">
          {[
            { icon: <FiGithub size={16} />, href: "https://github.com" },
            { icon: <FiLinkedin size={16} />, href: "https://linkedin.com" },
            { icon: <FiMail size={16} />, href: "mailto:Sairishikumar.2005@gmail.com" },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg glass flex items-center justify-center text-muted-foreground hover:text-primary transition-all hover:scale-110">
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="section-divider my-6" />
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <p>© 2025 Sai Rishi Kumar Vedi. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Crafted with <FiHeart className="text-primary" size={12} /> using React & Tailwind
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

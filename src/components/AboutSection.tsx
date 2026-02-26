import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { StaggerContainer, StaggerItem } from "./AnimationEffects";
import { FiCode, FiShield, FiServer, FiCpu, FiPlus, FiTrash2 } from "react-icons/fi";
import { useEditMode } from "@/context/EditModeContext";
import EditableText from "./EditableText";

const defaultAbout = {
  bio: "I am a passionate Full Stack Web Developer and Software Engineer Intern with experience building secure, database-driven web applications using React, Node.js, PHP, and MySQL. I worked at the National Informatics Centre contributing to e-Governance systems, implementing authentication and role-based access control. I am deeply interested in cybersecurity and secure system design.",
};

const defaultHighlights = [
  { id: "1", icon: "code", title: "Full Stack Dev", desc: "React, Node.js, PHP, MySQL", stat: "10+", statLabel: "Projects" },
  { id: "2", icon: "shield", title: "Cybersecurity", desc: "Auth, RBAC, Secure Design", stat: "3+", statLabel: "Certifications" },
  { id: "3", icon: "server", title: "e-Governance", desc: "NIC Intern, Govt. Systems", stat: "1", statLabel: "Internship" },
  { id: "4", icon: "cpu", title: "Problem Solver", desc: "Top 4% JEE Mains 2024", stat: "4%", statLabel: "Percentile" },
];

const iconComponents: Record<string, React.ReactNode> = {
  code: <FiCode size={24} />, shield: <FiShield size={24} />, server: <FiServer size={24} />, cpu: <FiCpu size={24} />,
};

const AboutSection = () => {
  const { editMode, getData, setData } = useEditMode();
  const [about, setAbout] = useState(() => getData("about", defaultAbout));
  const [highlights, setHighlights] = useState(() => getData("highlights", defaultHighlights));

  const updateAbout = (key: string, val: string) => {
    const updated = { ...about, [key]: val };
    setAbout(updated);
    setData("about", updated);
  };

  const updateHighlight = (id: string, key: string, val: string) => {
    const updated = highlights.map((h) => (h.id === id ? { ...h, [key]: val } : h));
    setHighlights(updated);
    setData("highlights", updated);
  };

  const addHighlight = () => {
    const updated = [...highlights, { id: Date.now().toString(), icon: "code", title: "New Skill", desc: "Description", stat: "0", statLabel: "Label" }];
    setHighlights(updated);
    setData("highlights", updated);
  };

  const removeHighlight = (id: string) => {
    const updated = highlights.filter((h) => h.id !== id);
    setHighlights(updated);
    setData("highlights", updated);
  };

  return (
    <section id="about" className="section-padding-sm relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading title="About Me" subtitle="Passionate developer building secure systems" />

        <ScrollReveal>
          <div className="glass-card p-8 md:p-10 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px]" style={{ background: "hsl(175 80% 45% / 0.06)" }} />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-[40px]" style={{ background: "hsl(260 60% 55% / 0.06)" }} />
            <div className="flex items-start gap-3 mb-4">
              <div className="w-1 h-16 rounded-full gradient-bg-solid flex-shrink-0 mt-1" />
              <EditableText value={about.bio} onChange={(v) => updateAbout("bio", v)}
                as="p" className="text-muted-foreground leading-[1.8] text-lg md:text-xl relative z-10" multiline />
            </div>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h) => (
            <StaggerItem key={h.id}>
              <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="glass-card p-5 text-center group cursor-default h-full relative">
                {editMode && (
                  <button onClick={() => removeHighlight(h.id)}
                    className="absolute top-2 right-2 p-1 rounded bg-destructive/10 hover:bg-destructive/20 text-destructive z-10">
                    <FiTrash2 size={12} />
                  </button>
                )}
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl gradient-bg flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  {iconComponents[h.icon] || <FiCode size={24} />}
                </div>
                <EditableText value={h.title} onChange={(v) => updateHighlight(h.id, "title", v)} as="h3" className="font-semibold text-base mb-0.5" />
                <EditableText value={h.desc} onChange={(v) => updateHighlight(h.id, "desc", v)} as="p" className="text-sm text-muted-foreground mb-3" />
                <div className="pt-3 border-t border-border/50">
                  <EditableText value={h.stat} onChange={(v) => updateHighlight(h.id, "stat", v)} className="text-xl font-bold glow-text" />
                  <EditableText value={h.statLabel} onChange={(v) => updateHighlight(h.id, "statLabel", v)} as="p" className="text-[10px] text-muted-foreground uppercase tracking-wider" />
                </div>
              </motion.div>
            </StaggerItem>
          ))}
          {editMode && (
            <motion.button onClick={addHighlight} whileHover={{ scale: 1.05 }}
              className="glass-card p-5 flex items-center justify-center gap-2 text-primary border-dashed border-2 border-primary/30 min-h-[180px]">
              <FiPlus size={20} /> Add Card
            </motion.button>
          )}
        </StaggerContainer>
      </div>
      <div className="section-divider mt-14" />
    </section>
  );
};

export default AboutSection;

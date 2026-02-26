import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { StaggerContainer, StaggerItem } from "./AnimationEffects";
import { AdminActions, AdminAddButton, AdminModal } from "./AdminControls";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import {
  SiJavascript, SiPhp, SiTypescript, SiPython, SiReact, SiNodedotjs,
  SiMysql, SiMongodb, SiGit, SiLinux, SiExpress, SiTailwindcss, SiHtml5, SiCss3,
  SiDocker, SiAmazon, SiFirebase, SiGraphql, SiRedis, SiPostgresql,
  SiAngular, SiVuedotjs, SiDjango, SiFlask, SiRust, SiGo, SiKubernetes, SiNextdotjs
} from "react-icons/si";
import { IconType } from "react-icons";

const iconMap: Record<string, IconType> = {
  JavaScript: SiJavascript, TypeScript: SiTypescript, PHP: SiPhp, Python: SiPython,
  React: SiReact, "Node.js": SiNodedotjs, Express: SiExpress, HTML5: SiHtml5,
  CSS3: SiCss3, Tailwind: SiTailwindcss, MySQL: SiMysql, MongoDB: SiMongodb,
  Git: SiGit, Linux: SiLinux, Docker: SiDocker, AWS: SiAmazon,
  Firebase: SiFirebase, GraphQL: SiGraphql, Redis: SiRedis, PostgreSQL: SiPostgresql,
  Angular: SiAngular, "Vue.js": SiVuedotjs, Django: SiDjango, Flask: SiFlask,
  Rust: SiRust, Go: SiGo, Kubernetes: SiKubernetes, "Next.js": SiNextdotjs,
};

const defaultTechStack = [
  { id: "1", name: "JavaScript" }, { id: "2", name: "TypeScript" }, { id: "3", name: "PHP" },
  { id: "4", name: "Python" }, { id: "5", name: "React" }, { id: "6", name: "Node.js" },
  { id: "7", name: "Express" }, { id: "8", name: "HTML5" }, { id: "9", name: "CSS3" },
  { id: "10", name: "Tailwind" }, { id: "11", name: "MySQL" }, { id: "12", name: "MongoDB" },
  { id: "13", name: "Git" }, { id: "14", name: "Linux" },
];

const defaultSkillBars = [
  { id: "1", name: "Frontend Development", level: 90 },
  { id: "2", name: "Backend Development", level: 82 },
  { id: "3", name: "Database Design", level: 85 },
  { id: "4", name: "Auth & Security", level: 80 },
  { id: "5", name: "API Development", level: 85 },
  { id: "6", name: "DevOps & Tools", level: 72 },
];

const loadState = <T,>(key: string, fallback: T): T => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch { return fallback; }
};

const techFields = [{ name: "name", label: "Technology Name", placeholder: "e.g. Docker, AWS, Next.js" }];
const skillFields = [
  { name: "name", label: "Skill Name", placeholder: "e.g. Frontend Development" },
  { name: "level", label: "Proficiency (%)", placeholder: "e.g. 85" },
];

const SkillsSection = () => {
  const { isAdmin } = useAuth();
  const [techStack, setTechStack] = useState(() => loadState("portfolio_tech", defaultTechStack));
  const [skillBars, setSkillBars] = useState(() => loadState("portfolio_skills", defaultSkillBars));

  const [techModal, setTechModal] = useState<{ open: boolean; editing?: any }>({ open: false });
  const [skillModal, setSkillModal] = useState<{ open: boolean; editing?: any }>({ open: false });

  const saveTech = (items: typeof techStack) => { setTechStack(items); localStorage.setItem("portfolio_tech", JSON.stringify(items)); };
  const saveSkills = (items: typeof skillBars) => { setSkillBars(items); localStorage.setItem("portfolio_skills", JSON.stringify(items)); };

  const handleTechSubmit = (values: Record<string, any>) => {
    if (techModal.editing) {
      saveTech(techStack.map(t => t.id === techModal.editing.id ? { ...t, name: values.name } : t));
    } else {
      saveTech([...techStack, { id: Date.now().toString(), name: values.name }]);
    }
  };

  const handleSkillSubmit = (values: Record<string, any>) => {
    const level = Math.min(100, Math.max(0, parseInt(values.level) || 0));
    if (skillModal.editing) {
      saveSkills(skillBars.map(s => s.id === skillModal.editing.id ? { ...s, name: values.name, level } : s));
    } else {
      saveSkills([...skillBars, { id: Date.now().toString(), name: values.name, level }]);
    }
  };

  const deleteTech = (id: string) => { saveTech(techStack.filter(t => t.id !== id)); toast.success("Removed!"); };
  const deleteSkill = (id: string) => { saveSkills(skillBars.filter(s => s.id !== id)); toast.success("Removed!"); };

  return (
    <section id="skills" className="section-padding-sm relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading title="Skills & Technologies" subtitle="My technical toolkit" />

        {/* Tech grid */}
        <ScrollReveal className="mb-14">
          <div className="glass-card p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Tech Stack</h3>
              <AdminAddButton onClick={() => setTechModal({ open: true })} label="Add Tech" />
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3">
              {techStack.map((tech) => {
                const Icon = iconMap[tech.name];
                return (
                  <motion.div
                    key={tech.id}
                    whileHover={{ y: -4, scale: 1.08 }}
                    className="relative flex flex-col items-center gap-1.5 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-default group"
                  >
                    {isAdmin && (
                      <AdminActions
                        onEdit={() => setTechModal({ open: true, editing: tech })}
                        onDelete={() => deleteTech(tech.id)}
                      />
                    )}
                    <span className="text-2xl text-muted-foreground group-hover:text-primary transition-colors">
                      {Icon ? <Icon /> : <span className="text-base font-bold">{tech.name[0]}</span>}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">{tech.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Skill bars */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">Core Skills</h3>
          <AdminAddButton onClick={() => setSkillModal({ open: true })} label="Add Skill" />
        </div>
        <StaggerContainer className="grid md:grid-cols-2 gap-x-8 gap-y-5">
          {skillBars.map((skill, i) => (
            <StaggerItem key={skill.id}>
              <div className="group relative">
                {isAdmin && (
                  <AdminActions
                    onEdit={() => setSkillModal({ open: true, editing: skill })}
                    onDelete={() => deleteSkill(skill.id)}
                  />
                )}
                <div className="flex justify-between mb-2">
                  <span className="text-lg font-medium">{skill.name}</span>
                  <motion.span
                    className="text-sm text-muted-foreground font-mono-code"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="skill-bar h-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
      <div className="section-divider mt-14" />

      <AdminModal open={techModal.open} onClose={() => setTechModal({ open: false })} title={techModal.editing ? "Edit Tech" : "Add Tech"}
        fields={techFields} initialValues={techModal.editing || {}} onSubmit={handleTechSubmit} />
      <AdminModal open={skillModal.open} onClose={() => setSkillModal({ open: false })} title={skillModal.editing ? "Edit Skill" : "Add Skill"}
        fields={skillFields} initialValues={skillModal.editing ? { ...skillModal.editing, level: String(skillModal.editing.level) } : {}} onSubmit={handleSkillSubmit} />
    </section>
  );
};

export default SkillsSection;

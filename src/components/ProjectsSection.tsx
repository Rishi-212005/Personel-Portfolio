import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { FiExternalLink, FiGithub, FiPlus, FiTrash2 } from "react-icons/fi";
import { projects as defaultProjects } from "@/data/portfolio";
import { useEditMode } from "@/context/EditModeContext";
import EditableText from "./EditableText";

const ProjectsSection = () => {
  const { editMode, getData, setData } = useEditMode();
  const [projects, setProjects] = useState(() => getData("projects", defaultProjects));
  const [filter, setFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const updateProject = (id: string, key: string, val: any) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, [key]: val } : p));
    setProjects(updated);
    setData("projects", updated);
  };

  const addProject = () => {
    const updated = [...projects, { id: Date.now().toString(), title: "New Project", description: "Description here", category: "Web App", tech: ["React"], github_url: "", demo_url: "" }];
    setProjects(updated);
    setData("projects", updated);
  };

  const removeProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    setData("projects", updated);
  };

  return (
    <section id="projects" className="section-padding-sm relative">
      <div className="absolute inset-0 animated-bg opacity-30" />
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeading title="Projects" subtitle="Things I've built" />
        {editMode && (
          <div className="flex justify-center mb-4">
            <button onClick={addProject} className="btn-outline-glow px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
              <FiPlus size={14} /> Add Project
            </button>
          </div>
        )}

        <ScrollReveal className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <motion.button key={cat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === cat ? "btn-primary-glow" : "glass text-muted-foreground hover:text-foreground"
              }`}>
              {cat}
            </motion.button>
          ))}
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div key={project.id} layout
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                onHoverStart={() => setHoveredId(project.id)} onHoverEnd={() => setHoveredId(null)}>
                <motion.div whileHover={{ y: -8 }} className="glass-card p-6 h-full flex flex-col group relative overflow-hidden">
                  {editMode && (
                    <button onClick={() => removeProject(project.id)}
                      className="absolute top-2 right-2 p-1 rounded bg-destructive/10 hover:bg-destructive/20 text-destructive z-20">
                      <FiTrash2 size={12} />
                    </button>
                  )}
                  <AnimatePresence>
                    {hoveredId === project.id && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
                    )}
                  </AnimatePresence>
                  <div className="flex-1 relative z-10">
                    <EditableText value={project.category} onChange={(v) => updateProject(project.id, "category", v)}
                      className="inline-block text-xs font-medium text-primary mb-2 px-2 py-0.5 rounded-full bg-primary/10" />
                    <EditableText value={project.title} onChange={(v) => updateProject(project.id, "title", v)}
                      as="h3" className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors" />
                    <EditableText value={project.description} onChange={(v) => updateProject(project.id, "description", v)}
                      as="p" className="text-base text-muted-foreground mb-4 leading-relaxed" multiline />
                  </div>
                  <div className="relative z-10">
                    {editMode ? (
                      <input type="text" value={project.tech.join(", ")}
                        onChange={(e) => updateProject(project.id, "tech", e.target.value.split(",").map((t) => t.trim()))}
                        className="w-full bg-primary/10 border border-primary/30 rounded px-2 py-1 text-sm mb-4"
                        placeholder="Comma-separated tech" />
                    ) : (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2.5 py-1 text-sm rounded-md bg-secondary text-secondary-foreground font-mono">{t}</span>
                        ))}
                      </div>
                    )}
                    {editMode ? (
                      <div className="space-y-1">
                        <div>
                          <label className="text-xs text-muted-foreground">GitHub URL:</label>
                          <EditableText value={project.github_url} onChange={(v) => updateProject(project.id, "github_url", v)} className="text-xs" />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">Live Demo URL:</label>
                          <EditableText value={project.demo_url} onChange={(v) => updateProject(project.id, "demo_url", v)} className="text-xs" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-4">
                        {project.github_url && (
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                            <FiGithub size={14} /> Code
                          </a>
                        )}
                        {project.demo_url && (
                          <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                            <FiExternalLink size={14} /> Demo
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

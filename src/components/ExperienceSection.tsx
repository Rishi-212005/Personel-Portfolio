import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { StaggerContainer, StaggerItem } from "./AnimationEffects";
import { FiBriefcase, FiBookOpen, FiPlus, FiTrash2, FiExternalLink } from "react-icons/fi";
import { experiences as defaultExperiences, education as defaultEducation } from "@/data/portfolio";
import { useEditMode } from "@/context/EditModeContext";
import EditableText from "./EditableText";

const ExperienceSection = () => {
  const { editMode, getData, setData } = useEditMode();
  const [experiences, setExperiences] = useState(() => getData("experiences", defaultExperiences));
  const [education, setEducation] = useState(() => getData("education", defaultEducation));

  const updateExp = (id: string, key: string, val: any) => {
    const updated = experiences.map((e) => (e.id === id ? { ...e, [key]: val } : e));
    setExperiences(updated);
    setData("experiences", updated);
  };

  const addExp = () => {
    const updated = [...experiences, { id: Date.now().toString(), title: "New Role", organization: "Company", period: "2024", location: "Location", points: ["Describe your work"], type: "work" }];
    setExperiences(updated);
    setData("experiences", updated);
  };

  const removeExp = (id: string) => {
    const updated = experiences.filter((e) => e.id !== id);
    setExperiences(updated);
    setData("experiences", updated);
  };

  const updateEdu = (id: string, key: string, val: string) => {
    const updated = education.map((e) => (e.id === id ? { ...e, [key]: val } : e));
    setEducation(updated);
    setData("education", updated);
  };

  const addEdu = () => {
    const updated = [...education, { id: Date.now().toString(), title: "Degree", organization: "Institution", period: "2024", detail: "Details" }];
    setEducation(updated);
    setData("education", updated);
  };

  const removeEdu = (id: string) => {
    const updated = education.filter((e) => e.id !== id);
    setEducation(updated);
    setData("education", updated);
  };

  return (
    <section id="experience" className="section-padding-sm relative">
      <div className="absolute inset-0 animated-bg opacity-30" />
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeading title="Experience & Education" />

        <div className="mb-6 flex items-center justify-between">
          <h3 className="heading-display text-xl flex items-center gap-2">
            <FiBriefcase className="text-primary" /> Work Experience
          </h3>
          {editMode && (
            <button onClick={addExp} className="btn-outline-glow px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
              <FiPlus size={14} /> Add
            </button>
          )}
        </div>

        <div className="relative mb-12">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 timeline-line opacity-30" />
          <StaggerContainer>
            {experiences.map((item) => (
              <StaggerItem key={item.id} className="relative pl-12 md:pl-20 mb-6">
                <motion.div whileHover={{ scale: 1.02 }}
                  className="absolute left-2 md:left-6 top-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                </motion.div>
                <div className="glass-card p-6 relative">
                  {editMode && (
                    <button onClick={() => removeExp(item.id)}
                      className="absolute top-2 right-2 p-1 rounded bg-destructive/10 hover:bg-destructive/20 text-destructive">
                      <FiTrash2 size={12} />
                    </button>
                  )}
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <EditableText value={item.period} onChange={(v) => updateExp(item.id, "period", v)} className="text-xs font-mono text-primary" />
                    {item.location && <EditableText value={item.location} onChange={(v) => updateExp(item.id, "location", v)} className="text-xs text-muted-foreground" />}
                  </div>
                  <EditableText value={item.title} onChange={(v) => updateExp(item.id, "title", v)} as="h4" className="font-semibold text-xl" />
                  <EditableText value={item.organization} onChange={(v) => updateExp(item.id, "organization", v)} as="p" className="text-base text-primary mb-3" />
                  {editMode ? (
                    <textarea
                      value={item.points.join("\n")}
                      onChange={(e) => updateExp(item.id, "points", e.target.value.split("\n"))}
                      rows={4}
                      className="w-full bg-primary/10 border border-primary/30 rounded px-2 py-1 text-sm outline-none resize-y"
                      placeholder="One point per line"
                    />
                  ) : (
                    <ul className="space-y-1.5">
                      {item.points.map((p, j) => (
                        <li key={j} className="text-base text-muted-foreground flex gap-2">
                          <span className="text-primary mt-1">▸</span> {p}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <h3 className="heading-display text-xl flex items-center gap-2">
            <FiBookOpen className="text-accent" /> Education
          </h3>
          {editMode && (
            <button onClick={addEdu} className="btn-outline-glow px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
              <FiPlus size={14} /> Add
            </button>
          )}
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-accent/30" />
          <StaggerContainer>
            {education.map((item) => (
              <StaggerItem key={item.id} className="relative pl-12 md:pl-20 mb-5">
                <div className="absolute left-2 md:left-6 top-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-accent-foreground" />
                </div>
                <div className="glass-card p-5 relative">
                  {editMode && (
                    <button onClick={() => removeEdu(item.id)}
                      className="absolute top-2 right-2 p-1 rounded bg-destructive/10 hover:bg-destructive/20 text-destructive">
                      <FiTrash2 size={12} />
                    </button>
                  )}
                  <EditableText value={item.period} onChange={(v) => updateEdu(item.id, "period", v)} className="text-xs font-mono text-muted-foreground" />
                  <EditableText value={item.title} onChange={(v) => updateEdu(item.id, "title", v)} as="h4" className="font-semibold text-lg" />
                  <EditableText value={item.organization} onChange={(v) => updateEdu(item.id, "organization", v)} as="p" className="text-base text-primary" />
                  {item.detail && <EditableText value={item.detail} onChange={(v) => updateEdu(item.id, "detail", v)} as="p" className="text-sm text-muted-foreground mt-1" />}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

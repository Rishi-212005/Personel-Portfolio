import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { StaggerContainer, StaggerItem } from "./AnimationEffects";
import { FiAward, FiStar, FiShield, FiTrendingUp, FiPlus, FiTrash2 } from "react-icons/fi";
import { achievements as defaultAchievements } from "@/data/portfolio";
import { useEditMode } from "@/context/EditModeContext";
import EditableText from "./EditableText";

const iconMap: Record<string, React.ReactNode> = {
  "trending-up": <FiTrendingUp size={24} />, "award": <FiAward size={24} />,
  "shield": <FiShield size={24} />, "star": <FiStar size={24} />,
};

const AchievementsSection = () => {
  const { editMode, getData, setData } = useEditMode();
  const [achievements, setAchievements] = useState(() => getData("achievements", defaultAchievements));

  const updateAchievement = (id: string, key: string, val: string) => {
    const updated = achievements.map((a) => (a.id === id ? { ...a, [key]: val } : a));
    setAchievements(updated);
    setData("achievements", updated);
  };

  const addAchievement = () => {
    const updated = [...achievements, { id: Date.now().toString(), title: "New Achievement", description: "Description", icon: "star" }];
    setAchievements(updated);
    setData("achievements", updated);
  };

  const removeAchievement = (id: string) => {
    const updated = achievements.filter((a) => a.id !== id);
    setAchievements(updated);
    setData("achievements", updated);
  };

  return (
    <section className="section-padding-sm relative">
      <div className="absolute inset-0 animated-bg opacity-20" />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading title="Achievements" subtitle="Milestones along the way" />
        {editMode && (
          <div className="flex justify-center mb-4">
            <button onClick={addAchievement} className="btn-outline-glow px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
              <FiPlus size={14} /> Add
            </button>
          </div>
        )}

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements.map((a) => (
            <StaggerItem key={a.id}>
              <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}
                className="glass-card p-6 text-center group cursor-default relative">
                {editMode && (
                  <button onClick={() => removeAchievement(a.id)}
                    className="absolute top-2 right-2 p-1 rounded bg-destructive/10 hover:bg-destructive/20 text-destructive z-10">
                    <FiTrash2 size={12} />
                  </button>
                )}
                <motion.div whileHover={{ rotate: 15, scale: 1.1 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl gradient-bg flex items-center justify-center text-primary">
                  {iconMap[a.icon] || <FiAward size={24} />}
                </motion.div>
                <EditableText value={a.title} onChange={(v) => updateAchievement(a.id, "title", v)}
                  as="h3" className="font-semibold text-base mb-1" />
                <EditableText value={a.description} onChange={(v) => updateAchievement(a.id, "description", v)}
                  as="p" className="text-base text-muted-foreground" />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default AchievementsSection;

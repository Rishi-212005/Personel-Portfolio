import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { StaggerContainer, StaggerItem } from "./AnimationEffects";
import { FiAward, FiExternalLink, FiPlus, FiTrash2 } from "react-icons/fi";
import { certifications as defaultCerts } from "@/data/portfolio";
import { useEditMode } from "@/context/EditModeContext";
import EditableText from "./EditableText";

const CertificationsSection = () => {
  const { editMode, getData, setData } = useEditMode();
  const [certs, setCerts] = useState(() => getData("certifications", defaultCerts));

  const updateCert = (id: string, key: string, val: string) => {
    const updated = certs.map((c) => (c.id === id ? { ...c, [key]: val } : c));
    setCerts(updated);
    setData("certifications", updated);
  };

  const addCert = () => {
    const updated = [...certs, { id: Date.now().toString(), title: "New Certification", issuer: "Issuer", date: "2024", credentialUrl: "" }];
    setCerts(updated);
    setData("certifications", updated);
  };

  const removeCert = (id: string) => {
    const updated = certs.filter((c) => c.id !== id);
    setCerts(updated);
    setData("certifications", updated);
  };

  return (
    <section id="certifications" className="section-padding-sm relative">
      <div className="absolute inset-0 animated-bg opacity-20" />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading title="Certifications" subtitle="Professional credentials & courses" />
        {editMode && (
          <div className="flex justify-center mb-4">
            <button onClick={addCert} className="btn-outline-glow px-3 py-1.5 rounded-lg text-sm flex items-center gap-1">
              <FiPlus size={14} /> Add
            </button>
          </div>
        )}

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((cert) => (
            <StaggerItem key={cert.id}>
              <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}
                className="glass-card p-6 group cursor-default h-full flex flex-col relative">
                {editMode && (
                  <button onClick={() => removeCert(cert.id)}
                    className="absolute top-2 right-2 p-1 rounded bg-destructive/10 hover:bg-destructive/20 text-destructive z-10">
                    <FiTrash2 size={12} />
                  </button>
                )}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-110 transition-transform">
                    <FiAward size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <EditableText value={cert.title} onChange={(v) => updateCert(cert.id, "title", v)}
                      as="h3" className="font-semibold text-base leading-tight mb-1 group-hover:text-primary transition-colors" />
                    <EditableText value={cert.issuer} onChange={(v) => updateCert(cert.id, "issuer", v)}
                      as="p" className="text-sm text-muted-foreground" />
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <EditableText value={cert.date} onChange={(v) => updateCert(cert.id, "date", v)}
                    className="text-xs font-mono text-primary" />
                  {editMode ? (
                    <div>
                      <label className="text-xs text-muted-foreground block">Credential URL:</label>
                      <EditableText value={cert.credentialUrl} onChange={(v) => updateCert(cert.id, "credentialUrl", v)}
                        className="text-xs" />
                    </div>
                  ) : null}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default CertificationsSection;

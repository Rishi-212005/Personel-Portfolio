import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";
import SectionHeading from "./SectionHeading";
import { FiMail, FiMapPin, FiPhone, FiSend, FiGithub, FiLinkedin } from "react-icons/fi";
import { toast } from "sonner";
import { useEditMode } from "@/context/EditModeContext";
import EditableText from "./EditableText";
import { saveMessage } from "./AdminInbox";

const defaultContact = {
  intro: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
  email: "Sairishikumar.2005@gmail.com",
  phone: "+91 9390455681",
  location: "Anantapur, India",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
};

const ContactSection = () => {
  const { editMode, getData, setData } = useEditMode();
  const [contact, setContact] = useState(() => getData("contact", defaultContact));
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const updateContact = (key: string, val: string) => {
    const updated = { ...contact, [key]: val };
    setContact(updated);
    setData("contact", updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      saveMessage(form.name, form.email, form.message);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 800);
  };

  return (
    <section id="contact" className="section-padding-sm relative">
      <div className="absolute inset-0 animated-bg opacity-30" />
      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading title="Get In Touch" subtitle="Let's work together" />

        <div className="grid md:grid-cols-2 gap-10">
          <ScrollReveal>
            <div className="space-y-6">
              <EditableText value={contact.intro} onChange={(v) => updateContact("intro", v)}
                as="p" className="text-muted-foreground leading-relaxed text-xl" multiline />
              <div className="space-y-4">
                {[
                  { icon: <FiMail />, key: "email", href: `mailto:${contact.email}` },
                  { icon: <FiPhone />, key: "phone", href: `tel:${contact.phone.replace(/\s/g, "")}` },
                  { icon: <FiMapPin />, key: "location" },
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ x: 8 }} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    {editMode ? (
                      <EditableText value={contact[item.key as keyof typeof contact]} onChange={(v) => updateContact(item.key, v)}
                        className="text-base text-muted-foreground" />
                    ) : item.href ? (
                      <a href={item.href} className="text-base text-muted-foreground hover:text-primary transition-colors">
                        {contact[item.key as keyof typeof contact]}
                      </a>
                    ) : (
                      <span className="text-base text-muted-foreground">{contact[item.key as keyof typeof contact]}</span>
                    )}
                  </motion.div>
                ))}
              </div>
              {editMode ? (
                <div className="space-y-2 pt-4">
                  <label className="text-xs text-muted-foreground">Social Links</label>
                  <EditableText value={contact.github} onChange={(v) => updateContact("github", v)} className="text-sm" />
                  <EditableText value={contact.linkedin} onChange={(v) => updateContact("linkedin", v)} className="text-sm" />
                </div>
              ) : (
                <div className="flex gap-3 pt-4">
                  {[
                    { icon: <FiGithub size={20} />, href: contact.github },
                    { icon: <FiLinkedin size={20} />, href: contact.linkedin },
                  ].map((s, i) => (
                    <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }} className="p-3 rounded-full glass hover:text-primary transition-all">
                      {s.icon}
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <motion.form onSubmit={handleSubmit} className="glass-card p-6 space-y-4"
              whileHover={{ borderColor: "hsl(175 80% 45% / 0.3)" }}>
              {[
                { name: "name", type: "text", placeholder: "Your Name", maxLength: 100 },
                { name: "email", type: "email", placeholder: "Your Email", maxLength: 255 },
              ].map((field) => (
                <motion.input key={field.name} type={field.type} placeholder={field.placeholder}
                  value={form[field.name as keyof typeof form]} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
                  required maxLength={field.maxLength} whileFocus={{ scale: 1.01 }}
                  className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-all" />
              ))}
              <motion.textarea placeholder="Your Message" rows={4} value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })} required maxLength={1000}
                whileFocus={{ scale: 1.01 }}
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-all resize-none" />
              <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="btn-primary-glow w-full py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                <FiSend size={16} /> {sending ? "Sending..." : "Send Message"}
              </motion.button>
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

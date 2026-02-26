import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface AdminFormField {
  name: string;
  label: string;
  type?: "text" | "textarea" | "array";
  placeholder?: string;
}

interface AdminModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  fields: AdminFormField[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
}

export const AdminModal = ({ open, onClose, title, fields, initialValues, onSubmit }: AdminModalProps) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues || {});

  useEffect(() => {
    if (open) {
      setValues(initialValues || {});
    }
  }, [open, initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
    toast.success("Saved!");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-sm p-4" onClick={onClose}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} className="glass-card p-6 w-full max-w-lg relative max-h-[80vh] overflow-y-auto">
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><FiX size={20} /></button>
            <h3 className="heading-display text-xl mb-4 glow-text">{title}</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea value={values[field.name] || ""} onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                      placeholder={field.placeholder} rows={3}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
                  ) : field.type === "array" ? (
                    <textarea value={Array.isArray(values[field.name]) ? values[field.name].join("\n") : values[field.name] || ""}
                      onChange={(e) => setValues({ ...values, [field.name]: e.target.value.split("\n") })}
                      placeholder={field.placeholder || "One item per line"} rows={3}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
                  ) : (
                    <input type="text" value={values[field.name] || ""} onChange={(e) => setValues({ ...values, [field.name]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full px-3 py-2 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
                  )}
                </div>
              ))}
              <button type="submit" className="btn-primary-glow w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm">
                <FiSave size={14} /> Save
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const AdminActions = ({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) => {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;
  return (
    <div className="flex gap-1.5 absolute top-3 right-3 z-10">
      <button onClick={onEdit} className="p-1.5 rounded-md bg-primary/10 hover:bg-primary/20 text-primary transition-colors"><FiEdit2 size={12} /></button>
      <button onClick={onDelete} className="p-1.5 rounded-md bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"><FiTrash2 size={12} /></button>
    </div>
  );
};

export const AdminAddButton = ({ onClick, label }: { onClick: () => void; label: string }) => {
  const { isAdmin } = useAuth();
  if (!isAdmin) return null;
  return (
    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onClick}
      className="btn-outline-glow px-4 py-2 rounded-lg text-sm flex items-center gap-2">
      <FiPlus size={14} /> {label}
    </motion.button>
  );
};

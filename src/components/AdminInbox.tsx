import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiInbox, FiX, FiTrash2, FiMail, FiClock } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  read: boolean;
}

const getMessages = (): Message[] => {
  try {
    return JSON.parse(localStorage.getItem("portfolio_messages") || "[]");
  } catch {
    return [];
  }
};

export const saveMessage = (name: string, email: string, message: string) => {
  const messages = getMessages();
  messages.unshift({
    id: Date.now().toString(),
    name,
    email,
    message,
    date: new Date().toLocaleString(),
    read: false,
  });
  localStorage.setItem("portfolio_messages", JSON.stringify(messages));
};

const AdminInbox = () => {
  const { isAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    if (open) setMessages(getMessages());
  }, [open]);

  const unreadCount = getMessages().filter((m) => !m.read).length;

  const markRead = (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, read: true } : m));
    setMessages(updated);
    localStorage.setItem("portfolio_messages", JSON.stringify(updated));
    setSelected(updated.find((m) => m.id === id) || null);
  };

  const deleteMsg = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("portfolio_messages", JSON.stringify(updated));
    if (selected?.id === id) setSelected(null);
  };

  const clearAll = () => {
    setMessages([]);
    localStorage.setItem("portfolio_messages", JSON.stringify([]));
    setSelected(null);
  };

  if (!isAdmin) return null;

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-primary-foreground border-2 border-primary/50"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
        }}
        aria-label="Messages"
      >
        <FiInbox size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-sm p-4"
            onClick={() => { setOpen(false); setSelected(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 w-full max-w-2xl relative max-h-[80vh] flex flex-col"
            >
              <button onClick={() => { setOpen(false); setSelected(null); }} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <FiX size={20} />
              </button>

              <div className="flex items-center justify-between mb-4">
                <h3 className="heading-display text-xl glow-text flex items-center gap-2">
                  <FiInbox /> Inbox ({messages.length})
                </h3>
                {messages.length > 0 && (
                  <button onClick={clearAll} className="text-xs text-destructive hover:underline">Clear All</button>
                )}
              </div>

              {selected ? (
                <div className="flex-1 overflow-y-auto">
                  <button onClick={() => setSelected(null)} className="text-xs text-primary hover:underline mb-3">← Back to inbox</button>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg">{selected.name}</span>
                      <span className="text-xs text-muted-foreground">({selected.email})</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <FiClock size={12} /> {selected.date}
                    </div>
                    <div className="glass p-4 rounded-lg text-base leading-relaxed whitespace-pre-wrap">
                      {selected.message}
                    </div>
                    <a href={`mailto:${selected.email}`} className="btn-primary-glow px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2">
                      <FiMail size={14} /> Reply via Email
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto space-y-2">
                  {messages.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      <FiInbox size={40} className="mx-auto mb-3 opacity-30" />
                      <p>No messages yet</p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        whileHover={{ x: 4 }}
                        className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                          msg.read ? "bg-secondary/20" : "bg-primary/10 border border-primary/20"
                        }`}
                        onClick={() => markRead(msg.id)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            {!msg.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                            <span className="font-medium text-sm truncate">{msg.name}</span>
                            <span className="text-xs text-muted-foreground ml-auto flex-shrink-0">{msg.date}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{msg.message}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteMsg(msg.id); }}
                          className="p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive flex-shrink-0"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminInbox;

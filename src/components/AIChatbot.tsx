import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend, FiUser, FiCpu } from "react-icons/fi";

type Msg = { role: "user" | "assistant"; content: string };

const buildLocalAnswer = (question: string): string => {
  const q = question.toLowerCase();

  if (q.includes("nic") || q.includes("intern")) {
    return "I completed a web development internship at the National Informatics Centre (NIC), where I built secure e‑Governance modules in PHP and MySQL and implemented authentication and role‑based access control.";
  }

  if (q.includes("skill")) {
    return "My main skills are full‑stack web development and secure system design. I work with React, TypeScript, Tailwind CSS on the frontend, and Node.js, Express, PHP, MySQL, and MongoDB on the backend.";
  }

  if (q.includes("project") || q.includes("portfolio")) {
    return "This portfolio highlights projects like an AI‑powered raw‑material marketplace, an academia certificate authenticator, an internship and placement portal, and several secure management systems built with PHP and MySQL.";
  }

  if (q.includes("education") || q.includes("college") || q.includes("b.tech")) {
    return "I’m pursuing a B.Tech in Computer Science at JNTU Anantapur (2023–2027), and I scored in the top 4% in JEE Mains 2024.";
  }

  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    return "You can contact me at Sairishikumar.2005@gmail.com. I’m open to internships, projects, and collaborations around full‑stack development and cybersecurity.";
  }

  return "I’m Rishi’s portfolio assistant. I can answer questions about my skills, projects, NIC internship, education, and interests in full‑stack development and cybersecurity. Ask me anything about those areas.";
};

const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm Rishi's AI assistant. Ask me anything about his skills, experience, or projects! 🚀" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const allMessages = [...messages, userMsg];
    setMessages(allMessages);
    setInput("");
    setIsLoading(true);

    const answer = buildLocalAnswer(userMsg.content);

    // Simulate a short "thinking" delay so the UI feels natural
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg text-primary-foreground"
        style={{
          background: "linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))",
          boxShadow: "0 4px 24px hsl(var(--primary) / 0.4)",
        }}
        aria-label="AI Chat"
      >
        {open ? <FiX size={22} /> : <FiMessageCircle size={22} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden border border-border/50"
            style={{
              background: "hsl(var(--card))",
              boxShadow: "0 20px 60px hsl(var(--background) / 0.8), 0 0 40px hsl(var(--primary) / 0.1)",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center gap-3 border-b border-border/50"
              style={{ background: "linear-gradient(135deg, hsl(var(--gradient-start) / 0.1), hsl(var(--gradient-end) / 0.1))" }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground"
                style={{ background: "linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))" }}>
                <FiCpu size={16} />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Ask about Rishi</h4>
                <p className="text-[10px] text-muted-foreground">AI-powered • Always available</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "user" ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
                  }`}>
                    {msg.role === "user" ? <FiUser size={12} /> : <FiCpu size={12} />}
                  </div>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary/70 text-foreground rounded-bl-sm"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0">
                    <FiCpu size={12} />
                  </div>
                  <div className="bg-secondary/70 px-3 py-2 rounded-xl rounded-bl-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50">
              <form
                onSubmit={(e) => { e.preventDefault(); send(); }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 px-3 py-2.5 rounded-xl bg-secondary/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground disabled:opacity-40 transition-all"
                  style={{ background: "linear-gradient(135deg, hsl(var(--gradient-start)), hsl(var(--gradient-end)))" }}
                >
                  <FiSend size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;

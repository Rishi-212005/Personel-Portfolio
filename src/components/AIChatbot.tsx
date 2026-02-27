import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMessageCircle, FiX, FiSend, FiUser, FiCpu } from "react-icons/fi";
import { projects, experiences, education, achievements } from "@/data/portfolio";

type Msg = { role: "user" | "assistant"; content: string };

const listTitles = (items: { title: string }[]) =>
  items.map((p) => p.title).join(", ");

const buildLocalAnswer = (question: string): string => {
  const q = question.toLowerCase();

  // Projects – filter by tech/keywords
  if (q.includes("project") || q.includes("build") || q.includes("worked on")) {
    const byTech = (tech: string) =>
      projects.filter((p) =>
        p.tech.some((t) => t.toLowerCase().includes(tech)),
      );

    const reactProjects = byTech("react");
    const phpProjects = byTech("php");
    const mlProjects = projects.filter((p) =>
      p.description.toLowerCase().includes("ai") ||
      p.description.toLowerCase().includes("ml") ||
      p.category.toLowerCase().includes("ai"),
    );

    if (q.includes("react")) {
      if (reactProjects.length) {
        return `I’ve built React projects such as ${listTitles(reactProjects)}. You can see their tech stack and GitHub links in the Projects section.`;
      }
    }

    if (q.includes("php")) {
      if (phpProjects.length) {
        return `On the PHP side, I’ve built systems like ${listTitles(phpProjects)} using PHP and MySQL for secure CRUD operations.`;
      }
    }

    if (q.includes("ml") || q.includes("machine learning") || q.includes("ai")) {
      if (mlProjects.length) {
        return `For AI/ML, I’ve worked on projects such as ${listTitles(mlProjects)}, focusing on intelligent pricing and smart analytics.`;
      }
    }

    return `Some of my key projects are ${listTitles(projects)}. Each card in the Projects section links to the GitHub repo so you can dive into the details.`;
  }

  // NIC internship / experience
  if (q.includes("nic") || q.includes("intern")) {
    const nicExp = experiences.find((e) =>
      e.organization.toLowerCase().includes("national informatics centre"),
    );
    if (nicExp) {
      return `I worked as a ${nicExp.title} at ${nicExp.organization} (${nicExp.period}) in ${nicExp.location}, focusing on ${nicExp.points.join(
        ", ",
      )}. It gave me real exposure to secure e‑Governance systems.`;
    }
    return "I completed a web development internship at the National Informatics Centre (NIC), where I built secure e‑Governance modules and implemented authentication and role‑based access control.";
  }

  // Skills / tech stack
  if (q.includes("skill") || q.includes("tech stack") || q.includes("technology")) {
    return "My core stack is React, TypeScript, Tailwind CSS on the frontend and Node.js, Express, PHP, MySQL, and MongoDB on the backend. I focus on authentication, RBAC, secure APIs, and building full‑stack web apps end‑to‑end.";
  }

  // Education
  if (q.includes("education") || q.includes("college") || q.includes("b.tech")) {
    const btech = education.find((e) =>
      e.title.toLowerCase().includes("b.tech") ||
      e.title.toLowerCase().includes("computer science"),
    );
    if (btech) {
      return `I’m pursuing ${btech.title} at ${btech.organization} (${btech.period}). I also completed my MPC at Narayana Jr College and scored top 4% in JEE Mains 2024.`;
    }
    return "I’m pursuing a B.Tech in Computer Science at JNTU Anantapur (2023–2027), after completing MPC at Narayana Jr College with a top‑4% JEE Mains 2024 result.";
  }

  // Achievements
  if (q.includes("achievement") || q.includes("award") || q.includes("jee")) {
    const titles = achievements.map((a) => a.title).join(", ");
    return `My key achievements include ${titles}, including securing a top‑4% percentile in JEE Mains 2024 and earning multiple cybersecurity certifications.`;
  }

  // Contact / email
  if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
    return "You can reach me at Sairishikumar.2005@gmail.com. I’m open to internships, projects, and collaborations around full‑stack development and cybersecurity.";
  }

  // Generic about‑me
  if (
    q.includes("who are you") ||
    q.includes("about you") ||
    q.includes("tell me about yourself")
  ) {
    return "I’m Sai Rishi Kumar Vedi, a B.Tech CSE student and full‑stack developer who loves building secure, database‑driven web applications. I’ve worked on e‑Governance systems at NIC and built multiple projects in React, Node.js, PHP, and MySQL with a strong focus on cybersecurity.";
  }

  // Fallback
  return "I’m Rishi’s portfolio assistant. I can answer questions about my skills, specific projects (React, PHP, AI/ML, etc.), NIC internship, education, and achievements. Ask me about any of those and I’ll give you details from this portfolio.";
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

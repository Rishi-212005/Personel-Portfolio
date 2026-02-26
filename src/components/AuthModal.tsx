import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { FiX, FiLogIn, FiLogOut, FiShield } from "react-icons/fi";
import { toast } from "sonner";

const AuthModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      toast.success("Logged in successfully!");
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card p-8 w-full max-w-md relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <FiX size={20} />
            </button>
            <div className="flex items-center gap-2 mb-6">
              <FiShield className="text-primary" size={24} />
              <h2 className="heading-display text-2xl">Admin Login</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <button type="submit" disabled={loading} className="btn-primary-glow w-full py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
                <FiLogIn size={16} /> {loading ? "..." : "Sign In"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const AdminBar = () => {
  const { isAdmin, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  if (!isAdmin) {
    return (
      <>
        <button
          onClick={() => setAuthOpen(true)}
          className="fixed bottom-6 left-6 z-50 p-3 rounded-full glass hover:text-primary transition-all group"
          aria-label="Admin login"
        >
          <FiShield size={20} />
        </button>
        <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      </>
    );
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-6 z-50 glass-card px-4 py-2 flex items-center gap-3"
    >
      <span className="text-xs font-medium text-primary flex items-center gap-1">
        <FiShield size={12} /> Admin
      </span>
      <button
        onClick={() => {
          signOut();
        }}
        className="p-1.5 rounded-md hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
        aria-label="Sign out"
        type="button"
      >
        <FiLogOut size={16} />
      </button>
    </motion.div>
  );
};

export default AuthModal;

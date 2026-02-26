import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const ADMIN_EMAIL = "sairishikumar.2005@gmail.com";
const ADMIN_PASS = "RISHI@212005";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");
  const [loading] = useState(false);

  const signIn = async (email: string, password: string) => {
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASS) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const signOut = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

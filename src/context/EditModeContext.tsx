import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface EditModeContextType {
  editMode: boolean;
  toggleEditMode: () => void;
  getData: <T>(key: string, fallback: T) => T;
  setData: <T>(key: string, value: T) => void;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

const STORAGE_PREFIX = "portfolio_";

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAuth();
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = useCallback(() => {
    if (!isAdmin) return;
    setEditMode((prev) => {
      if (prev) toast.success("Changes saved!");
      return !prev;
    });
  }, [isAdmin]);

  const getData = useCallback(<T,>(key: string, fallback: T): T => {
    try {
      const saved = localStorage.getItem(STORAGE_PREFIX + key);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  }, []);

  const setData = useCallback(<T,>(key: string, value: T) => {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  }, []);

  return (
    <EditModeContext.Provider value={{ editMode: isAdmin && editMode, toggleEditMode, getData, setData }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used within EditModeProvider");
  return ctx;
};

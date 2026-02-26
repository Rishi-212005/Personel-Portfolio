import { motion } from "framer-motion";
import { FiEdit2, FiSave } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useEditMode } from "@/context/EditModeContext";

const EditModeToggle = () => {
  const { isAdmin } = useAuth();
  const { editMode, toggleEditMode } = useEditMode();

  if (!isAdmin) return null;

  return (
    <motion.button
      onClick={toggleEditMode}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-semibold shadow-lg transition-all ${
        editMode
          ? "bg-primary text-primary-foreground shadow-primary/30"
          : "glass text-foreground hover:text-primary"
      }`}
    >
      {editMode ? <><FiSave size={16} /> Save All</> : <><FiEdit2 size={16} /> Edit Mode</>}
    </motion.button>
  );
};

export default EditModeToggle;

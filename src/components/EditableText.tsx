import { useEditMode } from "@/context/EditModeContext";

interface EditableTextProps {
  value: string;
  onChange: (val: string) => void;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4" | "div";
  className?: string;
  multiline?: boolean;
  children?: React.ReactNode;
}

const EditableText = ({ value, onChange, as: Tag = "span", className = "", multiline = false }: EditableTextProps) => {
  const { editMode } = useEditMode();

  if (!editMode) {
    return <Tag className={className}>{value}</Tag>;
  }

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} bg-primary/10 border border-primary/30 rounded px-2 py-1 outline-none focus:border-primary w-full resize-y min-h-[60px]`}
        rows={3}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${className} bg-primary/10 border border-primary/30 rounded px-2 py-1 outline-none focus:border-primary w-full`}
    />
  );
};

export default EditableText;


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputSectionProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInputSection = ({ label, value, onChange }: TextInputSectionProps) => {
  return (
    <div className="space-y-3">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Input
        id={label.toLowerCase()}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default TextInputSection;


import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColorPickerSectionProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPickerSection = ({ label, value, onChange }: ColorPickerSectionProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <Input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 p-1"
        />
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default ColorPickerSection;

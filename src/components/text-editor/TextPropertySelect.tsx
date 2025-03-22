
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface TextPropertySelectProps {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  hint?: string;
  style?: React.CSSProperties;
}

const TextPropertySelect = ({
  label,
  value,
  options,
  onChange,
  hint,
  style
}: TextPropertySelectProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        {hint && <span className="text-xs text-gray-500">{hint}</span>}
      </div>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {options.map((option) => (
            <SelectItem 
              key={option.value} 
              value={option.value} 
              style={style}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TextPropertySelect;

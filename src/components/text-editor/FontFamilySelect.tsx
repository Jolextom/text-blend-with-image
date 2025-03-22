
import { fonts, fontsByCategory } from "@/constants/fonts";
import TextPropertySelect from "./TextPropertySelect";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";

interface FontFamilySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const FontFamilySelect = ({ value, onChange }: FontFamilySelectProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Font Family</Label>
        <span className="text-xs text-gray-500">({fonts.length} fonts available)</span>
      </div>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select font family" style={{ fontFamily: value }} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {Object.entries(fontsByCategory).map(([category, categorizedFonts]) => (
            <SelectGroup key={category}>
              <SelectLabel className="capitalize">{category.replace('-', ' ')}</SelectLabel>
              {categorizedFonts.map(font => (
                <SelectItem 
                  key={font.value} 
                  value={font.value}
                  style={{ fontFamily: font.value }}
                >
                  {font.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontFamilySelect;

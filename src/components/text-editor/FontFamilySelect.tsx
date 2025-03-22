
import { fonts } from "@/constants/fonts";
import TextPropertySelect from "./TextPropertySelect";

interface FontFamilySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const FontFamilySelect = ({ value, onChange }: FontFamilySelectProps) => {
  return (
    <TextPropertySelect
      label="Font Family"
      value={value}
      options={fonts.map(font => ({ value: font.value, label: font.name }))}
      onChange={onChange}
      hint={`(${fonts.length} fonts available)`}
      style={{ fontFamily: value }}
    />
  );
};

export default FontFamilySelect;

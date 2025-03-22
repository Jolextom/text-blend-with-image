
import { MixBlendMode } from "@/types";
import TextPropertySelect from "./TextPropertySelect";

interface BlendModeSelectProps {
  value: MixBlendMode;
  onChange: (value: MixBlendMode) => void;
}

const BlendModeSelect = ({ value, onChange }: BlendModeSelectProps) => {
  const blendModes = [
    { value: "normal", label: "Normal" },
    { value: "multiply", label: "Multiply" },
    { value: "screen", label: "Screen" },
    { value: "overlay", label: "Overlay" },
    { value: "darken", label: "Darken" },
    { value: "lighten", label: "Lighten" },
    { value: "color-dodge", label: "Color Dodge" },
    { value: "color-burn", label: "Color Burn" },
    { value: "hard-light", label: "Hard Light" },
    { value: "soft-light", label: "Soft Light" },
    { value: "difference", label: "Difference" },
    { value: "exclusion", label: "Exclusion" },
    { value: "hue", label: "Hue" },
    { value: "saturation", label: "Saturation" },
    { value: "color", label: "Color" },
    { value: "luminosity", label: "Luminosity" },
  ];

  return (
    <TextPropertySelect
      label="Blend Mode"
      value={value}
      options={blendModes}
      onChange={(value) => onChange(value as MixBlendMode)}
    />
  );
};

export default BlendModeSelect;

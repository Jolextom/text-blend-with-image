
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface TextPropertySliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}

const TextPropertySlider = ({
  label,
  value,
  min,
  max,
  step,
  unit = "",
  onChange
}: TextPropertySliderProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>{label}</Label>
        <span className="text-xs">{Math.round(value * 100) / 100}{unit}</span>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(values) => onChange(values[0])}
      />
    </div>
  );
};

export default TextPropertySlider;

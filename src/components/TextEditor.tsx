
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { TextLayer, MixBlendMode } from "@/types";

interface TextEditorProps {
  layer: TextLayer;
  onChange: (properties: Partial<TextLayer>) => void;
}

const TextEditor = ({ layer, onChange }: TextEditorProps) => {
  const fonts = [
    { value: "Inter", label: "Inter" },
    { value: "Arial", label: "Arial" },
    { value: "Georgia", label: "Georgia" },
    { value: "Verdana", label: "Verdana" },
    { value: "Playfair Display", label: "Playfair Display" },
    { value: "Courier New", label: "Courier New" },
  ];

  const blendModes: { value: MixBlendMode; label: string }[] = [
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
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="text">Edit Text</Label>
        <Input
          id="text"
          value={layer.text}
          onChange={(e) => onChange({ text: e.target.value })}
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Font Family</Label>
          <span className="text-xs text-gray-500">(6 free fonts available)</span>
        </div>
        <Select
          value={layer.fontFamily}
          onValueChange={(value) => onChange({ fontFamily: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Blend Mode</Label>
        </div>
        <Select
          value={layer.blendMode}
          onValueChange={(value: MixBlendMode) => onChange({ blendMode: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select blend mode" />
          </SelectTrigger>
          <SelectContent>
            {blendModes.map((mode) => (
              <SelectItem key={mode.value} value={mode.value}>
                {mode.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Text Color</Label>
          <Input
            type="color"
            value={layer.color}
            onChange={(e) => onChange({ color: e.target.value })}
            className="w-10 h-10 p-1"
          />
        </div>
        <Input
          value={layer.color}
          onChange={(e) => onChange({ color: e.target.value })}
          className="w-full"
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>X Position</Label>
          <span className="text-xs">{Math.round(layer.x)}</span>
        </div>
        <Slider
          value={[layer.x]}
          min={-100}
          max={100}
          step={1}
          onValueChange={(value) => onChange({ x: value[0] })}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Y Position</Label>
          <span className="text-xs">{Math.round(layer.y)}</span>
        </div>
        <Slider
          value={[layer.y]}
          min={-100}
          max={100}
          step={1}
          onValueChange={(value) => onChange({ y: value[0] })}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Font Weight</Label>
          <span className="text-xs">{layer.fontWeight}</span>
        </div>
        <Slider
          value={[layer.fontWeight]}
          min={100}
          max={900}
          step={100}
          onValueChange={(value) => onChange({ fontWeight: value[0] })}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Text Opacity</Label>
          <span className="text-xs">{layer.opacity.toFixed(1)}</span>
        </div>
        <Slider
          value={[layer.opacity]}
          min={0}
          max={1}
          step={0.1}
          onValueChange={(value) => onChange({ opacity: value[0] })}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Rotation</Label>
          <span className="text-xs">{Math.round(layer.rotation)}°</span>
        </div>
        <Slider
          value={[layer.rotation]}
          min={-180}
          max={180}
          step={1}
          onValueChange={(value) => onChange({ rotation: value[0] })}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Horizontal Tilt</Label>
          <span className="text-xs">{Math.round(layer.horizontalTilt)}°</span>
        </div>
        <Slider
          value={[layer.horizontalTilt]}
          min={-45}
          max={45}
          step={1}
          onValueChange={(value) => onChange({ horizontalTilt: value[0] })}
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Vertical Tilt</Label>
          <span className="text-xs">{Math.round(layer.verticalTilt)}°</span>
        </div>
        <Slider
          value={[layer.verticalTilt]}
          min={-45}
          max={45}
          step={1}
          onValueChange={(value) => onChange({ verticalTilt: value[0] })}
        />
      </div>
    </div>
  );
};

export default TextEditor;


import { TextLayer } from "@/types";
import TextInputSection from "./text-editor/TextInputSection";
import FontFamilySelect from "./text-editor/FontFamilySelect";
import BlendModeSelect from "./text-editor/BlendModeSelect";
import ColorPickerSection from "./text-editor/ColorPickerSection";
import StyleControls from "./text-editor/StyleControls";
import PositionControls from "./text-editor/PositionControls";

interface TextEditorProps {
  layer: TextLayer;
  onChange: (properties: Partial<TextLayer>) => void;
}

const TextEditor = ({ layer, onChange }: TextEditorProps) => {
  const handleStyleChange = (property: string, value: number) => {
    onChange({ [property]: value } as Partial<TextLayer>);
  };

  const handlePositionChange = (property: string, value: number) => {
    onChange({ [property]: value } as Partial<TextLayer>);
  };

  return (
    <div className="space-y-6">
      <TextInputSection
        label="Edit Text"
        value={layer.text}
        onChange={(text) => onChange({ text })}
      />

      <FontFamilySelect
        value={layer.fontFamily}
        onChange={(fontFamily) => onChange({ fontFamily })}
      />

      <StyleControls
        fontSize={layer.fontSize}
        fontWeight={layer.fontWeight}
        opacity={layer.opacity}
        onStyleChange={handleStyleChange}
      />

      <BlendModeSelect
        value={layer.blendMode}
        onChange={(blendMode) => onChange({ blendMode })}
      />

      <ColorPickerSection
        label="Text Color"
        value={layer.color}
        onChange={(color) => onChange({ color })}
      />

      <PositionControls
        x={layer.x}
        y={layer.y}
        rotation={layer.rotation}
        horizontalTilt={layer.horizontalTilt}
        verticalTilt={layer.verticalTilt}
        onPositionChange={handlePositionChange}
      />
    </div>
  );
};

export default TextEditor;

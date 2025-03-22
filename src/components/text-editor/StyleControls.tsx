
import TextPropertySlider from "./TextPropertySlider";

interface StyleControlsProps {
  fontSize: number;
  fontWeight: number;
  opacity: number;
  onStyleChange: (property: string, value: number) => void;
}

const StyleControls = ({
  fontSize,
  fontWeight,
  opacity,
  onStyleChange
}: StyleControlsProps) => {
  return (
    <>
      <TextPropertySlider
        label="Font Size"
        value={fontSize}
        min={10}
        max={200}
        step={1}
        unit="px"
        onChange={(value) => onStyleChange("fontSize", value)}
      />

      <TextPropertySlider
        label="Font Weight"
        value={fontWeight}
        min={100}
        max={900}
        step={100}
        onChange={(value) => onStyleChange("fontWeight", value)}
      />

      <TextPropertySlider
        label="Text Opacity"
        value={opacity}
        min={0}
        max={1}
        step={0.1}
        onChange={(value) => onStyleChange("opacity", value)}
      />
    </>
  );
};

export default StyleControls;

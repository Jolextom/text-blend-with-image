
import TextPropertySlider from "./TextPropertySlider";

interface PositionControlsProps {
  x: number;
  y: number;
  rotation: number;
  horizontalTilt: number;
  verticalTilt: number;
  onPositionChange: (property: string, value: number) => void;
}

const PositionControls = ({
  x,
  y,
  rotation,
  horizontalTilt,
  verticalTilt,
  onPositionChange
}: PositionControlsProps) => {
  return (
    <>
      <TextPropertySlider
        label="X Position"
        value={x}
        min={-100}
        max={100}
        step={1}
        onChange={(value) => onPositionChange("x", value)}
      />

      <TextPropertySlider
        label="Y Position"
        value={y}
        min={-100}
        max={100}
        step={1}
        onChange={(value) => onPositionChange("y", value)}
      />

      <TextPropertySlider
        label="Rotation"
        value={rotation}
        min={-180}
        max={180}
        step={1}
        unit="°"
        onChange={(value) => onPositionChange("rotation", value)}
      />

      <TextPropertySlider
        label="Horizontal Tilt"
        value={horizontalTilt}
        min={-45}
        max={45}
        step={1}
        unit="°"
        onChange={(value) => onPositionChange("horizontalTilt", value)}
      />

      <TextPropertySlider
        label="Vertical Tilt"
        value={verticalTilt}
        min={-45}
        max={45}
        step={1}
        unit="°"
        onChange={(value) => onPositionChange("verticalTilt", value)}
      />
    </>
  );
};

export default PositionControls;


import { TextLayer } from "@/types";

interface TextLayerItemProps {
  layer: TextLayer;
  isSelected: boolean;
  absX: number;
  absY: number;
  onMouseDown: (e: React.MouseEvent) => void;
}

const TextLayerItem = ({ 
  layer, 
  isSelected, 
  absX, 
  absY, 
  onMouseDown 
}: TextLayerItemProps) => {
  return (
    <div
      className={`absolute cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        left: absX,
        top: absY,
        transform: `translate(-50%, -50%) rotate(${layer.rotation}deg) skew(${layer.horizontalTilt}deg, ${layer.verticalTilt}deg)`,
        fontFamily: layer.fontFamily,
        fontSize: `${layer.fontSize}px`,
        fontWeight: layer.fontWeight,
        color: layer.color,
        opacity: layer.opacity,
        mixBlendMode: layer.blendMode,
        userSelect: 'none',
        padding: '8px',
      }}
      data-text-layer="true"
      data-blend-mode={layer.blendMode}
      onMouseDown={onMouseDown}
    >
      {layer.text}
    </div>
  );
};

export default TextLayerItem;


import { TextLayer } from "@/types";

interface TextLayerItemProps {
  layer: TextLayer;
  isSelected: boolean;
  absX: number;
  absY: number;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

const TextLayerItem = ({ 
  layer, 
  isSelected, 
  absX, 
  absY,
  onMouseDown,
  onTouchStart
}: TextLayerItemProps) => {
  return (
    <div
      className={`absolute cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        left: absX,
        top: absY,
        transform: `translate(-50%, -50%) rotate(${layer.rotation}deg) skew(${layer.horizontalTilt}deg, ${layer.verticalTilt}deg)`,
        fontFamily: `"${layer.fontFamily}", sans-serif`,
        fontSize: `${layer.fontSize}px`,
        fontWeight: layer.fontWeight,
        color: layer.color,
        opacity: layer.opacity,
        mixBlendMode: layer.blendMode,
        userSelect: 'none',
        touchAction: 'none',
        padding: '8px',
        textShadow: isSelected ? '0 0 2px rgba(0,0,0,0.2)' : 'none',
        whiteSpace: 'pre-wrap',
        maxWidth: '80%',
        textRendering: 'optimizeLegibility',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
      data-text-layer="true"
      data-blend-mode={layer.blendMode}
      data-font-family={layer.fontFamily}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {layer.text}
      {isSelected && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-white px-2 py-1 rounded shadow-sm pointer-events-none">
          <span>Use arrow keys or drag to position</span>
        </div>
      )}
    </div>
  );
};

export default TextLayerItem;

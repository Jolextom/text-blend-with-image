
import { useRef, useEffect } from "react";
import { TextLayer } from "@/types";
import TextLayerItem from "./canvas/TextLayerItem";
import { getAbsolutePosition, preloadFonts } from "./canvas/canvasUtils";
import { useCanvasSize } from "@/hooks/useCanvasSize";
import { useDraggable } from "@/hooks/useDraggable";

interface EditorCanvasProps {
  image: string;
  textLayers: TextLayer[];
  selectedLayerIndex: number | null;
  onSelectLayer: (index: number) => void;
  onUpdateLayer: (index: number, properties: Partial<TextLayer>) => void;
}

const EditorCanvas = ({ 
  image, 
  textLayers, 
  selectedLayerIndex, 
  onSelectLayer,
  onUpdateLayer
}: EditorCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasSize = useCanvasSize(canvasRef, image);
  
  const [_, { handleMouseDown, handleMouseMove }] = useDraggable(
    selectedLayerIndex,
    onSelectLayer,
    (index, { x, y }) => onUpdateLayer(index, { x, y }),
    canvasRef
  );

  // Preload fonts when text layers change
  useEffect(() => {
    const fontFamilies = textLayers.map(layer => layer.fontFamily);
    if (fontFamilies.length > 0) {
      // Only preload the fonts that are actually used in text layers
      console.log('Preloading fonts used in text layers:', fontFamilies);
      preloadFonts(fontFamilies)
        .catch(err => console.warn('Error preloading fonts for text layers:', err));
    }
  }, [textLayers]);

  return (
    <div 
      ref={canvasRef}
      style={{ width: canvasSize.width, height: canvasSize.height }}
      className="relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <img 
        src={image} 
        alt="Canvas" 
        className="absolute top-0 left-0 w-full h-full object-cover" 
      />
      
      {textLayers.map((layer, index) => {
        const { x: absX, y: absY } = getAbsolutePosition(
          layer.x, 
          layer.y, 
          canvasSize.width, 
          canvasSize.height
        );
        
        return (
          <TextLayerItem
            key={layer.id}
            layer={layer}
            isSelected={selectedLayerIndex === index}
            absX={absX}
            absY={absY}
            onMouseDown={(e) => handleMouseDown(e, index)}
          />
        );
      })}
    </div>
  );
};

export default EditorCanvas;

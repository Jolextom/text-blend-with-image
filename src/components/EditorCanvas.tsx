
import { useRef, useEffect } from "react";
import { TextLayer } from "@/types";
import TextLayerItem from "./canvas/TextLayerItem";
import { preloadFonts } from "./canvas/canvasUtils";
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
  
  const [_, { handleMouseDown, handleMouseMove, handleKeyDown }] = useDraggable(
    selectedLayerIndex,
    onSelectLayer,
    (index, { x, y }) => onUpdateLayer(index, { x, y }),
    canvasRef
  );

  // Preload fonts when text layers change
  useEffect(() => {
    if (textLayers.length > 0) {
      const fontFamilies = textLayers.map(layer => layer.fontFamily);
      // Only preload the fonts that are actually used in text layers
      console.log('Preloading fonts used in text layers:', fontFamilies);
      preloadFonts(fontFamilies)
        .catch(err => console.warn('Error preloading fonts for text layers:', err));
    }
  }, [textLayers.map(layer => layer.fontFamily).join(',')]);

  return (
    <div 
      ref={canvasRef}
      style={{ width: canvasSize.width, height: canvasSize.height }}
      className="relative overflow-hidden touch-manipulation focus:outline-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onKeyDown={handleKeyDown}
      tabIndex={0} // Make the canvas focusable for keyboard events
    >
      <img 
        src={image} 
        alt="Canvas" 
        className="absolute top-0 left-0 w-full h-full object-cover" 
      />
      
      {textLayers.map((layer, index) => (
        <TextLayerItem
          key={layer.id}
          layer={layer}
          isSelected={selectedLayerIndex === index}
          absX={canvasSize.width * (layer.x + 1) / 2}
          absY={canvasSize.height * (layer.y + 1) / 2}
          onMouseDown={(e) => handleMouseDown(e, index)}
          onTouchStart={(e) => handleMouseDown(e, index)}
        />
      ))}
    </div>
  );
};

export default EditorCanvas;

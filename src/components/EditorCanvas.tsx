import { useRef, useEffect, useState } from "react";
import { TextLayer } from "@/types";

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
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCanvasSize = () => {
      if (!canvasRef.current) return;
      
      const img = new Image();
      img.onload = () => {
        const maxWidth = Math.min(window.innerWidth * 0.8, 800);
        const aspectRatio = img.height / img.width;
        
        const width = Math.min(img.width, maxWidth);
        const height = width * aspectRatio;
        
        setCanvasSize({ width, height });
      };
      img.src = image;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [image]);

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    if (index === selectedLayerIndex) {
      setIsDragging(true);
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setDragStart({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    onSelectLayer(index);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || selectedLayerIndex === null) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left - dragStart.x;
    const y = e.clientY - rect.top - dragStart.y;
    
    // Convert to relative coordinates (-100 to 100)
    const relX = (x / rect.width) * 200 - 100;
    const relY = (y / rect.height) * 200 - 100;
    
    onUpdateLayer(selectedLayerIndex, { x: relX, y: relY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mouseleave", handleMouseUp);
      
      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mouseleave", handleMouseUp);
      };
    }
  }, [isDragging]);

  // Convert relative position (-100 to 100) to pixel position
  const getAbsolutePosition = (x: number, y: number) => {
    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;
    
    return {
      x: centerX + (x / 100) * centerX,
      y: centerY + (y / 100) * centerY,
    };
  };

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
        const { x: absX, y: absY } = getAbsolutePosition(layer.x, layer.y);
        
        return (
          <div
            key={layer.id}
            className={`absolute cursor-move ${selectedLayerIndex === index ? 'ring-2 ring-blue-500' : ''}`}
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
            onMouseDown={(e) => handleMouseDown(e, index)}
          >
            {layer.text}
          </div>
        );
      })}
    </div>
  );
};

export default EditorCanvas;

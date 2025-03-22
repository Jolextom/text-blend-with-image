
import { useState, useEffect } from "react";

interface DragState {
  isDragging: boolean;
  dragStart: { x: number; y: number };
}

interface DragHandlers {
  handleMouseDown: (e: React.MouseEvent, index: number) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
}

export const useDraggable = (
  selectedLayerIndex: number | null,
  onSelectLayer: (index: number) => void,
  onUpdateLayer: (index: number, properties: { x: number; y: number }) => void,
  canvasRef: React.RefObject<HTMLDivElement>
): [DragState, DragHandlers] => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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

  return [
    { isDragging, dragStart },
    { handleMouseDown, handleMouseMove, handleMouseUp }
  ];
};

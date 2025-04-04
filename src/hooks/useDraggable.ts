import { useState, useEffect } from "react";

interface DragState {
  isDragging: boolean;
  dragStart: { x: number; y: number };
}

interface DragHandlers {
  handleMouseDown: (e: React.MouseEvent | React.TouchEvent, index: number) => void;
  handleMouseMove: (e: React.MouseEvent | React.TouchEvent) => void;
  handleMouseUp: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

export const useDraggable = (
  selectedLayerIndex: number | null,
  onSelectLayer: (index: number) => void,
  onUpdateLayer: (index: number, properties: { x: number; y: number }) => void,
  canvasRef: React.RefObject<HTMLDivElement>
): [DragState, DragHandlers] => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const getEventPosition = (e: React.MouseEvent | React.TouchEvent): { clientX: number, clientY: number } => {
    if ('touches' in e) {
      return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    }
    return { clientX: e.clientX, clientY: e.clientY };
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent, index: number) => {
    if (index === selectedLayerIndex) {
      setIsDragging(true);
      const pos = getEventPosition(e);
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setDragStart({
        x: pos.clientX - rect.left,
        y: pos.clientY - rect.top,
      });
    }
    onSelectLayer(index);
    
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || selectedLayerIndex === null) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const pos = getEventPosition(e);
    
    const x = pos.clientX - rect.left - dragStart.x;
    const y = pos.clientY - rect.top - dragStart.y;
    
    const relX = (x / rect.width) * 2 - 1;
    const relY = (y / rect.height) * 2 - 1;
    
    onUpdateLayer(selectedLayerIndex, {
      x: Math.max(-0.95, Math.min(0.95, relX)),
      y: Math.max(-0.95, Math.min(0.95, relY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedLayerIndex === null) return;
    
    const stepSize = 0.01;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    let deltaX = 0;
    let deltaY = 0;
    
    switch (e.key) {
      case "ArrowLeft":
        deltaX = -stepSize;
        break;
      case "ArrowRight":
        deltaX = stepSize;
        break;
      case "ArrowUp":
        deltaY = -stepSize;
        break;
      case "ArrowDown":
        deltaY = stepSize;
        break;
      default:
        return;
    }
    
    if (canvasRef.current && selectedLayerIndex !== null) {
      e.preventDefault();
      
      onUpdateLayer(selectedLayerIndex, (prevLayer) => ({
        x: Math.max(-0.95, Math.min(0.95, prevLayer.x + deltaX)),
        y: Math.max(-0.95, Math.min(0.95, prevLayer.y + deltaY))
      }));
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mouseleave", handleMouseUp);
      
      document.addEventListener("touchend", handleMouseUp);
      document.addEventListener("touchcancel", handleMouseUp);
      
      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mouseleave", handleMouseUp);
        document.removeEventListener("touchend", handleMouseUp);
        document.removeEventListener("touchcancel", handleMouseUp);
      };
    }
  }, [isDragging]);

  return [
    { isDragging, dragStart },
    { handleMouseDown, handleMouseMove, handleMouseUp, handleKeyDown }
  ];
};

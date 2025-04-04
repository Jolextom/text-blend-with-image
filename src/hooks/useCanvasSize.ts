
import { useState, useEffect, RefObject } from "react";

interface CanvasSize {
  width: number;
  height: number;
}

export const useCanvasSize = (
  canvasRef: RefObject<HTMLDivElement>,
  imageSrc: string
): CanvasSize => {
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 800, height: 600 });

  useEffect(() => {
    const updateCanvasSize = () => {
      if (!canvasRef.current) return;
      
      const img = new Image();
      img.onload = () => {
        // Calculate available space
        const containerWidth = window.innerWidth * (window.innerWidth < 768 ? 0.9 : 0.55);
        const containerHeight = window.innerHeight * 0.75; // Limit height to 75% of viewport
        
        // Maintain aspect ratio while fitting within container
        const aspectRatio = img.height / img.width;
        
        let width = Math.min(img.width, containerWidth);
        let height = width * aspectRatio;
        
        // If height exceeds container height, recalculate width based on height
        if (height > containerHeight) {
          height = containerHeight;
          width = height / aspectRatio;
        }
        
        setCanvasSize({ width, height });
      };
      img.src = imageSrc;
    };

    updateCanvasSize();
    
    const resizeHandler = () => {
      updateCanvasSize();
    };
    
    window.addEventListener("resize", resizeHandler);
    
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [imageSrc, canvasRef]);

  return canvasSize;
};

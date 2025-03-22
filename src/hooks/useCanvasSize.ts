
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
        const containerWidth = window.innerWidth * (window.innerWidth < 768 ? 0.9 : 0.8);
        const maxWidth = Math.min(containerWidth, 800);
        const aspectRatio = img.height / img.width;
        
        const width = Math.min(img.width, maxWidth);
        const height = width * aspectRatio;
        
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

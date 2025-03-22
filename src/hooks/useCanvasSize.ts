
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
        const maxWidth = Math.min(window.innerWidth * 0.8, 800);
        const aspectRatio = img.height / img.width;
        
        const width = Math.min(img.width, maxWidth);
        const height = width * aspectRatio;
        
        setCanvasSize({ width, height });
      };
      img.src = imageSrc;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    
    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [imageSrc, canvasRef]);

  return canvasSize;
};

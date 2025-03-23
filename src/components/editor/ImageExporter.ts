import type { RefObject } from 'react';
import html2canvas from "html2canvas";
import { toast } from "sonner";

export const exportCanvasToImage = async (canvasRef: RefObject<HTMLElement>): Promise<void> => {
  if (!canvasRef.current) return;
  
  try {
    toast.info("Processing image for download...");
    
    // Create a canvas with the exact dimensions of the original element
    const canvas = await html2canvas(canvasRef.current, {
      backgroundColor: null, // Set background to transparent
      scale: 2, // Higher quality
      logging: false,
      useCORS: true,
      allowTaint: true,
      removeContainer: true,
      // Remove any extra space
      x: 0,
      y: 0,
      width: canvasRef.current.offsetWidth,
      height: canvasRef.current.offsetHeight,
    });

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (!blob) {
        toast.error("Failed to generate image");
        return;
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'textblend-image.png';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Image downloaded successfully!");
    }, 'image/png');
    
  } catch (error) {
    console.error('Error exporting image:', error);
    toast.error("Failed to export image");
  }
};

// Helper function to map CSS blend modes to canvas composite operations
function mapCssBlendToCanvas(blendMode: string): GlobalCompositeOperation {
  const map: Record<string, GlobalCompositeOperation> = {
    'normal': 'source-over',
    'multiply': 'multiply',
    'screen': 'screen',
    'overlay': 'overlay',
    'darken': 'darken',
    'lighten': 'lighten',
    'color-dodge': 'color-dodge',
    'color-burn': 'color-burn',
    'hard-light': 'hard-light',
    'soft-light': 'soft-light',
    'difference': 'difference',
    'exclusion': 'exclusion',
    'hue': 'hue',
    'saturation': 'saturation',
    'color': 'color',
    'luminosity': 'luminosity'
  };
  
  return map[blendMode] || 'source-over';
}

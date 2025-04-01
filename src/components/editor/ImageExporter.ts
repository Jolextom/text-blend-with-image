
import html2canvas from "html2canvas";
import { toast } from "sonner";

export const exportCanvasToImage = async (canvasRef: HTMLDivElement): Promise<void> => {
  try {
    // Capture the entire canvas with contents
    const canvas = await html2canvas(canvasRef, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null, // Keep transparency
      scale: 3, // Higher quality for better text rendering
      logging: false,
      removeContainer: false,
      foreignObjectRendering: true,
      // Capture the border as well
      width: canvasRef.offsetWidth,
      height: canvasRef.offsetHeight
    });

    // Get the content bounds to include everything
    const dataUrl = canvas.toDataURL('image/png');
    
    // Create download link
    const link = document.createElement('a');
    link.download = 'textblend-image.png';
    link.href = dataUrl;
    link.click();
    
    toast.success("Image exported successfully");
  } catch (error) {
    console.error('Error exporting image:', error);
    toast.error("Failed to export image");
    throw error;
  }
};

// Helper function to map CSS blend modes to canvas composite operations
export function mapCssBlendToCanvas(blendMode: string): GlobalCompositeOperation {
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

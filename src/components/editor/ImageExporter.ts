
import html2canvas from "html2canvas";
import { toast } from "sonner";

export const exportCanvasToImage = async (canvasRef: HTMLDivElement): Promise<void> => {
  try {
    const canvas = await html2canvas(canvasRef, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null, // Remove default white background
      scale: 2, // Higher quality
      logging: false,
      removeContainer: false,
      foreignObjectRendering: true,
    });

    // Create download link
    const link = document.createElement('a');
    link.download = 'text-blend-image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('Error exporting image:', error);
    throw error;
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

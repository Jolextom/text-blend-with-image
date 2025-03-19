
import html2canvas from "html2canvas";
import { toast } from "sonner";

export const exportCanvasToImage = async (canvasRef: React.RefObject<HTMLDivElement>): Promise<void> => {
  if (!canvasRef.current) return;
  
  try {
    toast.info("Processing image for download...");
    
    // Create a higher resolution clone for better quality
    const canvasClone = canvasRef.current.cloneNode(true) as HTMLElement;
    
    // Position off-screen for rendering
    canvasClone.style.position = 'absolute';
    canvasClone.style.left = '-9999px';
    canvasClone.style.top = '-9999px';
    
    // Insert into DOM temporarily
    document.body.appendChild(canvasClone);
    
    // Force a layout calculation
    void canvasClone.offsetWidth;
    
    // Ensure all text layers have blend modes correctly applied
    const textLayers = canvasClone.querySelectorAll('[data-text-layer="true"]');
    textLayers.forEach((layer) => {
      const element = layer as HTMLElement;
      const blendMode = element.getAttribute('data-blend-mode');
      if (blendMode) {
        // Explicitly set mix-blend-mode as inline style for html2canvas
        element.style.mixBlendMode = blendMode;
      }
    });
    
    // Use html2canvas with enhanced settings
    const canvas = await html2canvas(canvasClone, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      scale: 4, // Higher scale for better quality
      logging: false,
      onclone: (clonedDoc) => {
        // Additional processing on cloned document
        const clonedTextLayers = clonedDoc.querySelectorAll('[data-text-layer="true"]');
        clonedTextLayers.forEach((layer) => {
          const element = layer as HTMLElement;
          const blendMode = element.getAttribute('data-blend-mode');
          if (blendMode) {
            element.style.mixBlendMode = blendMode;
          }
        });
      }
    });
    
    // Clean up
    document.body.removeChild(canvasClone);
    
    // Create and trigger download
    const link = document.createElement('a');
    link.download = `textblend-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    toast.success("Image downloaded successfully");
  } catch (error) {
    console.error("Error downloading image:", error);
    toast.error("Failed to download image");
  }
};

import html2canvas from "html2canvas";
import { toast } from "sonner";

export const exportCanvasToImage = async (canvasRef: React.RefObject<HTMLElement>): Promise<void> => {
  if (!canvasRef.current) return;
  
  try {
    toast.info("Processing image for download...");
    
    // Get the original canvas dimensions
    const originalWidth = canvasRef.current.offsetWidth;
    const originalHeight = canvasRef.current.offsetHeight;
    
    // Create a deep clone of the canvas element
    const canvasClone = canvasRef.current.cloneNode(true) as HTMLElement;
    
    // Apply styles to the clone for proper rendering
    canvasClone.style.position = 'absolute';
    canvasClone.style.left = '-9999px';
    canvasClone.style.top = '-9999px';
    canvasClone.style.width = `${originalWidth}px`;
    canvasClone.style.height = `${originalHeight}px`;
    
    // Insert into DOM temporarily
    document.body.appendChild(canvasClone);
    
    // Force layout calculation
    void canvasClone.offsetWidth;
    
    // Handle text layers with blend modes
    const processTextLayers = (element: HTMLElement) => {
      // Find all elements with data-text-layer attribute
      const textLayers = element.querySelectorAll('[data-text-layer="true"]');
      textLayers.forEach((layer) => {
        const textElement = layer as HTMLElement;
        const blendMode = textElement.getAttribute('data-blend-mode');
        if (blendMode) {
          // Apply appropriate styles for blend modes
          textElement.style.mixBlendMode = blendMode;
          textElement.style.isolation = 'isolate';
          
          // Ensure the element preserves its original appearance
          const computedStyle = window.getComputedStyle(textElement);
          textElement.style.color = computedStyle.color;
          textElement.style.fontFamily = computedStyle.fontFamily;
          textElement.style.fontSize = computedStyle.fontSize;
          textElement.style.fontWeight = computedStyle.fontWeight;
          textElement.style.letterSpacing = computedStyle.letterSpacing;
          textElement.style.lineHeight = computedStyle.lineHeight;
          textElement.style.textShadow = computedStyle.textShadow;
        }
      });
    };
    
    // Process text layers in the clone
    processTextLayers(canvasClone);
    
    // Create a renderer configuration for html2canvas
    const renderOptions = {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null, // Transparent background
      scale: 3, // Higher scale for better quality
      logging: false,
      onclone: (clonedDoc: Document) => {
        const clonedElement = clonedDoc.body.querySelector('[data-canvas-root="true"]') || 
                            clonedDoc.body.firstElementChild;
        if (clonedElement) {
          processTextLayers(clonedElement as HTMLElement);
        }
      }
    };
    
    // Generate canvas
    const canvas = await html2canvas(canvasClone, renderOptions);
    
    // Clean up
    document.body.removeChild(canvasClone);
    
    // Create a new canvas with the correct dimensions and copy the content
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = canvas.width;
    finalCanvas.height = canvas.height;
    const ctx = finalCanvas.getContext('2d');
    
    if (ctx) {
      // For better blend mode support, use composite operations
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(canvas, 0, 0);
    }
    
    // Create and trigger download
    const link = document.createElement('a');
    link.download = `textblend-${Date.now()}.png`;
    link.href = finalCanvas.toDataURL('image/png', 1.0);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Image downloaded successfully");
  } catch (error) {
    console.error("Error downloading image:", error);
    toast.error("Failed to download image");
  }
};

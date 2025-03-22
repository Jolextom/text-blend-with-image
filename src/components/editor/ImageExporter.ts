
import html2canvas from "html2canvas";
import { toast } from "sonner";

export const exportCanvasToImage = async (canvasRef: React.RefObject<HTMLElement>): Promise<void> => {
  if (!canvasRef.current) return;
  
  try {
    toast.info("Processing image for download...");
    
    // Store the original DOM structure
    const originalElement = canvasRef.current;
    
    // Get all text layers and their styles before cloning
    const textLayers = originalElement.querySelectorAll('[data-text-layer="true"]');
    const textLayerStyles: {element: HTMLElement, styles: Record<string, string>}[] = [];
    
    textLayers.forEach((layer) => {
      const element = layer as HTMLElement;
      const computedStyle = window.getComputedStyle(element);
      const styles: Record<string, string> = {};
      
      // Capture all relevant styles
      [
        'color', 'fontFamily', 'fontSize', 'fontWeight', 'letterSpacing', 
        'lineHeight', 'textShadow', 'mixBlendMode', 'opacity', 'transform',
        'backgroundColor', 'backgroundImage', 'borderRadius', 'padding',
        'display', 'position', 'top', 'left', 'width', 'height', 'zIndex'
      ].forEach(prop => {
        styles[prop] = computedStyle.getPropertyValue(prop);
      });
      
      textLayerStyles.push({ element, styles });
    });
    
    // Try a different approach using a two-step rendering process
    // Step 1: Render the background content
    const backgroundCanvas = document.createElement('canvas');
    backgroundCanvas.width = originalElement.offsetWidth * 2;
    backgroundCanvas.height = originalElement.offsetHeight * 2;
    
    // First, temporarily hide text layers
    textLayers.forEach(layer => {
      (layer as HTMLElement).style.visibility = 'hidden';
    });
    
    // Render the background
    const bgContext = backgroundCanvas.getContext('2d');
    
    // Render the background content with improved options to avoid borders
    const backgroundImage = await html2canvas(originalElement, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      scale: 2,
      logging: false,
      removeContainer: false,
      // Disable the default border/shadows
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector('[data-text-layer]')?.parentElement;
        if (clonedElement) {
          clonedElement.style.boxShadow = 'none';
          clonedElement.style.border = 'none';
        }
      }
    });
    
    // Restore text layer visibility
    textLayers.forEach(layer => {
      (layer as HTMLElement).style.visibility = 'visible';
    });
    
    // Step 2: Set up final canvas
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = originalElement.offsetWidth * 2;
    finalCanvas.height = originalElement.offsetHeight * 2;
    const ctx = finalCanvas.getContext('2d');
    
    if (!ctx || !bgContext) {
      throw new Error("Failed to get canvas context");
    }
    
    // Draw the background first - using drawImage with exact dimensions to avoid white borders
    ctx.drawImage(
      backgroundImage, 
      0, 0, backgroundImage.width, backgroundImage.height,
      0, 0, finalCanvas.width, finalCanvas.height
    );
    
    // Now render each text layer with its proper blend mode
    for (const { element, styles } of textLayerStyles) {
      const blendMode = element.getAttribute('data-blend-mode') || styles.mixBlendMode;
      if (!blendMode) continue;
      
      // Set the blend mode
      ctx.globalCompositeOperation = mapCssBlendToCanvas(blendMode);
      
      // Get the position of the text element relative to the canvas
      const rect = element.getBoundingClientRect();
      const canvasRect = originalElement.getBoundingClientRect();
      
      const x = (rect.left - canvasRect.left) * 2;
      const y = (rect.top - canvasRect.top) * 2;
      const width = rect.width * 2;
      const height = rect.height * 2;
      
      // Create a temporary canvas for this text element
      const textCanvas = document.createElement('canvas');
      textCanvas.width = width;
      textCanvas.height = height;
      
      // Clone and isolate the text element
      const textClone = element.cloneNode(true) as HTMLElement;
      textClone.style.position = 'absolute';
      textClone.style.left = '0';
      textClone.style.top = '0';
      textClone.style.width = `${rect.width}px`;
      textClone.style.height = `${rect.height}px`;
      
      // Create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = `${rect.width}px`;
      tempContainer.style.height = `${rect.height}px`;
      tempContainer.style.overflow = 'hidden';
      tempContainer.appendChild(textClone);
      document.body.appendChild(tempContainer);
      
      // Render the text element
      const textImage = await html2canvas(textClone, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });
      
      // Draw the text with the proper blend mode
      ctx.drawImage(textImage, x, y);
      
      // Clean up
      document.body.removeChild(tempContainer);
      
      // Reset blend mode after drawing this layer
      ctx.globalCompositeOperation = 'source-over';
    }
    
    // Create and trigger download with fixed dimensions to avoid white borders
    const link = document.createElement('a');
    link.download = `textblend-${Date.now()}.png`;
    
    // Convert to blob instead of toDataURL to avoid potential quality loss
    finalCanvas.toBlob((blob) => {
      if (blob) {
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        // Clean up the created URL object
        setTimeout(() => URL.revokeObjectURL(link.href), 100);
        toast.success("Image downloaded successfully");
      } else {
        throw new Error("Failed to create image blob");
      }
    }, 'image/png', 1.0);
    
  } catch (error) {
    console.error("Error downloading image:", error);
    toast.error("Failed to download image");
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

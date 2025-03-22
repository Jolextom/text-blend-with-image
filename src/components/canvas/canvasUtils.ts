
/**
 * Converts relative position (-100 to 100) to pixel position
 */
export const getAbsolutePosition = (
  x: number, 
  y: number, 
  canvasWidth: number, 
  canvasHeight: number
) => {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  
  return {
    x: centerX + (x / 100) * centerX,
    y: centerY + (y / 100) * centerY,
  };
};

/**
 * Preloads fonts to ensure they're properly rendered in the canvas
 */
export const preloadFonts = async (fontFamilies: string[]): Promise<void> => {
  await Promise.all(
    fontFamilies.map(async (fontFamily) => {
      // Skip system fonts that don't need loading
      if (fontFamily.includes(',')) {
        return Promise.resolve();
      }
      
      // Use font loading API if available
      if ('fonts' in document) {
        try {
          await (document as any).fonts.load(`1em ${fontFamily}`);
        } catch (e) {
          console.warn(`Failed to preload font: ${fontFamily}`, e);
        }
      }
    })
  );
};

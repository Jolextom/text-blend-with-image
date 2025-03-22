
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

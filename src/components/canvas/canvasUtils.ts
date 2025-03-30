import { getGoogleFontsLinks } from '@/constants/fonts';

export const getAbsolutePosition = (
  relativeX: number,
  relativeY: number,
  canvasWidth: number,
  canvasHeight: number
) => {
  return {
    x: relativeX * canvasWidth,
    y: relativeY * canvasHeight
  };
};

export const preloadFonts = async (): Promise<void> => {
  const links = getGoogleFontsLinks();
  
  // Create and load all font link elements
  const loadPromises = links.map(link => {
    return new Promise<void>((resolve) => {
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = link;
      linkElement.onload = () => resolve();
      linkElement.onerror = () => {
        console.error(`Failed to load font link: ${link}`);
        resolve(); // Resolve anyway to not block the app
      };
      document.head.appendChild(linkElement);
    });
  });
  
  // Wait for all fonts to load (with a timeout)
  try {
    const timeoutPromise = new Promise<void>(resolve => {
      setTimeout(() => {
        console.warn('Font loading timed out after 5 seconds');
        resolve();
      }, 5000);
    });
    
    // Race between actual loading and timeout
    await Promise.race([
      Promise.all(loadPromises),
      timeoutPromise
    ]);
    
    console.log('Fonts preloaded successfully');
  } catch (error) {
    console.error('Error preloading fonts:', error);
  }
};

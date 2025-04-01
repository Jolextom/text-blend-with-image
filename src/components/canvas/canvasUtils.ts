import { fonts, getFontFamiliesForLoading, getGoogleFontsLinks } from '@/constants/fonts';

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

export const preloadFonts = async (specificFonts?: string[]): Promise<void> => {
  try {
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
    
    // If specific fonts are provided, preload only those
    if (specificFonts && specificFonts.length > 0) {
      const fontPromises = specificFonts.map(fontFamily => {
        // Skip system fonts that might be in a comma-separated list (fallbacks)
        if (fontFamily.includes(',')) return Promise.resolve();
        return document.fonts.load(`1em "${fontFamily}"`);
      });
      
      await Promise.all([...loadPromises, ...fontPromises]);
      console.log(`Specific fonts preloaded: ${specificFonts.join(', ')}`);
      return;
    }
    
    // Otherwise preload all Google fonts
    const fontFamilies = getFontFamiliesForLoading();
    const fontPromises = fontFamilies.map(fontFamily => 
      document.fonts.load(`1em "${fontFamily}"`)
    );
    
    // Wait for all fonts to load (with a timeout)
    const timeoutPromise = new Promise<void>(resolve => {
      setTimeout(() => {
        console.warn('Font loading timed out after 5000ms');
        resolve();
      }, 5000);
    });
    
    // Race between actual loading and timeout
    await Promise.race([
      Promise.all([...loadPromises, ...fontPromises]),
      timeoutPromise
    ]);
    
    console.log('All fonts preloaded successfully');
  } catch (error) {
    console.error('Error preloading fonts:', error);
  }
};

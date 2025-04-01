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
    console.log('Starting font preload process...');
    const links = getGoogleFontsLinks();
    console.log(`Generated ${links.length} font link batches`);
    
    // Track which link elements are already in the document
    const existingLinks = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map(link => (link as HTMLLinkElement).href);
    
    // Create and load font link elements that aren't already loaded
    const loadPromises = links.map((link, index) => {
      // Skip if this link is already in the document
      if (existingLinks.some(existingLink => existingLink === link)) {
        console.log(`Font batch ${index + 1}/${links.length} already loaded`);
        return Promise.resolve();
      }
      
      return new Promise<void>((resolve) => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = link;
        
        linkElement.onload = () => {
          console.log(`Font batch ${index + 1}/${links.length} loaded successfully`);
          resolve();
        };
        
        linkElement.onerror = (e) => {
          console.error(`Failed to load font batch ${index + 1}/${links.length}:`, e);
          resolve(); // Resolve anyway to not block the app
        };
        
        document.head.appendChild(linkElement);
      });
    });
    
    // If specific fonts are provided, preload only those
    if (specificFonts && specificFonts.length > 0) {
      console.log(`Preloading ${specificFonts.length} specific fonts`);
      
      // Filter out any system fonts or fonts with commas (fallbacks)
      const fontPromises = specificFonts
        .filter(font => !font.includes(','))
        .map(fontFamily => {
          return document.fonts.load(`1em "${fontFamily}"`)
            .then(() => console.log(`Font "${fontFamily}" loaded successfully`))
            .catch(err => console.warn(`Error loading font "${fontFamily}":`, err));
        });
      
      // Wait for both stylesheet links and specific fonts to load with a reasonable timeout
      const timeoutPromise = new Promise<void>(resolve => {
        setTimeout(() => {
          console.log(`Specific fonts load timeout reached`);
          resolve();
        }, 3000);
      });
      
      await Promise.race([
        Promise.all([...loadPromises, ...fontPromises]),
        timeoutPromise
      ]);
      
      console.log(`Specific fonts preloaded: ${specificFonts.join(', ')}`);
      return;
    }
    
    // Otherwise preload all Google fonts
    console.log('Preloading all fonts...');
    const fontFamilies = getFontFamiliesForLoading();
    
    // Load fonts in smaller batches to avoid browser limitations
    const fontBatchSize = 10;  // Smaller batch size for more reliable loading
    const fontBatches = [];
    
    for (let i = 0; i < fontFamilies.length; i += fontBatchSize) {
      const batch = fontFamilies.slice(i, i + fontBatchSize);
      const batchPromises = batch.map(fontFamily => 
        document.fonts.load(`1em "${fontFamily}"`)
          .catch(err => console.warn(`Error loading font "${fontFamily}":`, err))
      );
      
      fontBatches.push(Promise.all(batchPromises));
    }
    
    // Wait for all font stylesheets to load (with a timeout)
    const timeoutPromise = new Promise<void>(resolve => {
      setTimeout(() => {
        console.warn('Font loading timed out after 5000ms');
        resolve();
      }, 5000);
    });
    
    // Race between actual loading and timeout
    await Promise.race([
      Promise.all([...loadPromises]),
      timeoutPromise
    ]);
    
    console.log('All fonts preloaded successfully');
  } catch (error) {
    console.error('Error preloading fonts:', error);
    // Don't rethrow, just log the error to avoid breaking the app
  }
};

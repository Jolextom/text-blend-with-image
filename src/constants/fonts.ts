
export type FontCategory = 'serif' | 'sans-serif' | 'display' | 'monospace' | 'handwriting' | 'slab-serif';

export interface Font {
  name: string;
  value: string;
  category: FontCategory;
}

export const fonts: Font[] = [
  // Sans-serif fonts (20 fonts)
  { name: 'Inter', value: 'Inter', category: 'sans-serif' },
  { name: 'Roboto', value: 'Roboto', category: 'sans-serif' },
  { name: 'Montserrat', value: 'Montserrat', category: 'sans-serif' },
  { name: 'Open Sans', value: 'Open Sans', category: 'sans-serif' },
  { name: 'Lato', value: 'Lato', category: 'sans-serif' },
  { name: 'Poppins', value: 'Poppins', category: 'sans-serif' },
  { name: 'Nunito', value: 'Nunito', category: 'sans-serif' },
  { name: 'Work Sans', value: 'Work Sans', category: 'sans-serif' },
  { name: 'Raleway', value: 'Raleway', category: 'sans-serif' },
  { name: 'DM Sans', value: 'DM Sans', category: 'sans-serif' },
  { name: 'Outfit', value: 'Outfit', category: 'sans-serif' },
  { name: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans', category: 'sans-serif' },
  { name: 'Urbanist', value: 'Urbanist', category: 'sans-serif' },
  { name: 'Lexend', value: 'Lexend', category: 'sans-serif' },
  { name: 'Manrope', value: 'Manrope', category: 'sans-serif' },
  { name: 'Space Grotesk', value: 'Space Grotesk', category: 'sans-serif' },
  { name: 'Albert Sans', value: 'Albert Sans', category: 'sans-serif' },
  { name: 'Exo 2', value: 'Exo 2', category: 'sans-serif' },
  { name: 'Noto Sans', value: 'Noto Sans', category: 'sans-serif' },
  { name: 'Ubuntu', value: 'Ubuntu', category: 'sans-serif' },

  // Serif fonts (10 fonts)
  { name: 'Playfair Display', value: 'Playfair Display', category: 'serif' },
  { name: 'Merriweather', value: 'Merriweather', category: 'serif' },
  { name: 'Lora', value: 'Lora', category: 'serif' },
  { name: 'EB Garamond', value: 'EB Garamond', category: 'serif' },
  { name: 'Crimson Pro', value: 'Crimson Pro', category: 'serif' },
  { name: 'Fraunces', value: 'Fraunces', category: 'serif' },
  { name: 'Libre Baskerville', value: 'Libre Baskerville', category: 'serif' },
  { name: 'Source Serif Pro', value: 'Source Serif Pro', category: 'serif' },
  { name: 'Bitter', value: 'Bitter', category: 'serif' },
  { name: 'Bodoni Moda', value: 'Bodoni Moda', category: 'serif' },

  // Display fonts (10 fonts)
  { name: 'Abril Fatface', value: 'Abril Fatface', category: 'display' },
  { name: 'Unbounded', value: 'Unbounded', category: 'display' },
  { name: 'Righteous', value: 'Righteous', category: 'display' },
  { name: 'Bebas Neue', value: 'Bebas Neue', category: 'display' },
  { name: 'Anton', value: 'Anton', category: 'display' },
  { name: 'Oswald', value: 'Oswald', category: 'display' },
  { name: 'Russo One', value: 'Russo One', category: 'display' },
  { name: 'Big Shoulders Display', value: 'Big Shoulders Display', category: 'display' },
  { name: 'Changa', value: 'Changa', category: 'display' },
  { name: 'Syne', value: 'Syne', category: 'display' },

  // Handwriting fonts (5 fonts)
  { name: 'Dancing Script', value: 'Dancing Script', category: 'handwriting' },
  { name: 'Pacifico', value: 'Pacifico', category: 'handwriting' },
  { name: 'Caveat', value: 'Caveat', category: 'handwriting' },
  { name: 'Great Vibes', value: 'Great Vibes', category: 'handwriting' },
  { name: 'Sacramento', value: 'Sacramento', category: 'handwriting' },

  // Monospace fonts (5 fonts)
  { name: 'Roboto Mono', value: 'Roboto Mono', category: 'monospace' },
  { name: 'Fira Code', value: 'Fira Code', category: 'monospace' },
  { name: 'JetBrains Mono', value: 'JetBrains Mono', category: 'monospace' },
  { name: 'Space Mono', value: 'Space Mono', category: 'monospace' },
  { name: 'IBM Plex Mono', value: 'IBM Plex Mono', category: 'monospace' }
];

// Fonts grouped by category for easier access
export const fontsByCategory = fonts.reduce((acc, font) => {
  if (!acc[font.category]) {
    acc[font.category] = [];
  }
  acc[font.category].push(font);
  return acc;
}, {} as Record<FontCategory, Font[]>);

// Get a list of font family strings for Google Fonts loading
export const getFontFamiliesForLoading = (): string[] => {
  return [...new Set(fonts.map(font => font.name))];
};

// Helper to generate HTML link tags for loading Google Fonts in smaller batches
export const getGoogleFontsLinks = (): string[] => {
  const families = fonts
    .filter(font => !font.value.includes(',')) // Filter out system fonts with fallbacks
    .map(font => font.name.replace(/ /g, '+'));
  
  const batchSize = 15; // Smaller batch size for faster loading
  const links: string[] = [];
  
  for (let i = 0; i < families.length; i += batchSize) {
    const batch = families.slice(i, i + batchSize);
    links.push(`https://fonts.googleapis.com/css2?family=${batch.join('&family=')}&display=swap`);
  }
  
  return links;
};

// Helper to generate HTML link tag for loading Google Fonts
export const getGoogleFontsLink = (): string => {
  return getGoogleFontsLinks()[0]; // For backward compatibility
};

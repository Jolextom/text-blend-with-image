export type FontCategory = 'serif' | 'sans-serif' | 'display' | 'monospace' | 'handwriting' | 'slab-serif';

export interface Font {
  name: string;
  value: string;
  category: FontCategory;
}

export const fonts: Font[] = [
  // Sans-serif fonts
  { name: 'Inter', value: 'Inter', category: 'sans-serif' },
  { name: 'Roboto', value: 'Roboto', category: 'sans-serif' },
  { name: 'Montserrat', value: 'Montserrat', category: 'sans-serif' },
  { name: 'Open Sans', value: 'Open Sans', category: 'sans-serif' },
  { name: 'Lato', value: 'Lato', category: 'sans-serif' },
  { name: 'Poppins', value: 'Poppins', category: 'sans-serif' },
  { name: 'Source Sans Pro', value: 'Source Sans Pro', category: 'sans-serif' },
  { name: 'Nunito', value: 'Nunito', category: 'sans-serif' },
  { name: 'Nunito Sans', value: 'Nunito Sans', category: 'sans-serif' },
  { name: 'Work Sans', value: 'Work Sans', category: 'sans-serif' },
  { name: 'Raleway', value: 'Raleway', category: 'sans-serif' },
  { name: 'Rubik', value: 'Rubik', category: 'sans-serif' },
  { name: 'Barlow', value: 'Barlow', category: 'sans-serif' },
  { name: 'Mulish', value: 'Mulish', category: 'sans-serif' },
  { name: 'Karla', value: 'Karla', category: 'sans-serif' },
  { name: 'Noto Sans', value: 'Noto Sans', category: 'sans-serif' },
  { name: 'Ubuntu', value: 'Ubuntu', category: 'sans-serif' },
  { name: 'Public Sans', value: 'Public Sans', category: 'sans-serif' },
  { name: 'DM Sans', value: 'DM Sans', category: 'sans-serif' },
  { name: 'Noto Sans JP', value: 'Noto Sans JP', category: 'sans-serif' },
  { name: 'Sofia Sans', value: 'Sofia Sans', category: 'sans-serif' },
  { name: 'Cabin', value: 'Cabin', category: 'sans-serif' },
  { name: 'Figtree', value: 'Figtree', category: 'sans-serif' },
  { name: 'Assistant', value: 'Assistant', category: 'sans-serif' },
  { name: 'Outfit', value: 'Outfit', category: 'sans-serif' },
  { name: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans', category: 'sans-serif' },
  { name: 'Urbanist', value: 'Urbanist', category: 'sans-serif' },
  { name: 'League Spartan', value: 'League Spartan', category: 'sans-serif' },
  { name: 'Jost', value: 'Jost', category: 'sans-serif' },
  { name: 'Lexend', value: 'Lexend', category: 'sans-serif' },
  { name: 'Sora', value: 'Sora', category: 'sans-serif' },
  { name: 'Manrope', value: 'Manrope', category: 'sans-serif' },
  { name: 'Space Grotesk', value: 'Space Grotesk', category: 'sans-serif' },
  { name: 'Onest', value: 'Onest', category: 'sans-serif' },
  { name: 'Albert Sans', value: 'Albert Sans', category: 'sans-serif' },
  { name: 'Maven Pro', value: 'Maven Pro', category: 'sans-serif' },
  { name: 'Fira Sans', value: 'Fira Sans', category: 'sans-serif' },
  { name: 'Exo 2', value: 'Exo 2', category: 'sans-serif' },
  { name: 'Libre Franklin', value: 'Libre Franklin', category: 'sans-serif' },
  { name: 'Noto Sans TC', value: 'Noto Sans TC', category: 'sans-serif' },
  { name: 'Zen Kaku Gothic New', value: 'Zen Kaku Gothic New', category: 'sans-serif' },
  { name: 'Zen Maru Gothic', value: 'Zen Maru Gothic', category: 'sans-serif' },
  
  // Serif fonts
  { name: 'Playfair Display', value: 'Playfair Display', category: 'serif' },
  { name: 'Merriweather', value: 'Merriweather', category: 'serif' },
  { name: 'Source Serif Pro', value: 'Source Serif Pro', category: 'serif' },
  { name: 'Lora', value: 'Lora', category: 'serif' },
  { name: 'EB Garamond', value: 'EB Garamond', category: 'serif' },
  { name: 'Libre Baskerville', value: 'Libre Baskerville', category: 'serif' },
  { name: 'Noto Serif', value: 'Noto Serif', category: 'serif' },
  { name: 'Crimson Pro', value: 'Crimson Pro', category: 'serif' },
  { name: 'Cormorant Garamond', value: 'Cormorant Garamond', category: 'serif' },
  { name: 'Spectral', value: 'Spectral', category: 'serif' },
  { name: 'Bodoni Moda', value: 'Bodoni Moda', category: 'serif' },
  { name: 'Bitter', value: 'Bitter', category: 'serif' },
  { name: 'Petrona', value: 'Petrona', category: 'serif' },
  { name: 'Fraunces', value: 'Fraunces', category: 'serif' },
  { name: 'Faustina', value: 'Faustina', category: 'serif' },
  { name: 'Gilda Display', value: 'Gilda Display', category: 'serif' },
  { name: 'Eczar', value: 'Eczar', category: 'serif' },
  { name: 'Crimson Text', value: 'Crimson Text', category: 'serif' },
  { name: 'Linden Hill', value: 'Linden Hill', category: 'serif' },
  { name: 'Noto Serif JP', value: 'Noto Serif JP', category: 'serif' },
  { name: 'Zen Old Mincho', value: 'Zen Old Mincho', category: 'serif' },
  { name: 'Zen Antique', value: 'Zen Antique', category: 'serif' },
  { name: 'Zen Antique Soft', value: 'Zen Antique Soft', category: 'serif' },
  
  // Display fonts
  { name: 'Abril Fatface', value: 'Abril Fatface', category: 'display' },
  { name: 'Anton', value: 'Anton', category: 'display' },
  { name: 'Besley', value: 'Besley', category: 'display' },
  { name: 'Bebas Neue', value: 'Bebas Neue', category: 'display' },
  { name: 'Unbounded', value: 'Unbounded', category: 'display' },
  { name: 'Oswald', value: 'Oswald', category: 'display' },
  { name: 'Paytone One', value: 'Paytone One', category: 'display' },
  { name: 'Comfortaa', value: 'Comfortaa', category: 'display' },
  { name: 'Righteous', value: 'Righteous', category: 'display' },
  { name: 'Kanit', value: 'Kanit', category: 'display' },
  { name: 'Lobster', value: 'Lobster', category: 'display' },
  { name: 'Secular One', value: 'Secular One', category: 'display' },
  { name: 'Acme', value: 'Acme', category: 'display' },
  { name: 'Russo One', value: 'Russo One', category: 'display' },
  { name: 'Changa', value: 'Changa', category: 'display' },
  { name: 'Syne', value: 'Syne', category: 'display' },
  { name: 'Patua One', value: 'Patua One', category: 'display' },
  { name: 'Big Shoulders Display', value: 'Big Shoulders Display', category: 'display' },
  { name: 'Fugaz One', value: 'Fugaz One', category: 'display' },
  { name: 'Passion One', value: 'Passion One', category: 'display' },
  { name: 'Zen Tokyo Zoo', value: 'Zen Tokyo Zoo', category: 'display' },
  { name: 'Zen Dots', value: 'Zen Dots', category: 'display' },
  { name: 'Zen Loop', value: 'Zen Loop', category: 'display' },
  
  // Monospace fonts
  { name: 'Roboto Mono', value: 'Roboto Mono', category: 'monospace' },
  { name: 'Fira Code', value: 'Fira Code', category: 'monospace' },
  { name: 'Inconsolata', value: 'Inconsolata', category: 'monospace' },
  { name: 'Source Code Pro', value: 'Source Code Pro', category: 'monospace' },
  { name: 'Space Mono', value: 'Space Mono', category: 'monospace' },
  { name: 'JetBrains Mono', value: 'JetBrains Mono', category: 'monospace' },
  { name: 'IBM Plex Mono', value: 'IBM Plex Mono', category: 'monospace' },
  { name: 'Ubuntu Mono', value: 'Ubuntu Mono', category: 'monospace' },
  { name: 'Courier Prime', value: 'Courier Prime', category: 'monospace' },
  { name: 'Red Hat Mono', value: 'Red Hat Mono', category: 'monospace' },
  { name: 'Azeret Mono', value: 'Azeret Mono', category: 'monospace' },
  { name: 'DM Mono', value: 'DM Mono', category: 'monospace' },
  { name: 'Major Mono Display', value: 'Major Mono Display', category: 'monospace' },
  { name: 'Nova Mono', value: 'Nova Mono', category: 'monospace' },
  { name: 'B612 Mono', value: 'B612 Mono', category: 'monospace' },
  
  // Handwriting fonts
  { name: 'Dancing Script', value: 'Dancing Script', category: 'handwriting' },
  { name: 'Pacifico', value: 'Pacifico', category: 'handwriting' },
  { name: 'Caveat', value: 'Caveat', category: 'handwriting' },
  { name: 'Satisfy', value: 'Satisfy', category: 'handwriting' },
  { name: 'Indie Flower', value: 'Indie Flower', category: 'handwriting' },
  { name: 'Shadows Into Light', value: 'Shadows Into Light', category: 'handwriting' },
  { name: 'Kalam', value: 'Kalam', category: 'handwriting' },
  { name: 'Architects Daughter', value: 'Architects Daughter', category: 'handwriting' },
  { name: 'Gochi Hand', value: 'Gochi Hand', category: 'handwriting' },
  { name: 'Permanent Marker', value: 'Permanent Marker', category: 'handwriting' },
  { name: 'Homemade Apple', value: 'Homemade Apple', category: 'handwriting' },
  { name: 'Amatic SC', value: 'Amatic SC', category: 'handwriting' },
  { name: 'Sacramento', value: 'Sacramento', category: 'handwriting' },
  { name: 'Sriracha', value: 'Sriracha', category: 'handwriting' },
  { name: 'Gloria Hallelujah', value: 'Gloria Hallelujah', category: 'handwriting' },
  { name: 'Great Vibes', value: 'Great Vibes', category: 'handwriting' },
  { name: 'Marck Script', value: 'Marck Script', category: 'handwriting' },
  { name: 'Patrick Hand', value: 'Patrick Hand', category: 'handwriting' },
  { name: 'Nanum Pen Script', value: 'Nanum Pen Script', category: 'handwriting' },
  { name: 'Cedarville Cursive', value: 'Cedarville Cursive', category: 'handwriting' },
  { name: 'Zen Kurenaido', value: 'Zen Kurenaido', category: 'handwriting' },
  
  // Slab Serif fonts
  { name: 'Roboto Slab', value: 'Roboto Slab', category: 'slab-serif' },
  { name: 'Arvo', value: 'Arvo', category: 'slab-serif' },
  { name: 'Crete Round', value: 'Crete Round', category: 'slab-serif' },
  { name: 'Alfa Slab One', value: 'Alfa Slab One', category: 'slab-serif' },
  { name: 'IBM Plex Serif', value: 'IBM Plex Serif', category: 'slab-serif' },
  { name: 'Bevan', value: 'Bevan', category: 'slab-serif' },
  { name: 'Josefin Slab', value: 'Josefin Slab', category: 'slab-serif' },
  { name: 'Ultra', value: 'Ultra', category: 'slab-serif' },
  { name: 'Sanchez', value: 'Sanchez', category: 'slab-serif' },
  { name: 'Zilla Slab', value: 'Zilla Slab', category: 'slab-serif' },
  { name: 'Domine', value: 'Domine', category: 'slab-serif' },
  { name: 'Bree Serif', value: 'Bree Serif', category: 'slab-serif' },
  { name: 'Slabo 27px', value: 'Slabo 27px', category: 'slab-serif' },
  { name: 'Alegreya SC', value: 'Alegreya SC', category: 'slab-serif' },
  { name: 'Scope One', value: 'Scope One', category: 'slab-serif' },
  
  // Common system fonts
  { name: 'Arial', value: 'Arial, sans-serif', category: 'sans-serif' },
  { name: 'Verdana', value: 'Verdana, sans-serif', category: 'sans-serif' },
  { name: 'Helvetica', value: 'Helvetica, sans-serif', category: 'sans-serif' },
  { name: 'Tahoma', value: 'Tahoma, sans-serif', category: 'sans-serif' },
  { name: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif', category: 'sans-serif' },
  { name: 'Georgia', value: 'Georgia, serif', category: 'serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif', category: 'serif' },
  { name: 'Garamond', value: 'Garamond, serif', category: 'serif' },
  { name: 'Courier New', value: 'Courier New, monospace', category: 'monospace' },
  { name: 'Brush Script MT', value: 'Brush Script MT, cursive', category: 'handwriting' },
  
  // Web safe fonts
  { name: 'Impact', value: 'Impact, sans-serif', category: 'display' },
  { name: 'Lucida Sans', value: 'Lucida Sans, sans-serif', category: 'sans-serif' },
  { name: 'Palatino', value: 'Palatino, serif', category: 'serif' },
  { name: 'Book Antiqua', value: 'Book Antiqua, serif', category: 'serif' },
  { name: 'Lucida Console', value: 'Lucida Console, monospace', category: 'monospace' },
  { name: 'Century Gothic', value: 'Century Gothic, sans-serif', category: 'sans-serif' },
  { name: 'Copperplate', value: 'Copperplate, serif', category: 'display' },
  { name: 'Optima', value: 'Optima, sans-serif', category: 'sans-serif' },
  { name: 'Didot', value: 'Didot, serif', category: 'serif' },
  { name: 'Futura', value: 'Futura, sans-serif', category: 'sans-serif' }
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
  // Filter out system fonts that don't need to be loaded from Google
  const googleFonts = fonts.filter(font => !font.value.includes(','));
  
  // Prioritize essential fonts first
  const essentialFonts = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Poppins',
    'Playfair Display',
    'Merriweather',
    'Source Serif Pro',
    'Abril Fatface',
    'Anton',
    'Roboto Mono',
    'Fira Code',
    'Dancing Script',
    'Pacifico',
    'Roboto Slab'
  ];
  
  const prioritizedFonts = essentialFonts.map(name => 
    googleFonts.find(font => font.name === name)
  ).filter((font): font is Font => font !== undefined);
  
  const otherFonts = googleFonts.filter(font => !essentialFonts.includes(font.name));
  
  // Return unique font family names, prioritizing essential fonts
  return [...new Set([...prioritizedFonts, ...otherFonts].map(font => font.name.replace(/ /g, '+')))];
};

// Helper to generate HTML link tags for loading Google Fonts in batches
export const getGoogleFontsLinks = (): string[] => {
  const families = getFontFamiliesForLoading();
  const batchSize = 50; // Load 50 fonts at a time
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

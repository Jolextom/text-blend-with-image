
export type FontCategory = 'serif' | 'sans-serif' | 'display' | 'monospace' | 'handwriting' | 'slab-serif';

export interface Font {
  name: string;
  value: string;
  category: FontCategory;
}

// Expanded list of 200 fonts
export const fonts: Font[] = [
  // Sans-serif fonts (67 fonts)
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
  { name: 'Quicksand', value: 'Quicksand', category: 'sans-serif' },
  { name: 'Josefin Sans', value: 'Josefin Sans', category: 'sans-serif' },
  { name: 'Rubik', value: 'Rubik', category: 'sans-serif' },
  { name: 'Source Sans Pro', value: 'Source Sans Pro', category: 'sans-serif' },
  { name: 'Cabin', value: 'Cabin', category: 'sans-serif' },
  { name: 'Karla', value: 'Karla', category: 'sans-serif' },
  { name: 'Oxygen', value: 'Oxygen', category: 'sans-serif' },
  { name: 'Figtree', value: 'Figtree', category: 'sans-serif' },
  { name: 'Assistant', value: 'Assistant', category: 'sans-serif' },
  { name: 'Public Sans', value: 'Public Sans', category: 'sans-serif' },
  { name: 'Sora', value: 'Sora', category: 'sans-serif' },
  { name: 'Jost', value: 'Jost', category: 'sans-serif' },
  { name: 'Mulish', value: 'Mulish', category: 'sans-serif' },
  { name: 'Cairo', value: 'Cairo', category: 'sans-serif' },
  { name: 'Questrial', value: 'Questrial', category: 'sans-serif' },
  { name: 'Varela Round', value: 'Varela Round', category: 'sans-serif' },
  { name: 'Archivo', value: 'Archivo', category: 'sans-serif' },
  { name: 'Barlow', value: 'Barlow', category: 'sans-serif' },
  { name: 'IBM Plex Sans', value: 'IBM Plex Sans', category: 'sans-serif' },
  { name: 'Maven Pro', value: 'Maven Pro', category: 'sans-serif' },
  { name: 'Titillium Web', value: 'Titillium Web', category: 'sans-serif' },
  { name: 'Overpass', value: 'Overpass', category: 'sans-serif' },
  { name: 'Catamaran', value: 'Catamaran', category: 'sans-serif' },
  { name: 'Kanit', value: 'Kanit', category: 'sans-serif' },
  { name: 'PT Sans', value: 'PT Sans', category: 'sans-serif' },
  { name: 'Signika Negative', value: 'Signika Negative', category: 'sans-serif' },
  { name: 'Readex Pro', value: 'Readex Pro', category: 'sans-serif' },
  { name: 'Hind Siliguri', value: 'Hind Siliguri', category: 'sans-serif' },
  { name: 'Comfortaa', value: 'Comfortaa', category: 'sans-serif' },
  { name: 'Red Hat Display', value: 'Red Hat Display', category: 'sans-serif' },
  { name: 'Fira Sans', value: 'Fira Sans', category: 'sans-serif' },
  { name: 'Alegreya Sans', value: 'Alegreya Sans', category: 'sans-serif' },
  { name: 'Didact Gothic', value: 'Didact Gothic', category: 'sans-serif' },
  { name: 'Prompt', value: 'Prompt', category: 'sans-serif' },
  { name: 'Epilogue', value: 'Epilogue', category: 'sans-serif' },
  { name: 'Atkinson Hyperlegible', value: 'Atkinson Hyperlegible', category: 'sans-serif' },
  { name: 'DM Sans', value: 'DM Sans', category: 'sans-serif' },
  { name: 'Inclusive Sans', value: 'Inclusive Sans', category: 'sans-serif' },
  { name: 'Commissioner', value: 'Commissioner', category: 'sans-serif' },
  { name: 'Noto Sans Display', value: 'Noto Sans Display', category: 'sans-serif' },
  { name: 'Source Sans 3', value: 'Source Sans 3', category: 'sans-serif' },
  { name: 'Asap', value: 'Asap', category: 'sans-serif' },
  { name: 'Saira', value: 'Saira', category: 'sans-serif' },
  { name: 'Golos Text', value: 'Golos Text', category: 'sans-serif' },
  { name: 'Hanken Grotesk', value: 'Hanken Grotesk', category: 'sans-serif' },
  { name: 'Red Hat Text', value: 'Red Hat Text', category: 'sans-serif' },
  { name: 'Chivo', value: 'Chivo', category: 'sans-serif' },
  
  // Serif fonts (45 fonts)
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
  { name: 'Cormorant', value: 'Cormorant', category: 'serif' },
  { name: 'Playfair Display SC', value: 'Playfair Display SC', category: 'serif' },
  { name: 'Crimson Text', value: 'Crimson Text', category: 'serif' },
  { name: 'Spectral', value: 'Spectral', category: 'serif' },
  { name: 'Cinzel', value: 'Cinzel', category: 'serif' },
  { name: 'Vollkorn', value: 'Vollkorn', category: 'serif' },
  { name: 'Libre Caslon Text', value: 'Libre Caslon Text', category: 'serif' },
  { name: 'Eczar', value: 'Eczar', category: 'serif' },
  { name: 'Petrona', value: 'Petrona', category: 'serif' },
  { name: 'Gentium Book Plus', value: 'Gentium Book Plus', category: 'serif' },
  { name: 'Alegreya', value: 'Alegreya', category: 'serif' },
  { name: 'Brygada 1918', value: 'Brygada 1918', category: 'serif' },
  { name: 'Cormorant Garamond', value: 'Cormorant Garamond', category: 'serif' },
  { name: 'Baskervville', value: 'Baskervville', category: 'serif' },
  { name: 'Kaisei Tokumin', value: 'Kaisei Tokumin', category: 'serif' },
  { name: 'Lora', value: 'Lora', category: 'serif' },
  { name: 'Newsreader', value: 'Newsreader', category: 'serif' },
  { name: 'PT Serif', value: 'PT Serif', category: 'serif' },
  { name: 'Frank Ruhl Libre', value: 'Frank Ruhl Libre', category: 'serif' },
  { name: 'Cormorant Infant', value: 'Cormorant Infant', category: 'serif' },
  { name: 'Faustina', value: 'Faustina', category: 'serif' },
  { name: 'Nanum Myeongjo', value: 'Nanum Myeongjo', category: 'serif' },
  { name: 'Judson', value: 'Judson', category: 'serif' },
  { name: 'IBM Plex Serif', value: 'IBM Plex Serif', category: 'serif' },
  { name: 'Lustria', value: 'Lustria', category: 'serif' },
  { name: 'Amiri', value: 'Amiri', category: 'serif' },
  { name: 'Cardo', value: 'Cardo', category: 'serif' },
  { name: 'Rosario', value: 'Rosario', category: 'serif' },
  { name: 'Kaisei Decol', value: 'Kaisei Decol', category: 'serif' },
  { name: 'Ibarra Real Nova', value: 'Ibarra Real Nova', category: 'serif' },
  { name: 'Gelasio', value: 'Gelasio', category: 'serif' },
  { name: 'Noto Serif', value: 'Noto Serif', category: 'serif' },
  { name: 'Literata', value: 'Literata', category: 'serif' },
  { name: 'Caladea', value: 'Caladea', category: 'serif' },
  { name: 'Hahmlet', value: 'Hahmlet', category: 'serif' },
  
  // Display fonts (40 fonts)
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
  { name: 'Alfa Slab One', value: 'Alfa Slab One', category: 'display' },
  { name: 'Lexend Mega', value: 'Lexend Mega', category: 'display' },
  { name: 'Staatliches', value: 'Staatliches', category: 'display' },
  { name: 'Teko', value: 'Teko', category: 'display' },
  { name: 'Secular One', value: 'Secular One', category: 'display' },
  { name: 'Yeseva One', value: 'Yeseva One', category: 'display' },
  { name: 'Archivo Black', value: 'Archivo Black', category: 'display' },
  { name: 'Concert One', value: 'Concert One', category: 'display' },
  { name: 'Bungee', value: 'Bungee', category: 'display' },
  { name: 'Baloo 2', value: 'Baloo 2', category: 'display' },
  { name: 'Paytone One', value: 'Paytone One', category: 'display' },
  { name: 'Calistoga', value: 'Calistoga', category: 'display' },
  { name: 'Fugaz One', value: 'Fugaz One', category: 'display' },
  { name: 'Black Ops One', value: 'Black Ops One', category: 'display' },
  { name: 'Lilita One', value: 'Lilita One', category: 'display' },
  { name: 'Graduate', value: 'Graduate', category: 'display' },
  { name: 'Londrina Solid', value: 'Londrina Solid', category: 'display' },
  { name: 'Climate Crisis', value: 'Climate Crisis', category: 'display' },
  { name: 'Cherry Bomb One', value: 'Cherry Bomb One', category: 'display' },
  { name: 'Bruno Ace', value: 'Bruno Ace', category: 'display' },
  { name: 'Vina Sans', value: 'Vina Sans', category: 'display' },
  { name: 'Kumar One', value: 'Kumar One', category: 'display' },
  { name: 'Ultra', value: 'Ultra', category: 'display' },
  { name: 'Big Shoulders Stencil Display', value: 'Big Shoulders Stencil Display', category: 'display' },
  { name: 'Macondo Swash Caps', value: 'Macondo Swash Caps', category: 'display' },
  { name: 'Boogaloo', value: 'Boogaloo', category: 'display' },
  { name: 'Fascinate', value: 'Fascinate', category: 'display' },
  { name: 'Monoton', value: 'Monoton', category: 'display' },
  { name: 'Faster One', value: 'Faster One', category: 'display' },
  { name: 'Megrim', value: 'Megrim', category: 'display' },
  
  // Handwriting fonts (25 fonts)
  { name: 'Dancing Script', value: 'Dancing Script', category: 'handwriting' },
  { name: 'Pacifico', value: 'Pacifico', category: 'handwriting' },
  { name: 'Caveat', value: 'Caveat', category: 'handwriting' },
  { name: 'Great Vibes', value: 'Great Vibes', category: 'handwriting' },
  { name: 'Sacramento', value: 'Sacramento', category: 'handwriting' },
  { name: 'Satisfy', value: 'Satisfy', category: 'handwriting' },
  { name: 'Kalam', value: 'Kalam', category: 'handwriting' },
  { name: 'Indie Flower', value: 'Indie Flower', category: 'handwriting' },
  { name: 'Homemade Apple', value: 'Homemade Apple', category: 'handwriting' },
  { name: 'Architects Daughter', value: 'Architects Daughter', category: 'handwriting' },
  { name: 'Patrick Hand', value: 'Patrick Hand', category: 'handwriting' },
  { name: 'Shadows Into Light', value: 'Shadows Into Light', category: 'handwriting' },
  { name: 'Comic Neue', value: 'Comic Neue', category: 'handwriting' },
  { name: 'Shadows Into Light Two', value: 'Shadows Into Light Two', category: 'handwriting' },
  { name: 'Amatic SC', value: 'Amatic SC', category: 'handwriting' },
  { name: 'Marck Script', value: 'Marck Script', category: 'handwriting' },
  { name: 'Covered By Your Grace', value: 'Covered By Your Grace', category: 'handwriting' },
  { name: 'Sriracha', value: 'Sriracha', category: 'handwriting' },
  { name: 'Permanent Marker', value: 'Permanent Marker', category: 'handwriting' },
  { name: 'Gochi Hand', value: 'Gochi Hand', category: 'handwriting' },
  { name: 'Kaushan Script', value: 'Kaushan Script', category: 'handwriting' },
  { name: 'Yellowtail', value: 'Yellowtail', category: 'handwriting' },
  { name: 'Reenie Beanie', value: 'Reenie Beanie', category: 'handwriting' },
  { name: 'Schoolbell', value: 'Schoolbell', category: 'handwriting' },
  { name: 'Just Me Again Down Here', value: 'Just Me Again Down Here', category: 'handwriting' },

  // Monospace fonts (15 fonts)
  { name: 'Roboto Mono', value: 'Roboto Mono', category: 'monospace' },
  { name: 'Fira Code', value: 'Fira Code', category: 'monospace' },
  { name: 'JetBrains Mono', value: 'JetBrains Mono', category: 'monospace' },
  { name: 'Space Mono', value: 'Space Mono', category: 'monospace' },
  { name: 'IBM Plex Mono', value: 'IBM Plex Mono', category: 'monospace' },
  { name: 'Source Code Pro', value: 'Source Code Pro', category: 'monospace' },
  { name: 'Inconsolata', value: 'Inconsolata', category: 'monospace' },
  { name: 'Ubuntu Mono', value: 'Ubuntu Mono', category: 'monospace' },
  { name: 'PT Mono', value: 'PT Mono', category: 'monospace' },
  { name: 'Courier Prime', value: 'Courier Prime', category: 'monospace' },
  { name: 'Anonymous Pro', value: 'Anonymous Pro', category: 'monospace' },
  { name: 'Noto Sans Mono', value: 'Noto Sans Mono', category: 'monospace' },
  { name: 'DM Mono', value: 'DM Mono', category: 'monospace' },
  { name: 'Cutive Mono', value: 'Cutive Mono', category: 'monospace' },
  { name: 'Major Mono Display', value: 'Major Mono Display', category: 'monospace' },

  // Slab-serif fonts (8 fonts)
  { name: 'Roboto Slab', value: 'Roboto Slab', category: 'slab-serif' },
  { name: 'Arvo', value: 'Arvo', category: 'slab-serif' },
  { name: 'Zilla Slab', value: 'Zilla Slab', category: 'slab-serif' },
  { name: 'Crete Round', value: 'Crete Round', category: 'slab-serif' },
  { name: 'Scope One', value: 'Scope One', category: 'slab-serif' },
  { name: 'Aleo', value: 'Aleo', category: 'slab-serif' },
  { name: 'Slabo 27px', value: 'Slabo 27px', category: 'slab-serif' },
  { name: 'Besley', value: 'Besley', category: 'slab-serif' }
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
  
  // Smaller batch size (10) for faster loading of many fonts
  const batchSize = 10; 
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

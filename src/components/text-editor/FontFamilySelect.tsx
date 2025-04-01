
import { fonts, fontsByCategory } from "@/constants/fonts";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { useState, useEffect } from "react";
import { preloadFonts } from "@/components/canvas/canvasUtils";

interface FontFamilySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const FontFamilySelect = ({ value, onChange }: FontFamilySelectProps) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    // Check if fonts are loaded using the Font Loading API
    const checkFontsLoaded = async () => {
      try {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
          setFontsLoaded(true);
          console.log('Fonts are loaded and ready to use');
        } else {
          // Fallback for browsers that don't support Font Loading API
          setTimeout(() => setFontsLoaded(true), 3000);
        }
      } catch (error) {
        console.error('Error checking font loading status:', error);
        // Assume fonts are loaded after a timeout if there's an error
        setTimeout(() => setFontsLoaded(true), 3000);
      }
    };
    
    checkFontsLoaded();
  }, []);
  
  // Load the currently selected font if it changes and isn't loaded yet
  useEffect(() => {
    if (value) {
      preloadFonts([value])
        .catch(err => console.warn('Error preloading selected font:', err));
    }
  }, [value]);

  // Filter out system fonts for the count
  const googleFontsCount = fonts.length;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Font Family</Label>
        <span className="text-xs text-gray-500">
          {fontsLoaded 
            ? `(${googleFontsCount} fonts available)` 
            : "Loading fonts..."}
        </span>
      </div>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select font family">
            <span style={{ fontFamily: value }}>{value}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="max-h-[400px]">
          <ScrollArea className="h-[350px]">
            {Object.entries(fontsByCategory).map(([category, categorizedFonts]) => (
              <SelectGroup key={category}>
                <SelectLabel className="capitalize sticky top-0 bg-white dark:bg-gray-800 z-10 py-2">
                  {category.replace('-', ' ')} ({categorizedFonts.length})
                </SelectLabel>
                {categorizedFonts.map(font => (
                  <SelectItem 
                    key={font.value} 
                    value={font.value}
                    className="py-2"
                  >
                    <span style={{ fontFamily: font.value }}>{font.name}</span>
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FontFamilySelect;

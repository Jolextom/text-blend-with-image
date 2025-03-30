import { fonts, fontsByCategory } from "@/constants/fonts";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { useState, useEffect } from "react";

interface FontFamilySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const FontFamilySelect = ({ value, onChange }: FontFamilySelectProps) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    // Add a simple check to see if fonts are loaded
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      // Fallback for browsers that don't support document.fonts
      setTimeout(() => setFontsLoaded(true), 2000);
    }
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label>Font Family</Label>
        <span className="text-xs text-gray-500">
          {fontsLoaded 
            ? `(${fonts.length} fonts available)` 
            : "Loading fonts..."}
        </span>
      </div>
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select font family" style={{ fontFamily: value }} />
        </SelectTrigger>
        <SelectContent className="max-h-[400px]">
          <ScrollArea className="h-[350px]">
            {Object.entries(fontsByCategory).map(([category, categorizedFonts]) => (
              <SelectGroup key={category}>
                <SelectLabel className="capitalize sticky top-0 bg-white dark:bg-gray-800 z-10 py-2">
                  {category.replace('-', ' ')}
                </SelectLabel>
                {categorizedFonts.map(font => (
                  <SelectItem 
                    key={font.value} 
                    value={font.value}
                    style={{ fontFamily: font.value }}
                    className="py-2"
                  >
                    {font.name}
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

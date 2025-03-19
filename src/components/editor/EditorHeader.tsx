
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Save, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { UserMenu } from "@/components/UserMenu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface EditorHeaderProps {
  image: string | null;
  onSaveImage: () => Promise<void>;
}

const EditorHeader = ({ image, onSaveImage }: EditorHeaderProps) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!image) return;
    
    setIsSaving(true);
    try {
      await onSaveImage();
    } catch (error) {
      console.error("Error saving image:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-background py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-display text-xl font-bold">
            TextBlend
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          {image && (
            <Button 
              variant="outline" 
              onClick={handleSave} 
              disabled={isSaving}
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          )}
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Editor Settings</SheetTitle>
                <SheetDescription>
                  Configure the editor settings here.
                </SheetDescription>
              </SheetHeader>
              {/* Settings content here */}
            </SheetContent>
          </Sheet>
          
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;

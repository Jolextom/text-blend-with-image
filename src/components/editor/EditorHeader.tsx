
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface EditorHeaderProps {
  image: string | null;
  onSaveImage: () => void;
}

const EditorHeader = ({ image, onSaveImage }: EditorHeaderProps) => {
  return (
    <header className="bg-white border-b py-4">
      <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft size={18} />
            </Button>
          </Link>
          <h1 className="font-display text-xl font-bold">TextBlend Editor</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={() => toast.info("1 generation left")}
            className="text-sm"
          >
            1 generation left
          </Button>
          <Button variant="outline" disabled={!image} onClick={onSaveImage}>
            <Download size={16} className="mr-2" /> Save image
          </Button>
        </div>
      </div>
    </header>
  );
};

export default EditorHeader;

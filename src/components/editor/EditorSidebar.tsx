
import { Button } from "@/components/ui/button";
import { Plus, Copy, Trash2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { TextLayer } from "@/types";
import TextEditor from "@/components/TextEditor";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditorSidebarProps {
  image: string | null;
  textLayers: TextLayer[];
  selectedLayerIndex: number | null;
  onAddTextLayer: () => void;
  onUpdateTextLayer: (index: number, properties: Partial<TextLayer>) => void;
  onDuplicateTextLayer: (index: number) => void;
  onRemoveTextLayer: (index: number) => void;
}

const EditorSidebar = ({
  image,
  textLayers,
  selectedLayerIndex,
  onAddTextLayer,
  onUpdateTextLayer,
  onDuplicateTextLayer,
  onRemoveTextLayer
}: EditorSidebarProps) => {
  const selectedLayer = selectedLayerIndex !== null ? textLayers[selectedLayerIndex] : null;

  return (
    <div className="bg-white border-l h-full">
      <ScrollArea className="h-full">
        <div className="p-6">
          {image ? (
            <>
              <div className="mb-8">
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  onClick={onAddTextLayer}
                >
                  <Plus size={16} className="mr-2" /> Add New Text Set
                </Button>
              </div>

              {textLayers.length > 0 && selectedLayer ? (
                <div className="space-y-6">
                  <TextEditor 
                    layer={selectedLayer}
                    onChange={(props) => onUpdateTextLayer(selectedLayerIndex!, props)}
                  />
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="font-medium mb-2">Position Text</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Drag text to position, or use arrow keys for fine control
                    </p>
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                      <ArrowUp size={16} /> <ArrowDown size={16} /> <ArrowLeft size={16} /> <ArrowRight size={16} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <Button 
                      variant="outline"
                      onClick={() => onDuplicateTextLayer(selectedLayerIndex!)}
                    >
                      <Copy size={16} className="mr-2" /> Duplicate Text Set
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => onRemoveTextLayer(selectedLayerIndex!)}
                    >
                      <Trash2 size={16} className="mr-2" /> Remove Text Set
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">Add a text layer to start editing</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl font-medium mb-4">Welcome, get started by uploading an image!</p>
              <p className="text-gray-500">Upload an image to begin adding text</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditorSidebar;

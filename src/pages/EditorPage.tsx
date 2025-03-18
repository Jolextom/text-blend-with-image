
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Copy, Download, Upload, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import TextEditor from "@/components/TextEditor";
import ImageUploader from "@/components/ImageUploader";
import EditorCanvas from "@/components/EditorCanvas";
import { TextLayer } from "@/types";
import html2canvas from "html2canvas";

const EditorPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [textLayers, setTextLayers] = useState<TextLayer[]>([]);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (image && textLayers.length === 0) {
      addNewTextLayer();
    }
  }, [image]);

  const addNewTextLayer = () => {
    const newLayer: TextLayer = {
      id: Date.now().toString(),
      text: "edit",
      fontFamily: "Inter",
      fontSize: 60,
      fontWeight: 700,
      color: "#ffffff",
      x: 0,
      y: 0,
      opacity: 1,
      rotation: 0,
      horizontalTilt: 0,
      verticalTilt: 0,
      blendMode: "normal",
    };
    
    setTextLayers([...textLayers, newLayer]);
    setSelectedLayerIndex(textLayers.length);
    toast.success("New text layer added");
  };

  const updateTextLayer = (index: number, properties: Partial<TextLayer>) => {
    const updatedLayers = [...textLayers];
    updatedLayers[index] = { ...updatedLayers[index], ...properties };
    setTextLayers(updatedLayers);
  };

  const duplicateTextLayer = (index: number) => {
    const layerToDuplicate = textLayers[index];
    const newLayer = {
      ...layerToDuplicate,
      id: Date.now().toString(),
      x: layerToDuplicate.x + 20,
      y: layerToDuplicate.y + 20,
    };
    
    setTextLayers([...textLayers, newLayer]);
    setSelectedLayerIndex(textLayers.length);
    toast.success("Text layer duplicated");
  };

  const removeTextLayer = (index: number) => {
    const updatedLayers = textLayers.filter((_, i) => i !== index);
    setTextLayers(updatedLayers);
    
    if (selectedLayerIndex === index) {
      setSelectedLayerIndex(updatedLayers.length > 0 ? 0 : null);
    } else if (selectedLayerIndex !== null && selectedLayerIndex > index) {
      setSelectedLayerIndex(selectedLayerIndex - 1);
    }
    
    toast.success("Text layer removed");
  };

  const handleImageUpload = (imageUrl: string) => {
    setImage(imageUrl);
    toast.success("Image uploaded successfully");
  };

  const handleSaveImage = async () => {
    if (!canvasRef.current || !image) return;
    
    try {
      // Create a higher quality clone of the canvas for rendering
      toast.info("Generating image...");
      
      // Clone the node and position it offscreen
      const canvasClone = canvasRef.current.cloneNode(true) as HTMLElement;
      canvasClone.style.position = 'absolute';
      canvasClone.style.left = '-9999px';
      canvasClone.style.top = '-9999px';
      document.body.appendChild(canvasClone);
      
      // Force browser to calculate layout
      void canvasClone.offsetWidth;
      
      // Get all text layers and ensure blend modes are properly set
      const textElements = canvasClone.querySelectorAll('[data-text-layer="true"]');
      textElements.forEach((el) => {
        const element = el as HTMLElement;
        const blendMode = element.getAttribute('data-blend-mode') || 'normal';
        // Explicitly set the mix-blend-mode to ensure it's applied
        element.style.mixBlendMode = blendMode;
      });
      
      // Capture the image with proper blend modes
      const canvas = await html2canvas(canvasClone, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 3, // Higher scale for better quality
        logging: false,
        onclone: (documentClone) => {
          // Additional processing in the cloned document
          const clonedTextElements = documentClone.querySelectorAll('[data-text-layer="true"]');
          clonedTextElements.forEach((el) => {
            const element = el as HTMLElement;
            const blendMode = element.getAttribute('data-blend-mode') || 'normal';
            element.style.mixBlendMode = blendMode;
          });
        }
      });
      
      // Clean up the DOM
      document.body.removeChild(canvasClone);
      
      // Create download link
      const link = document.createElement('a');
      link.download = `textblend-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast.success("Image downloaded successfully");
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Failed to download image");
    }
  };

  const selectedLayer = selectedLayerIndex !== null ? textLayers[selectedLayerIndex] : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
            <Button variant="outline" disabled={!image} onClick={handleSaveImage}>
              <Download size={16} className="mr-2" /> Save image
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex md:flex-row flex-col">
        <div className="w-full md:w-3/5 p-6 flex items-center justify-center min-h-[300px]">
          {!image ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <div ref={canvasRef} className="relative border rounded-lg overflow-hidden shadow-md bg-white">
              <EditorCanvas 
                image={image} 
                textLayers={textLayers} 
                selectedLayerIndex={selectedLayerIndex}
                onSelectLayer={setSelectedLayerIndex}
                onUpdateLayer={updateTextLayer}
              />
            </div>
          )}
        </div>

        <div className="w-full md:w-2/5 bg-white border-l p-6 overflow-y-auto">
          {image ? (
            <>
              <div className="mb-8">
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  onClick={addNewTextLayer}
                >
                  <Plus size={16} className="mr-2" /> Add New Text Set
                </Button>
              </div>

              {textLayers.length > 0 && selectedLayer ? (
                <div className="space-y-6">
                  <TextEditor 
                    layer={selectedLayer}
                    onChange={(props) => updateTextLayer(selectedLayerIndex!, props)}
                  />

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <Button 
                      variant="outline"
                      onClick={() => duplicateTextLayer(selectedLayerIndex!)}
                    >
                      <Copy size={16} className="mr-2" /> Duplicate Text Set
                    </Button>
                    <Button 
                      variant="destructive"
                      onClick={() => removeTextLayer(selectedLayerIndex!)}
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
      </main>
    </div>
  );
};

export default EditorPage;

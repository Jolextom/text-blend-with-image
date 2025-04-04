
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import ImageUploader from "@/components/ImageUploader";
import EditorCanvas from "@/components/EditorCanvas";
import { TextLayer } from "@/types";
import EditorHeader from "@/components/editor/EditorHeader";
import EditorSidebar from "@/components/editor/EditorSidebar";
import { exportCanvasToImage } from "@/components/editor/ImageExporter";
import { preloadFonts } from "@/components/canvas/canvasUtils";

const EditorPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [textLayers, setTextLayers] = useState<TextLayer[]>([]);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await preloadFonts();
        setFontsLoaded(true);
        console.log('All fonts loaded in EditorPage');
      } catch (error) {
        console.error('Error loading fonts:', error);
        // Still set to true to not block the UI
        setFontsLoaded(true);
      }
    };
    
    loadFonts();
  }, []);

  useEffect(() => {
    if (image && textLayers.length === 0) {
      addNewTextLayer();
    }
  }, [image]);

  const addNewTextLayer = () => {
    const newLayer: TextLayer = {
      id: Date.now().toString(),
      text: "edit me",
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
      x: layerToDuplicate.x + 0.05,
      y: layerToDuplicate.y + 0.05,
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
    if (!canvasRef.current) {
      toast.error("Canvas reference is not available");
      return;
    }
    
    try {
      await exportCanvasToImage(canvasRef.current);
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error("Failed to save image");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <EditorHeader 
        image={image}
        onSaveImage={handleSaveImage}
      />

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden">
        <div className="w-full md:w-3/5 p-6 flex items-center justify-center overflow-auto">
          <div className="sticky top-0">
            {!image ? (
              <ImageUploader onImageUpload={handleImageUpload} />
            ) : (
              <div ref={canvasRef} className="relative overflow-hidden border border-gray-200 rounded-lg shadow-md">
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
        </div>

        <div className="w-full md:w-2/5 h-full overflow-y-auto">
          <EditorSidebar
            image={image}
            textLayers={textLayers}
            selectedLayerIndex={selectedLayerIndex}
            onAddTextLayer={addNewTextLayer}
            onUpdateTextLayer={updateTextLayer}
            onDuplicateTextLayer={duplicateTextLayer}
            onRemoveTextLayer={removeTextLayer}
          />
        </div>
      </main>
    </div>
  );
};

export default EditorPage;

import { useEffect } from "react";
import { toast } from "sonner";
import ImageUploader from "@/components/ImageUploader";
import EditorCanvas from "@/components/EditorCanvas";
import { TextLayer } from "@/types";
import EditorHeader from "@/components/editor/EditorHeader";
import EditorSidebar from "@/components/editor/EditorSidebar";
import { exportCanvasToImage } from "@/components/editor/ImageExporter";
import { fonts } from "@/constants";

const EditorPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [textLayers, setTextLayers] = useState<TextLayer[]>([]);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // Load Google Fonts
  useEffect(() => {
    // Create a single combined stylesheet link with all font families
    const fontLinks = getGoogleFontsLinks();
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = fontLinks[0];
    linkElement.id = 'google-fonts-link';
    
    // Remove any existing font link
    const existingLink = document.getElementById('google-fonts-link');
    if (existingLink) {
      document.head.removeChild(existingLink);
    }
    
    // Add the new link
    document.head.appendChild(linkElement);
    
    // Preload all fonts for better performance
    const preloadFonts = async () => {
      const fontPromises = fonts
        .filter(font => !font.value.includes(','))
        .map(font => document.fonts.load(`1em "${font.name}"`));
      
      await Promise.all(fontPromises);
    };
    
    preloadFonts().catch(console.error);
    
    // Cleanup function
    return () => {
      const link = document.getElementById('google-fonts-link');
      if (link) {
        document.head.removeChild(link);
      }
    };
  }, []); // Only run once on component mount

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
    await exportCanvasToImage(canvasRef);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <EditorHeader 
        image={image}
        onSaveImage={handleSaveImage}
      />

      <main className="flex-grow flex md:flex-row flex-col">
        <div className="w-full md:w-3/5 p-6 flex items-center justify-center min-h-[300px]">
          {!image ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <div ref={canvasRef} className="relative overflow-hidden">
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

        <EditorSidebar
          image={image}
          textLayers={textLayers}
          selectedLayerIndex={selectedLayerIndex}
          onAddTextLayer={addNewTextLayer}
          onUpdateTextLayer={updateTextLayer}
          onDuplicateTextLayer={duplicateTextLayer}
          onRemoveTextLayer={removeTextLayer}
        />
      </main>
    </div>
  );
};

export default EditorPage;


import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUploader = ({ onImageUpload }: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageFile(e.target.files[0]);
    }
  };

  const handleImageFile = (file: File) => {
    if (!file.type.match('image.*')) {
      toast.error('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        onImageUpload(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-10 w-full max-w-lg h-80 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
        isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      <Upload size={40} className="text-gray-400 mb-4" />
      <h3 className="text-lg font-medium mb-2">Upload Image</h3>
      <p className="text-gray-500 mb-6">Drag and drop an image, or click to browse</p>
      <Button variant="outline">Select Image</Button>
      <input 
        id="file-upload" 
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileInput} 
      />
    </div>
  );
};

export default ImageUploader;

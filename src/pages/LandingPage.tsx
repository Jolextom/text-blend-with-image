
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Type, Image as ImageIcon, Sliders } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b py-4">
        <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="font-display text-2xl font-bold">TextBlend</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/editor">
              <Button variant="outline">Try Editor</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="font-display text-5xl sm:text-6xl font-bold leading-tight">
                  Blend Text with Images Seamlessly
                </h1>
                <p className="text-lg text-gray-600 max-w-lg">
                  Create stunning visuals by blending text with your images. Perfect for social media, 
                  marketing materials, or creative projects.
                </p>
                <div className="pt-4">
                  <Link to="/editor">
                    <Button size="lg" className="mr-4">
                      Get Started <ChevronRight size={16} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl bg-white p-3">
                <img 
                  src="/lovable-uploads/ed4c2994-4582-4afb-a114-bed75ceeadaf.png" 
                  alt="TextBlend Editor Preview" 
                  className="rounded border w-full h-auto" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">Features</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Everything you need to create professional text overlays on your images
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Type size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Text Customization</h3>
                <p className="text-gray-600">
                  Choose from multiple fonts, adjust size, position, opacity, and more for perfect text placement.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <ImageIcon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Image Uploads</h3>
                <p className="text-gray-600">
                  Upload your own images and instantly start adding text overlays with our intuitive editor.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Sliders size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fine Controls</h3>
                <p className="text-gray-600">
                  Precise adjustment controls for positioning, rotation, tilt, and text styling for professional results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container max-w-7xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">Ready to create your own text blends?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Start creating beautiful text and image compositions in just a few clicks.
            </p>
            <Link to="/editor">
              <Button size="lg" variant="secondary">
                Try the Editor Now
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-10 bg-gray-50">
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} TextBlend. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

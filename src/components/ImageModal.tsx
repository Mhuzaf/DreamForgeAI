
import { useState } from 'react';
import { X, Download, Heart, Share, ZoomIn, ZoomOut } from 'lucide-react';
import { Dialog, DialogContent, DialogClose } from './ui/dialog';
import { Button } from './ui/button';

interface ImageModalProps {
  image: {
    id: string;
    url: string;
    prompt: string;
    timestamp: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal = ({ image, isOpen, onClose }: ImageModalProps) => {
  const [zoom, setZoom] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!image) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `dreamforge-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'DreamForge AI Generated Image',
          text: `Check out this AI-generated image: "${image.prompt}"`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard');
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom / 1.2, 0.5));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gray-900 border-gray-700 p-0 overflow-hidden">
        <div className="relative">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDownload}
                  className="text-white hover:bg-white/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className={`${
                    isFavorited 
                      ? 'text-red-500 hover:text-red-400' 
                      : 'text-white hover:text-white/80'
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
                  {isFavorited ? 'Favorited' : 'Favorite'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleShare}
                  className="text-white hover:bg-white/10"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleZoomOut}
                  className="text-white hover:bg-white/10"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-white text-sm min-w-[60px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleZoomIn}
                  className="text-white hover:bg-white/10"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Image container */}
          <div className="flex items-center justify-center min-h-[400px] max-h-[70vh] overflow-auto bg-black">
            <img
              src={image.url}
              alt={image.prompt}
              className="max-w-full max-h-full object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="text-white">
              <p className="font-medium mb-1">{image.prompt}</p>
              <p className="text-gray-300 text-sm">{image.timestamp}</p>
            </div>
          </div>

          {/* Close button */}
          <DialogClose className="absolute top-4 right-4 text-white hover:bg-white/10 rounded-full p-2 transition-colors">
            <X className="w-5 h-5" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;

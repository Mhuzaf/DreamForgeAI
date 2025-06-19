
import { useState } from 'react';
import { Heart, Download, Share, RefreshCcw } from 'lucide-react';
import { Button } from './ui/button';

interface ImageCardProps {
  image: {
    id: string;
    url: string;
    prompt: string;
    timestamp: string;
  };
  onImageClick: (image: any) => void;
  onRegenerate: (prompt: string) => void;
}

const ImageCard = ({ image, onImageClick, onRegenerate }: ImageCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = image.url;
    link.download = `dreamforge-${image.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard');
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const handleRegenerate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRegenerate(image.prompt);
  };

  return (
    <div
      className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onImageClick(image)}
    >
      <div className="aspect-square relative">
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleDownload}
              className="bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-600"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleRegenerate}
              className="bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-600"
            >
              <RefreshCcw className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleShare}
              className="bg-gray-800/80 hover:bg-gray-700/80 text-white border-gray-600"
            >
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Favorite button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={handleFavorite}
          className={`absolute top-2 right-2 transition-all duration-200 ${
            isFavorited 
              ? 'text-red-500 hover:text-red-400' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
        </Button>
      </div>

      {/* Image info */}
      <div className="p-3">
        <p className="text-sm text-gray-300 truncate">{image.prompt}</p>
        <p className="text-xs text-gray-500 mt-1">{image.timestamp}</p>
      </div>
    </div>
  );
};

export default ImageCard;


import { useState } from 'react';
import ImageCard from './ImageCard';
import ImageModal from './ImageModal';

interface GalleryImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
}

interface GalleryProps {
  images: GalleryImage[];
  onRegenerate: (prompt: string) => void;
}

const Gallery = ({ images, onRegenerate }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Creations
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            {images.length} image{images.length !== 1 ? 's' : ''} generated
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              image={image}
              onImageClick={handleImageClick}
              onRegenerate={onRegenerate}
            />
          ))}
        </div>
      </div>

      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default Gallery;

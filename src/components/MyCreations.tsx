
import { useState } from 'react';
import { Download, Trash2, Edit2, Calendar, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import ImageModal from './ImageModal';

interface Creation {
  id: string;
  url: string;
  prompt: string;
  style: string;
  timestamp: string;
  name?: string;
}

// Mock data for demonstration
const mockCreations: Creation[] = [
  {
    id: '1',
    url: '/placeholder.svg',
    prompt: 'A majestic dragon soaring through clouds',
    style: 'Fantasy',
    timestamp: '2024-01-15',
    name: 'Dragon Sky'
  },
  {
    id: '2',
    url: '/placeholder.svg',
    prompt: 'Cyberpunk city at night with neon lights',
    style: 'Cyberpunk',
    timestamp: '2024-01-14',
    name: 'Neon Metropolis'
  },
  {
    id: '3',
    url: '/placeholder.svg',
    prompt: 'Peaceful landscape with mountains and lakes',
    style: 'Realistic',
    timestamp: '2024-01-13'
  }
];

const MyCreations = () => {
  const [creations, setCreations] = useState<Creation[]>(mockCreations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<Creation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const filteredCreations = creations.filter(creation =>
    creation.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    creation.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setCreations(creations.filter(creation => creation.id !== id));
  };

  const handleRename = (id: string, newName: string) => {
    setCreations(creations.map(creation =>
      creation.id === id ? { ...creation, name: newName } : creation
    ));
    setEditingId(null);
    setEditName('');
  };

  const handleDownload = (creation: Creation) => {
    const link = document.createElement('a');
    link.href = creation.url;
    link.download = `${creation.name || 'creation'}-${creation.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageClick = (creation: Creation) => {
    setSelectedImage(creation);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const startEdit = (creation: Creation) => {
    setEditingId(creation.id);
    setEditName(creation.name || creation.prompt.slice(0, 30));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Creations
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            {creations.length} image{creations.length !== 1 ? 's' : ''} in your gallery
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search your creations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Creations Grid */}
        {filteredCreations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {searchTerm ? 'No creations found matching your search.' : 'No creations yet. Start generating!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCreations.map((creation) => (
              <div
                key={creation.id}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <div
                  className="aspect-square relative cursor-pointer group"
                  onClick={() => handleImageClick(creation)}
                >
                  <img
                    src={creation.url}
                    alt={creation.name || creation.prompt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-sm text-center px-4">
                      Click to view full size
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  {editingId === creation.id ? (
                    <div className="space-y-2">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white text-sm"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleRename(creation.id, editName);
                          }
                        }}
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleRename(creation.id, editName)}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs"
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-white font-medium text-sm mb-1 truncate">
                        {creation.name || 'Untitled'}
                      </h3>
                      <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                        {creation.prompt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {creation.timestamp}
                        </span>
                        <span className="bg-gray-700 px-2 py-1 rounded">
                          {creation.style}
                        </span>
                      </div>
                    </>
                  )}

                  {editingId !== creation.id && (
                    <div className="flex justify-between">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => startEdit(creation)}
                          className="text-gray-400 hover:text-white hover:bg-gray-700 p-1 h-auto"
                        >
                          <Edit2 className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownload(creation)}
                          className="text-gray-400 hover:text-white hover:bg-gray-700 p-1 h-auto"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(creation.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-1 h-auto"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ImageModal
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MyCreations;

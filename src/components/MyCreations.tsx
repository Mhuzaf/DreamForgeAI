
import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Heart, Download, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';

interface Creation {
  id: string;
  title: string;
  description: string;
  image_url: string;
  prompt_used: string;
  is_public: boolean;
  created_at: string;
  likes_count: number;
}

const MyCreations = () => {
  const [creations, setCreations] = useState<Creation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchCreations();
  }, []);

  const fetchCreations = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_posts')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCreations(data || []);
    } catch (error) {
      console.error('Error fetching creations:', error);
      toast({
        title: "Error",
        description: "Failed to load your creations.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id: string, currentVisibility: boolean) => {
    try {
      const { error } = await supabase
        .from('user_posts')
        .update({ is_public: !currentVisibility })
        .eq('id', id);

      if (error) throw error;

      setCreations(prev => 
        prev.map(creation => 
          creation.id === id 
            ? { ...creation, is_public: !currentVisibility }
            : creation
        )
      );

      toast({
        title: "Visibility updated",
        description: `Creation is now ${!currentVisibility ? 'public' : 'private'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update visibility.",
        variant: "destructive"
      });
    }
  };

  const deleteCreation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCreations(prev => prev.filter(creation => creation.id !== id));

      toast({
        title: "Creation deleted",
        description: "Your creation has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete creation.",
        variant: "destructive"
      });
    }
  };

  const downloadImage = async (imageUrl: string, title: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download image.",
        variant: "destructive"
      });
    }
  };

  const filteredCreations = creations.filter(creation =>
    creation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    creation.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading your creations...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Creations
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Your personal gallery of AI-generated masterpieces
          </p>
        </div>

        {creations.length > 0 && (
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search your creations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        )}

        {filteredCreations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {creations.length === 0 ? "No creations yet" : "No matching creations"}
            </h3>
            <p className="text-gray-400 mb-6">
              {creations.length === 0 
                ? "Start creating amazing AI art to see your gallery come to life!"
                : "Try adjusting your search terms."
              }
            </p>
            {creations.length === 0 && (
              <Button
                onClick={() => document.querySelector('section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-2 rounded-lg font-medium transition-all duration-300"
              >
                Create Your First Artwork
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreations.map((creation) => (
              <Card key={creation.id} className="bg-gray-800 border-gray-700 overflow-hidden group hover:border-purple-500 transition-colors duration-300">
                <div className="relative">
                  <div className="aspect-square bg-gray-700 flex items-center justify-center overflow-hidden">
                    {creation.image_url ? (
                      <img
                        src={creation.image_url}
                        alt={creation.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-500">No image</div>
                    )}
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      onClick={() => toggleVisibility(creation.id, creation.is_public)}
                      className="p-1 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                    >
                      {creation.is_public ? (
                        <Eye className="w-4 h-4 text-white" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="text-white font-semibold mb-2 truncate">{creation.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{creation.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{new Date(creation.created_at).toLocaleDateString()}</span>
                    <span className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{creation.likes_count || 0}</span>
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      onClick={() => downloadImage(creation.image_url, creation.title)}
                      size="sm"
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => deleteCreation(creation.id)}
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyCreations;

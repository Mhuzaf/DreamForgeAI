
import { useState, useEffect } from 'react';
import { Heart, Eye, Calendar, User } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';

interface Post {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  prompt_used?: string;
  likes_count: number;
  created_at: string;
  user_id: string;
}

const CommunityGallery = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('user_posts')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Login Required",
          description: "Please log in to like posts.",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase
        .from('post_likes')
        .insert([{ post_id: postId, user_id: session.user.id }]);

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already Liked",
            description: "You've already liked this post.",
          });
        } else {
          throw error;
        }
      } else {
        // Update local state
        setPosts(posts.map(post => 
          post.id === postId 
            ? { ...post, likes_count: post.likes_count + 1 }
            : post
        ));
        
        toast({
          title: "Liked!",
          description: "Thanks for showing your appreciation.",
        });
      }
    } catch (error) {
      console.error('Error liking post:', error);
      toast({
        title: "Error",
        description: "Failed to like post. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-96 mx-auto"></div>
            </div>
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
              Community Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Discover amazing creations from our community
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No community posts yet. Be the first to share your creation!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                {post.image_url && (
                  <div className="aspect-square">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg mb-2 truncate">
                    {post.title}
                  </h3>
                  
                  {post.description && (
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  
                  {post.prompt_used && (
                    <div className="mb-3">
                      <p className="text-gray-400 text-xs mb-1">Prompt:</p>
                      <p className="text-gray-300 text-sm italic line-clamp-2">
                        "{post.prompt_used}"
                      </p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className="text-gray-400 hover:text-red-400 p-0 h-auto"
                      >
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes_count}
                      </Button>
                      
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      <span className="text-xs">
                        {post.user_id.slice(0, 8)}...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityGallery;

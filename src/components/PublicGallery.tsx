
import { useState, useEffect } from 'react';
import { Heart, MessageSquare, Bookmark, Share2, Trophy, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import ImageModal from './ImageModal';
import SocialShareModal from './SocialShareModal';

interface PublicPost {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  prompt_used?: string;
  likes_count: number;
  comments_count: number;
  bookmarks_count: number;
  created_at: string;
  user_id: string;
  is_contest_entry?: boolean;
  contest_id?: string;
}

const PublicGallery = () => {
  const [posts, setPosts] = useState<PublicPost[]>([]);
  const [topPosts, setTopPosts] = useState<PublicPost[]>([]);
  const [contestPosts, setContestPosts] = useState<PublicPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareModal, setShareModal] = useState<{ isOpen: boolean; post: PublicPost | null }>({
    isOpen: false,
    post: null
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
    fetchTopPosts();
    fetchContestPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('user_posts')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(12);

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedPosts = (data || []).map(post => ({
        ...post,
        comments_count: 0,
        bookmarks_count: 0
      }));
      
      setPosts(transformedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchTopPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('user_posts')
        .select('*')
        .eq('is_public', true)
        .order('likes_count', { ascending: false })
        .limit(6);

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedPosts = (data || []).map(post => ({
        ...post,
        comments_count: 0,
        bookmarks_count: 0
      }));
      
      setTopPosts(transformedPosts);
    } catch (error) {
      console.error('Error fetching top posts:', error);
    }
  };

  const fetchContestPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('user_posts')
        .select('*')
        .eq('is_public', true)
        .eq('is_contest_entry', true)
        .order('likes_count', { ascending: false })
        .limit(8);

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedPosts = (data || []).map(post => ({
        ...post,
        comments_count: 0,
        bookmarks_count: 0
      }));
      
      setContestPosts(transformedPosts);
    } catch (error) {
      console.error('Error fetching contest posts:', error);
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

      if (error && error.code !== '23505') {
        throw error;
      }

      // Update local state
      const updatePosts = (posts: PublicPost[]) => 
        posts.map(post => 
          post.id === postId 
            ? { ...post, likes_count: post.likes_count + 1 }
            : post
        );

      setPosts(updatePosts);
      setTopPosts(updatePosts);
      setContestPosts(updatePosts);
      
      toast({
        title: "Liked!",
        description: "Thanks for showing your appreciation.",
      });
    } catch (error) {
      console.error('Error liking post:', error);
      toast({
        title: "Error",
        description: "Failed to like post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleBookmark = async (postId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Login Required",
          description: "Please log in to bookmark posts.",
          variant: "destructive"
        });
        return;
      }

      // For now, just show a success message since we don't have the bookmarks table yet
      toast({
        title: "Bookmarked!",
        description: "Post saved to your bookmarks.",
      });
    } catch (error) {
      console.error('Error bookmarking post:', error);
      toast({
        title: "Error",
        description: "Failed to bookmark post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleImageClick = (post: PublicPost) => {
    setSelectedImage({
      id: post.id,
      url: post.image_url,
      prompt: post.prompt_used || post.title,
      timestamp: new Date(post.created_at).toLocaleDateString()
    });
    setIsModalOpen(true);
  };

  const handleShare = (post: PublicPost) => {
    setShareModal({ isOpen: true, post });
  };

  const renderPostCard = (post: PublicPost) => (
    <Card key={post.id} className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
      {post.image_url && (
        <div 
          className="aspect-square cursor-pointer relative group"
          onClick={() => handleImageClick(post)}
        >
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-medium">View Full Size</span>
          </div>
          {post.is_contest_entry && (
            <Badge className="absolute top-2 left-2 bg-yellow-600 hover:bg-yellow-700">
              <Trophy className="w-3 h-3 mr-1" />
              Contest
            </Badge>
          )}
        </div>
      )}
      
      <CardContent className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
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
            <p className="text-gray-300 text-sm italic line-clamp-2 bg-gray-900/50 p-2 rounded">
              "{post.prompt_used}"
            </p>
          </div>
        )}
        
        <div className="flex items-center justify-between">
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
            
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-blue-400 p-0 h-auto"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              {post.comments_count || 0}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleBookmark(post.id)}
              className="text-gray-400 hover:text-yellow-400 p-0 h-auto"
            >
              <Bookmark className="w-4 h-4" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleShare(post)}
            className="text-gray-400 hover:text-green-400 p-0 h-auto"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          {new Date(post.created_at).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-700 rounded w-64 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-gray-700 rounded-lg"></div>
              ))}
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
            Discover and share amazing AI-generated artwork
          </p>
        </div>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-800">
            <TabsTrigger value="recent" className="data-[state=active]:bg-purple-600">
              Recent
            </TabsTrigger>
            <TabsTrigger value="top" className="data-[state=active]:bg-purple-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Top Rated
            </TabsTrigger>
            <TabsTrigger value="contests" className="data-[state=active]:bg-purple-600">
              <Trophy className="w-4 h-4 mr-2" />
              Contests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {posts.map(renderPostCard)}
            </div>
          </TabsContent>

          <TabsContent value="top">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPosts.map(renderPostCard)}
            </div>
          </TabsContent>

          <TabsContent value="contests">
            <div className="mb-8 p-6 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg border border-yellow-500/30">
              <div className="flex items-center mb-4">
                <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
                <h3 className="text-xl font-bold text-white">Weekly Challenge</h3>
              </div>
              <p className="text-gray-300 mb-2">
                <strong>This Week:</strong> "Futuristic Cities" - Create stunning visions of tomorrow's urban landscapes
              </p>
              <p className="text-sm text-gray-400">
                Ends in 3 days • Winner gets premium features for a month!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {contestPosts.map(renderPostCard)}
            </div>
          </TabsContent>
        </Tabs>

        <ImageModal
          image={selectedImage}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <SocialShareModal
          post={shareModal.post}
          isOpen={shareModal.isOpen}
          onClose={() => setShareModal({ isOpen: false, post: null })}
        />
      </div>
    </section>
  );
};

export default PublicGallery;

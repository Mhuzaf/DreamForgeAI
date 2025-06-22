
import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Bookmark, Share } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { supabase } from '../integrations/supabase/client';
import { useToast } from '../hooks/use-toast';
import SocialShareModal from './SocialShareModal';

interface PublicPost {
  id: string;
  title: string;
  prompt: string;
  image_url: string;
  likes_count: number;
  comments_count: number;
  bookmarks_count: number;
  created_at: string;
  user_id: string;
  is_public: boolean;
  is_contest_entry?: boolean;
}

const PublicGallery = () => {
  const [posts, setPosts] = useState<PublicPost[]>([]);
  const [topPosts, setTopPosts] = useState<PublicPost[]>([]);
  const [contestPosts, setContestPosts] = useState<PublicPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<PublicPost | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
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
      
      const transformedPosts: PublicPost[] = (data || []).map(post => ({
        id: post.id,
        title: post.title || 'Untitled',
        prompt: post.prompt_used || '',
        image_url: post.image_url || '',
        likes_count: post.likes_count || 0,
        comments_count: 0,
        bookmarks_count: 0,
        created_at: post.created_at,
        user_id: post.user_id,
        is_public: post.is_public,
        is_contest_entry: post.is_contest_entry || false
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
      
      const transformedPosts: PublicPost[] = (data || []).map(post => ({
        id: post.id,
        title: post.title || 'Untitled',
        prompt: post.prompt_used || '',
        image_url: post.image_url || '',
        likes_count: post.likes_count || 0,
        comments_count: 0,
        bookmarks_count: 0,
        created_at: post.created_at,
        user_id: post.user_id,
        is_public: post.is_public,
        is_contest_entry: post.is_contest_entry || false
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
      
      const transformedPosts: PublicPost[] = (data || []).map(post => ({
        id: post.id,
        title: post.title || 'Untitled',
        prompt: post.prompt_used || '',
        image_url: post.image_url || '',
        likes_count: post.likes_count || 0,
        comments_count: 0,
        bookmarks_count: 0,
        created_at: post.created_at,
        user_id: post.user_id,
        is_public: post.is_public,
        is_contest_entry: post.is_contest_entry || false
      }));
      
      setContestPosts(transformedPosts);
    } catch (error) {
      console.error('Error fetching contest posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like posts.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_posts')
        .update({ likes_count: posts.find(p => p.id === postId)?.likes_count || 0 + 1 })
        .eq('id', postId);

      if (error) throw error;
      
      toast({
        title: "Liked!",
        description: "Post liked successfully.",
      });
      
      fetchPosts();
      fetchTopPosts();
    } catch (error) {
      console.error('Error liking post:', error);
      toast({
        title: "Error",
        description: "Failed to like post.",
        variant: "destructive",
      });
    }
  };

  const handleBookmark = async (postId: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Sign in required",
        description: "Please sign in to bookmark posts.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bookmarked!",
      description: "Post saved to your bookmarks.",
    });
  };

  const handleShare = (post: PublicPost) => {
    setSelectedPost(post);
    setShareModalOpen(true);
  };

  const PostCard = ({ post }: { post: PublicPost }) => (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      <img 
        src={post.image_url} 
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-white font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{post.prompt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleLike(post.id)}
              className="flex items-center space-x-1 text-gray-400 hover:text-red-400 transition-colors"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">{post.likes_count}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{post.comments_count}</span>
            </button>
            <button
              onClick={() => handleBookmark(post.id)}
              className="flex items-center space-x-1 text-gray-400 hover:text-yellow-400 transition-colors"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => handleShare(post)}
            className="text-gray-400 hover:text-green-400 transition-colors"
          >
            <Share className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-white">Loading gallery...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Public Gallery</h1>
        <p className="text-gray-400">Discover amazing AI-generated art from our community</p>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800 border border-gray-700">
          <TabsTrigger value="recent" className="text-gray-300 data-[state=active]:text-white">
            Recent
          </TabsTrigger>
          <TabsTrigger value="top" className="text-gray-300 data-[state=active]:text-white">
            Top Rated
          </TabsTrigger>
          <TabsTrigger value="contest" className="text-gray-300 data-[state=active]:text-white">
            Contest Entries
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="top" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contest" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedPost && (
        <SocialShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          post={selectedPost}
        />
      )}
    </div>
  );
};

export default PublicGallery;

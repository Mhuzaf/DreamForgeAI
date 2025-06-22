
import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

interface Post {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
  prompt_used?: string;
}

interface SocialShareModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const SocialShareModal = ({ post, isOpen, onClose }: SocialShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const [customCaption, setCustomCaption] = useState('');
  const { toast } = useToast();

  const generateHashtags = (prompt: string) => {
    const keywords = prompt.toLowerCase().split(' ').filter(word => word.length > 3);
    const hashtags = keywords.slice(0, 5).map(word => `#${word.replace(/[^a-zA-Z0-9]/g, '')}`);
    return [...hashtags, '#AIArt', '#DreamForgeAI', '#AIGenerated'].join(' ');
  };

  const generateCaption = () => {
    if (!post) return '';
    
    const caption = customCaption || post.description || post.title;
    const hashtags = generateHashtags(post.prompt_used || post.title);
    
    return `${caption}\n\nCreated with DreamForge AI\nPrompt: "${post.prompt_used || post.title}"\n\n${hashtags}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Caption copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const shareToSocial = (platform: string) => {
    if (!post?.image_url) return;
    
    const caption = generateCaption();
    const url = window.location.href;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(caption)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(caption)}`;
        break;
      case 'reddit':
        shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Share2 className="w-5 h-5 mr-2" />
            Share to Social Media
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Custom Caption (Optional)</label>
            <Textarea
              value={customCaption}
              onChange={(e) => setCustomCaption(e.target.value)}
              placeholder={`Add your own caption... (will use "${post.description || post.title}" if empty)`}
              className="bg-gray-900 border-gray-600 text-white resize-none"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Generated Caption & Hashtags</label>
            <div className="relative">
              <Textarea
                value={generateCaption()}
                readOnly
                className="bg-gray-900 border-gray-600 text-white resize-none pr-10"
                rows={6}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(generateCaption())}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => shareToSocial('twitter')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Twitter/X
            </Button>
            <Button
              onClick={() => shareToSocial('facebook')}
              className="bg-blue-700 hover:bg-blue-800 text-white"
            >
              Facebook
            </Button>
            <Button
              onClick={() => shareToSocial('linkedin')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              LinkedIn
            </Button>
            <Button
              onClick={() => shareToSocial('reddit')}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              Reddit
            </Button>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Direct Link</label>
            <div className="flex">
              <Input
                value={window.location.href}
                readOnly
                className="bg-gray-900 border-gray-600 text-white flex-1"
              />
              <Button
                variant="outline"
                onClick={() => copyToClipboard(window.location.href)}
                className="ml-2 border-gray-600 text-gray-300 hover:text-white"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShareModal;


import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { Wand2, Sparkles, Settings, Download, Heart, Share2, Crown } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { generateStabilityImage } from '../services/stabilityAI';
import { useCredits } from '../contexts/CreditsContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useFeatureGate } from '../hooks/useFeatureGate';
import { supabase } from '../integrations/supabase/client';

const PromptInput = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showPrivateOption, setShowPrivateOption] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const { toast } = useToast();
  const { credits, useCredits: consumeCredits } = useCredits();
  const { subscriptionTier } = useSubscription();
  const { featureAccess, checkFeature } = useFeatureGate();

  // Pro plan prompt suggestions
  const promptSuggestions = [
    "A majestic dragon soaring through storm clouds",
    "Cyberpunk city at night with neon lights",
    "Peaceful landscape with mountains and lakes",
    "Abstract art with vibrant colors and geometric shapes",
    "Fantasy castle on a floating island"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what you want to create.",
        variant: "destructive"
      });
      return;
    }

    if (!consumeCredits(1)) {
      toast({
        title: "Not enough credits",
        description: "You need at least 1 credit to generate an image.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const images = await generateStabilityImage({ prompt });
      const imageUrl = images[0]?.url;
      
      if (imageUrl) {
        setGeneratedImage(imageUrl);
        
        // Show private upload option for Pro users
        if (subscriptionTier === 'Pro' || subscriptionTier === 'Studio') {
          setShowPrivateOption(true);
        } else {
          // Auto-upload to public gallery for Community users
          await uploadToGallery(imageUrl, prompt, true);
        }
        
        toast({
          title: "Image generated successfully!",
          description: subscriptionTier === 'Pro' || subscriptionTier === 'Studio' 
            ? "Choose to upload publicly or privately."
            : "Uploaded to public gallery.",
        });
      }
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const uploadToGallery = async (imageUrl: string, prompt: string, isPublic: boolean) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please log in to save your creation.",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase.from('user_posts').insert({
        user_id: session.user.id,
        title: prompt.slice(0, 50) + (prompt.length > 50 ? '...' : ''),
        description: prompt,
        image_url: imageUrl,
        prompt_used: prompt,
        is_public: isPublic,
        created_at: new Date().toISOString()
      });

      if (error) throw error;

      toast({
        title: isPublic ? "Uploaded to public gallery" : "Saved to your creations",
        description: "Your image has been saved successfully.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to save your creation.",
        variant: "destructive"
      });
    }
  };

  const handleUpload = async (isPublic: boolean) => {
    if (generatedImage) {
      await uploadToGallery(generatedImage, prompt, isPublic);
      setShowPrivateOption(false);
      setGeneratedImage(null);
      setPrompt('');
    }
  };

  const useSuggestion = (suggestion: string) => {
    if (checkFeature('hasPromptSuggestions')) {
      setPrompt(suggestion);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Create Your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Masterpiece</span>
          </h2>
          <p className="text-xl text-gray-300">
            Transform your imagination into stunning visual art
          </p>
        </div>

        {/* Pro Plan Prompt Suggestions */}
        {featureAccess.hasPromptSuggestions && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-4 h-4 text-purple-400" />
              <span className="text-purple-400 font-medium">Pro Suggestions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {promptSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => useSuggestion(suggestion)}
                  className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm hover:bg-purple-600/30 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Describe the image you want to create... (e.g., A mystical forest with glowing mushrooms)"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] bg-gray-700 border-gray-600 text-white placeholder-gray-400 resize-none"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">
                      {subscriptionTier === 'Studio' ? 'Unlimited' : `${credits} credits remaining`}
                    </span>
                  </div>
                  {(subscriptionTier === 'Pro' || subscriptionTier === 'Studio') && (
                    <div className="flex items-center space-x-2 text-purple-400">
                      <Crown className="w-4 h-4" />
                      <span className="text-sm">HD Quality • AI Assistant</span>
                    </div>
                  )}
                </div>
                
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim() || (subscriptionTier !== 'Studio' && credits < 1)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Wand2 className="w-4 h-4" />
                      <span>Generate</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Generated Image Display */}
        {generatedImage && (
          <Card className="mt-6 bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="text-center">
                <img
                  src={generatedImage}
                  alt="Generated artwork"
                  className="max-w-full h-auto rounded-lg mx-auto mb-4"
                />
                
                {showPrivateOption ? (
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() => handleUpload(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Upload to Public Gallery
                    </Button>
                    <Button
                      onClick={() => handleUpload(false)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Save Privately
                    </Button>
                  </div>
                ) : (
                  <p className="text-green-400">✓ Uploaded to public gallery</p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default PromptInput;

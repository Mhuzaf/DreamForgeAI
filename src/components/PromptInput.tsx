
import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Wand2, Download, Sparkles } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import AIAssistant from './AIAssistant';
import { useFeatureGate } from '../hooks/useFeatureGate';

const PromptInput = () => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const { toast } = useToast();
  const { checkFeature } = useFeatureGate();

  const styles = [
    { id: 'realistic', name: 'Realistic', modifier: 'photorealistic, highly detailed' },
    { id: 'anime', name: 'Anime', modifier: 'anime style, vibrant colors' },
    { id: 'digital-art', name: 'Digital Art', modifier: 'digital art, clean lines' },
    { id: 'oil-painting', name: 'Oil Painting', modifier: 'oil painting style, brush strokes' },
    { id: 'watercolor', name: 'Watercolor', modifier: 'watercolor painting, soft edges' },
    { id: 'sketch', name: 'Sketch', modifier: 'pencil sketch, black and white' }
  ];

  const buildStyledPrompt = (basePrompt: string, styleId: string) => {
    const style = styles.find(s => s.id === styleId);
    if (style && style.modifier) {
      return `${basePrompt}, ${style.modifier}`;
    }
    return basePrompt;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate an image.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Build the styled prompt
      const styledPrompt = buildStyledPrompt(prompt, selectedStyle);
      
      // Simulate image generation (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated image URL
      setGeneratedImage('/placeholder.svg');
      
      toast({
        title: "Image generated!",
        description: "Your AI-generated image is ready.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = 'generated-image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handlePromptSuggestion = (suggestedPrompt: string) => {
    setPrompt(suggestedPrompt);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create with AI
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Transform your ideas into stunning visuals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Controls */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Describe Your Vision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A majestic dragon soaring through clouds above a medieval castle..."
                  className="min-h-[120px] bg-gray-900/80 border-gray-600 text-white resize-none"
                  disabled={isGenerating}
                />

                {/* Style Selection */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">Art Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    {styles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedStyle === style.id
                            ? 'bg-purple-600 border-purple-500 text-white'
                            : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                        }`}
                        disabled={isGenerating}
                      >
                        {style.name}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3"
                >
                  {isGenerating ? (
                    <>
                      <Wand2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* AI Assistant - Only for Pro users */}
            {checkFeature('canUseAIBot', false) && (
              <AIAssistant 
                onPromptSuggestion={handlePromptSuggestion}
                currentPrompt={prompt}
              />
            )}
          </div>

          {/* Right Column - Generated Image */}
          <div>
            <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Generated Image
                  {generatedImage && (
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-gray-900/80 rounded-lg flex items-center justify-center">
                  {isGenerating ? (
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-400">Creating your masterpiece...</p>
                    </div>
                  ) : generatedImage ? (
                    <img 
                      src={generatedImage} 
                      alt="Generated artwork" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <Sparkles className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Your generated image will appear here</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptInput;

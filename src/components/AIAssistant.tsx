
import { useState } from 'react';
import { Bot, Wand2, Lightbulb, HelpCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';

interface AIAssistantProps {
  onPromptSuggestion: (prompt: string) => void;
  currentPrompt: string;
}

const AIAssistant = ({ onPromptSuggestion, currentPrompt }: AIAssistantProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [userGoal, setUserGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const promptTemplates = {
    'mobile-game': {
      title: 'Mobile Game Background',
      prompts: [
        'Vibrant cartoon-style fantasy forest with magical glowing trees, perfect for mobile RPG game background, bright colors, whimsical atmosphere',
        'Futuristic cyber city skyline with neon lights, holographic buildings, dark purple and blue tones, mobile game UI friendly',
        'Peaceful underwater coral reef scene with colorful fish, soft lighting, mobile-optimized composition'
      ]
    },
    'logo-design': {
      title: 'Logo Design',
      prompts: [
        'Minimalist geometric logo design, clean lines, modern typography, professional business look, vector-style',
        'Creative tech startup logo with abstract geometric shapes, gradient colors, innovative and futuristic feel',
        'Elegant luxury brand logo with gold accents, sophisticated typography, premium quality aesthetic'
      ]
    },
    'character-art': {
      title: 'Character Art',
      prompts: [
        'Anime-style character portrait, detailed facial features, vibrant colors, fantasy warrior with magical armor',
        'Realistic portrait of a cyberpunk character with glowing cybernetic implants, neon-lit urban background',
        'Cartoon mascot character, friendly expression, bright colors, suitable for children\'s content'
      ]
    },
    'landscape': {
      title: 'Landscape Art',
      prompts: [
        'Majestic mountain landscape at golden hour, dramatic clouds, photorealistic style, epic composition',
        'Serene Japanese zen garden with cherry blossoms, peaceful atmosphere, soft lighting, meditation-inspiring',
        'Alien planet landscape with multiple moons, exotic vegetation, surreal colors, science fiction theme'
      ]
    }
  };

  const styleGuides = [
    { name: 'Photorealistic', description: 'Camera-like, detailed, lifelike imagery' },
    { name: 'Digital Art', description: 'Clean, polished, modern digital artwork' },
    { name: 'Oil Painting', description: 'Traditional artistic style with brush strokes' },
    { name: 'Anime/Manga', description: 'Japanese animation style, vibrant colors' },
    { name: 'Cyberpunk', description: 'Futuristic, neon-lit, high-tech aesthetic' },
    { name: 'Fantasy', description: 'Magical, mythical, otherworldly themes' }
  ];

  const promptTips = [
    'Be specific about lighting (golden hour, soft lighting, dramatic shadows)',
    'Include style keywords (photorealistic, digital art, oil painting)',
    'Describe the mood or atmosphere you want',
    'Mention composition (close-up, wide shot, centered)',
    'Add quality enhancers (highly detailed, 4K, masterpiece)',
    'Consider color palette (warm tones, cool blues, vibrant colors)'
  ];

  const enhancePrompt = async () => {
    if (!currentPrompt.trim()) {
      toast({
        title: "No prompt found",
        description: "Please enter a prompt first.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI enhancement (you'll replace this with actual DeepSeek API call)
    setTimeout(() => {
      const enhancedPrompt = `${currentPrompt}, highly detailed, professional quality, stunning composition, perfect lighting, masterpiece, 4K resolution`;
      onPromptSuggestion(enhancedPrompt);
      setIsGenerating(false);
      toast({
        title: "Prompt Enhanced!",
        description: "Your prompt has been improved with professional keywords.",
      });
    }, 1500);
  };

  const generateGoalBasedPrompt = () => {
    if (!userGoal.trim()) {
      toast({
        title: "Please describe your goal",
        description: "Tell us what kind of image you want to create.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI-generated prompt based on goal
    setTimeout(() => {
      const goalPrompt = `Create a ${userGoal}, highly detailed, professional quality, perfect composition, vibrant colors, trending on artstation`;
      onPromptSuggestion(goalPrompt);
      setIsGenerating(false);
      setUserGoal('');
      toast({
        title: "Prompt Generated!",
        description: "A custom prompt has been created based on your goal.",
      });
    }, 2000);
  };

  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center">
            <Bot className="w-5 h-5 mr-2 text-purple-400" />
            AI Assistant
            <Badge variant="secondary" className="ml-2 bg-purple-600/20 text-purple-300">
              Beta
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={enhancePrompt}
            disabled={isGenerating}
            className="border-purple-600 text-purple-300 hover:bg-purple-600/20"
          >
            <Wand2 className="w-4 h-4 mr-1" />
            {isGenerating ? 'Enhancing...' : 'Enhance Prompt'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(true)}
            className="border-gray-600 text-gray-300 hover:bg-gray-600/20"
          >
            <Lightbulb className="w-4 h-4 mr-1" />
            Get Ideas
          </Button>
        </div>

        {isExpanded && (
          <div className="space-y-6">
            {/* Goal-based prompt generation */}
            <div>
              <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-yellow-400" />
                Describe Your Goal
              </h4>
              <div className="space-y-2">
                <Textarea
                  value={userGoal}
                  onChange={(e) => setUserGoal(e.target.value)}
                  placeholder="e.g., I want a mobile game background with a fantasy theme..."
                  className="bg-gray-900/80 border-gray-600 text-white resize-none"
                  rows={2}
                />
                <Button
                  onClick={generateGoalBasedPrompt}
                  disabled={isGenerating || !userGoal.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  {isGenerating ? 'Generating...' : 'Generate Custom Prompt'}
                </Button>
              </div>
            </div>

            {/* Template Categories */}
            <div>
              <h4 className="text-sm font-medium text-white mb-3">Popular Templates</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(promptTemplates).map(([key, template]) => (
                  <Button
                    key={key}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const randomPrompt = template.prompts[Math.floor(Math.random() * template.prompts.length)];
                      onPromptSuggestion(randomPrompt);
                    }}
                    className="border-gray-600 text-gray-300 hover:bg-gray-600/20 h-auto py-2 px-3 text-left"
                  >
                    <div>
                      <div className="font-medium text-xs">{template.title}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Style Guides */}
            <div>
              <h4 className="text-sm font-medium text-white mb-3">Style Guides</h4>
              <div className="grid grid-cols-2 gap-2">
                {styleGuides.map((style) => (
                  <div
                    key={style.name}
                    className="p-2 bg-gray-900/50 rounded border border-gray-700 cursor-pointer hover:border-purple-500 transition-colors"
                    onClick={() => {
                      const stylePrompt = `${currentPrompt} ${currentPrompt ? ',' : ''} ${style.name.toLowerCase()} style`;
                      onPromptSuggestion(stylePrompt);
                    }}
                  >
                    <div className="text-xs font-medium text-white">{style.name}</div>
                    <div className="text-xs text-gray-400">{style.description}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div>
              <h4 className="text-sm font-medium text-white mb-2 flex items-center">
                <HelpCircle className="w-4 h-4 mr-1 text-blue-400" />
                Pro Tips
              </h4>
              <div className="space-y-1">
                {promptTips.map((tip, index) => (
                  <div key={index} className="text-xs text-gray-400 flex items-start">
                    <span className="w-1 h-1 bg-purple-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIAssistant;

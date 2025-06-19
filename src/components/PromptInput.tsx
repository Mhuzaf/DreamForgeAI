
import { useState } from 'react';
import { Wand2, Sparkles } from 'lucide-react';

const PromptInput = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      console.log('Generating image for prompt:', prompt);
    }, 3000);
  };

  const examplePrompts = [
    "A majestic dragon soaring through a stormy sky",
    "Cyberpunk city at night with neon lights",
    "A peaceful forest clearing with magical fireflies",
    "Vintage car on a mountain road at sunset"
  ];

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <section id="prompt-section" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Create Your Vision
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Describe what you want to see, and watch AI bring it to life
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700">
          <div className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-3">
                Enter your prompt
              </label>
              <div className="relative">
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to create... Be creative and detailed!"
                  className="w-full h-32 px-4 py-3 bg-gray-900/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200"
                  maxLength={500}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                  {prompt.length}/500
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="mr-2 w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 w-5 h-5" />
                    Generate Image
                  </>
                )}
              </button>
            </div>

            {isGenerating && (
              <div className="mt-6 animate-fade-in">
                <div className="bg-gray-900/80 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-white font-medium">Creating your masterpiece...</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Example prompts */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-white mb-6 text-center">
            Need inspiration? Try these examples:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="text-left p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:bg-gray-700/50 hover:border-purple-500 transition-all duration-200 group"
              >
                <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                  "{example}"
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromptInput;

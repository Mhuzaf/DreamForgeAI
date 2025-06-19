
import { useState } from 'react';
import { Wand2, Sparkles, HelpCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const PromptInput = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [style, setStyle] = useState('realistic');
  const [imageAmount, setImageAmount] = useState([4]);
  const [resolution, setResolution] = useState(['1024']);
  const [guidanceScale, setGuidanceScale] = useState([7.5]);
  const [seed, setSeed] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      console.log('Generating image for prompt:', prompt);
      console.log('Settings:', { style, imageAmount: imageAmount[0], resolution: resolution[0], guidanceScale: guidanceScale[0], seed });
    }, 3000);
  };

  const styles = [
    { value: 'realistic', label: 'Realistic' },
    { value: 'anime', label: 'Anime' },
    { value: '3d', label: '3D' },
    { value: 'sketch', label: 'Sketch' },
    { value: 'watercolor', label: 'Watercolor' },
    { value: 'oil-painting', label: 'Oil Painting' }
  ];

  const resolutionOptions = [
    { value: '512', label: '512×512' },
    { value: '768', label: '768×768' },
    { value: '1024', label: '1024×1024' },
    { value: '1536', label: '1536×1536' },
    { value: '2048', label: '2048×2048' }
  ];

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
    <TooltipProvider>
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
            <div className="space-y-8">
              {/* Prompt Input */}
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

              {/* Style Selection */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <label className="text-sm font-medium text-gray-300">Art Style</label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-gray-500 hover:text-purple-400 transition-colors" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Choose the artistic style for your generated image</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="bg-gray-900/80 border-gray-600 text-white hover:border-purple-500 transition-colors">
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-600">
                    {styles.map((styleOption) => (
                      <SelectItem key={styleOption.value} value={styleOption.value} className="text-white hover:bg-gray-700">
                        {styleOption.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Advanced Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Amount */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-sm font-medium text-gray-300">Image Amount</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-500 hover:text-purple-400 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Number of images to generate (1-8)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={imageAmount}
                      onValueChange={setImageAmount}
                      max={8}
                      min={1}
                      step={1}
                      className="w-full [&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1</span>
                      <span className="text-purple-400 font-medium">{imageAmount[0]}</span>
                      <span>8</span>
                    </div>
                  </div>
                </div>

                {/* Resolution */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-sm font-medium text-gray-300">Resolution</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-500 hover:text-purple-400 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Output image resolution (higher = better quality)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select value={resolution[0]} onValueChange={(value) => setResolution([value])}>
                    <SelectTrigger className="bg-gray-900/80 border-gray-600 text-white hover:border-purple-500 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-600">
                      {resolutionOptions.map((res) => (
                        <SelectItem key={res.value} value={res.value} className="text-white hover:bg-gray-700">
                          {res.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Guidance Scale */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-sm font-medium text-gray-300">Guidance Scale</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-500 hover:text-purple-400 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>How closely to follow the prompt (higher = more strict)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={guidanceScale}
                      onValueChange={setGuidanceScale}
                      max={20}
                      min={1}
                      step={0.5}
                      className="w-full [&_[role=slider]]:bg-purple-600 [&_[role=slider]]:border-purple-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1.0</span>
                      <span className="text-purple-400 font-medium">{guidanceScale[0]}</span>
                      <span>20.0</span>
                    </div>
                  </div>
                </div>

                {/* Seed */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <label className="text-sm font-medium text-gray-300">Seed (Optional)</label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-gray-500 hover:text-purple-400 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Seed for reproducible results (leave empty for random)</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    placeholder="Enter seed number..."
                    className="bg-gray-900/80 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Generate Button */}
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
    </TooltipProvider>
  );
};

export default PromptInput;

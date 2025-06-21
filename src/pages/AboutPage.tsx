
import Header from '../components/Header';
import { Shield, Users, Zap } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About DreamForge AI
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Empowering creativity through cutting-edge artificial intelligence, making art accessible to everyone.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              At DreamForge AI, we believe that creativity should have no boundaries. Our mission is to democratize 
              digital art creation by providing powerful AI tools that transform simple text descriptions into 
              stunning visual masterpieces.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We're committed to pushing the boundaries of what's possible with AI while maintaining ethical 
              standards and fostering a community of creative individuals from all backgrounds.
            </p>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-300">
                Constantly evolving our AI models to deliver the highest quality results and newest features.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-300">
                Building a supportive community where artists and creators can share, learn, and grow together.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ethics</h3>
              <p className="text-gray-300">
                Committed to responsible AI development and ensuring our technology is used for positive purposes.
              </p>
            </div>
          </div>

          {/* Team Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">AI</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Alex Chen</h3>
                <p className="text-purple-400 mb-2">CEO & Founder</p>
                <p className="text-gray-400 text-sm">Former AI researcher at Google, passionate about democratizing creativity.</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">SM</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Sarah Martinez</h3>
                <p className="text-blue-400 mb-2">CTO</p>
                <p className="text-gray-400 text-sm">Machine learning expert with 10+ years in computer vision and neural networks.</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">DJ</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">David Johnson</h3>
                <p className="text-green-400 mb-2">Head of Design</p>
                <p className="text-gray-400 text-sm">Award-winning designer focused on creating intuitive and beautiful user experiences.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-700">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              <AccordionItem value="item-1" className="border-gray-700">
                <AccordionTrigger className="text-left text-white hover:text-purple-400">
                  How does DreamForge AI work?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  DreamForge AI uses advanced machine learning models trained on millions of images to understand 
                  text descriptions and generate corresponding artwork. Simply describe what you want to see, 
                  and our AI will create unique images based on your prompt.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-gray-700">
                <AccordionTrigger className="text-left text-white hover:text-purple-400">
                  What are the different art styles available?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  We offer six distinct styles: Realistic (photographic quality), Anime (Japanese animation style), 
                  3D (three-dimensional renders), Sketch (pencil drawing style), Watercolor (painted with water-based paints), 
                  and Oil Painting (traditional oil paint texture and appearance).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-gray-700">
                <AccordionTrigger className="text-left text-white hover:text-purple-400">
                  How do credits work?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Each image generation consumes credits based on the resolution and number of images requested. 
                  Higher resolutions and more images require more credits. Free users get 10 credits per day, 
                  while premium users get unlimited generations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-gray-700">
                <AccordionTrigger className="text-left text-white hover:text-purple-400">
                  Can I use generated images commercially?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Yes! All images generated with DreamForge AI are yours to use for any purpose, including commercial use. 
                  We grant you full rights to your creations. However, please ensure your prompts don't infringe on 
                  existing copyrights or trademarks.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-gray-700">
                <AccordionTrigger className="text-left text-white hover:text-purple-400">
                  What is the Guidance Scale setting?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Guidance Scale controls how closely the AI follows your prompt. Lower values (1-7) give more creative 
                  freedom to the AI, while higher values (8-20) make the AI stick more strictly to your description. 
                  We recommend starting with 7.5 for most prompts.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-gray-700">
                <AccordionTrigger className="text-left text-white hover:text-purple-400">
                  How do I write better prompts?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Be specific and descriptive! Include details about lighting, composition, colors, and mood. 
                  For example, instead of "a cat," try "a fluffy orange tabby cat sitting on a windowsill, 
                  golden hour lighting, cozy atmosphere." You can also use negative prompts to exclude unwanted elements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-gray-700">
                <AccordionTrigger className="text-left text-white hover:text-purple-400">
                  What is a seed and should I use one?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  A seed is a number that determines the randomness of image generation. Using the same seed with 
                  the same prompt and settings will produce similar results. Leave it empty for random results, 
                  or use a specific seed when you want to create variations of an image you liked.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-gray-700">
                <AccordionTrigger className="text-left text-white hover:text-purple-400">
                  Are there any content restrictions?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Yes, we have content filters in place to prevent the generation of harmful, illegal, or inappropriate 
                  content. This includes violence, explicit content, hate speech, and copyrighted characters. 
                  Our goal is to maintain a safe and creative environment for all users.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border-gray-700">
                <AccordionTrigger className="text-left text-white hover:text-purple-400">
                  Can I delete or download my creations?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Absolutely! Visit your "My Creations" page to view all your generated images. From there, 
                  you can download images in high resolution, delete unwanted creations, or even rename them 
                  for better organization. Your creations are stored securely and privately.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border-gray-700">
                <AccordionTrigger className="text-left text-white hover:text-purple-400">
                  Is there a mobile app available?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Currently, DreamForge AI is available as a web application that works great on mobile browsers. 
                  We're working on dedicated mobile apps for iOS and Android, which will be available soon. 
                  Stay tuned for updates!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Responsible AI Section */}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
            <h2 className="text-3xl font-bold mb-6 text-center">Responsible AI Commitment</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-white">Content Safety:</strong> We employ advanced filtering systems to prevent 
                the generation of harmful, offensive, or inappropriate content.
              </p>
              <p>
                <strong className="text-white">Copyright Respect:</strong> Our AI models are trained on ethically sourced 
                datasets, and we respect intellectual property rights.
              </p>
              <p>
                <strong className="text-white">Transparency:</strong> We're committed to being transparent about our AI 
                capabilities, limitations, and the sources of our training data.
              </p>
              <p>
                <strong className="text-white">Privacy Protection:</strong> Your prompts and generated images are private 
                and secure. We never use your data to train our models without explicit consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

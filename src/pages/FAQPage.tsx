
import Header from '../components/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Frequently Asked Questions
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Everything you need to know about using DreamForge AI
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
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
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

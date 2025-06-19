
import Header from '../components/Header';
import { Shield, Users, Zap } from 'lucide-react';

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


import { useState, useEffect } from 'react';
import { X, Crown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useSubscription } from '../contexts/SubscriptionContext';

const UpgradePopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { subscriptionTier } = useSubscription();

  useEffect(() => {
    // Show popup only for Community users
    if (!subscriptionTier || subscriptionTier === 'Community') {
      const hasSeenPopup = localStorage.getItem('hasSeenUpgradePopup');
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 2000); // Show after 2 seconds
        return () => clearTimeout(timer);
      }
    }
  }, [subscriptionTier]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenUpgradePopup', 'true');
  };

  const handleUpgrade = () => {
    const pricingSection = document.querySelector('#pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            🔒 Upgrade to Pro
          </h3>
          
          <p className="text-gray-300 mb-6">
            Get HD output, preview tools, and advanced prompt assistance
          </p>
          
          <div className="space-y-3 mb-6 text-left">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-gray-300 text-sm">50 generations/day</span>
            </div>
            <div className="flex items-center space-x-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-gray-300 text-sm">HD quality (1024×1024)</span>
            </div>
            <div className="flex items-center space-x-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-gray-300 text-sm">AI prompt assistance</span>
            </div>
            <div className="flex items-center space-x-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-gray-300 text-sm">Live preview thumbnails</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Maybe Later
            </Button>
            <Button
              onClick={handleUpgrade}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradePopup;

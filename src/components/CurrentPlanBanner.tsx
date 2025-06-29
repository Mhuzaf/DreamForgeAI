
import { useSubscription } from '../contexts/SubscriptionContext';
import { useCredits } from '../contexts/CreditsContext';
import { Crown, Sparkles, Infinity } from 'lucide-react';

const CurrentPlanBanner = () => {
  const { subscriptionTier, subscriptionEnd } = useSubscription();
  const { credits } = useCredits();

  const endDate = subscriptionEnd ? new Date(subscriptionEnd).toLocaleDateString() : null;

  if (subscriptionTier === 'Pro') {
    return (
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="text-white font-medium">Pro Plan</h3>
              <p className="text-gray-300 text-sm">
                {credits} credits remaining • HD resolution • AI Assistant
                {endDate && ` • Renews ${endDate}`}
              </p>
            </div>
          </div>
          <div className="text-purple-400 font-semibold">
            {credits}/50 Credits
          </div>
        </div>
      </div>
    );
  }

  if (subscriptionTier === 'Studio') {
    return (
      <div className="bg-gradient-to-r from-gold-600/20 to-yellow-600/20 border border-gold-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="w-5 h-5 text-gold-400" />
            <div>
              <h3 className="text-white font-medium">Studio Plan</h3>
              <p className="text-gray-300 text-sm">
                Unlimited generations • Ultra HD • API access • All features
                {endDate && ` • Renews ${endDate}`}
              </p>
            </div>
          </div>
          <div className="flex items-center text-gold-400 font-semibold">
            <Infinity className="w-5 h-5 mr-1" />
            Unlimited
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="text-white font-medium">Community Plan</h3>
            <p className="text-gray-300 text-sm">Basic features • Limited generations</p>
          </div>
        </div>
        <div className="text-blue-400 font-semibold">
          {credits}/5 Credits
        </div>
      </div>
    </div>
  );
};

export default CurrentPlanBanner;

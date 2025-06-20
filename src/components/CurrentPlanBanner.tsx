
import { useSubscription } from '../contexts/SubscriptionContext';
import { Crown, Sparkles } from 'lucide-react';

const CurrentPlanBanner = () => {
  const { subscriptionTier, subscriptionEnd } = useSubscription();

  if (!subscriptionTier) {
    return (
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <Sparkles className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="text-white font-medium">Community Plan</h3>
            <p className="text-gray-300 text-sm">25 credits per month • Basic features</p>
          </div>
        </div>
      </div>
    );
  }

  const endDate = subscriptionEnd ? new Date(subscriptionEnd).toLocaleDateString() : null;

  return (
    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-3">
        <Crown className="w-5 h-5 text-purple-400" />
        <div>
          <h3 className="text-white font-medium">{subscriptionTier} Plan</h3>
          <p className="text-gray-300 text-sm">
            {subscriptionTier === 'Pro' ? 'Unlimited generation • HD resolution' : 'Everything in Pro • Ultra HD • API access'}
            {endDate && ` • Renews ${endDate}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlanBanner;

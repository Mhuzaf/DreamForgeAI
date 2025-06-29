
import { useState } from 'react';
import { X, CreditCard, Settings as SettingsIcon, RefreshCw, Crown, User, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useCredits } from '../contexts/CreditsContext';
import { supabase } from '../integrations/supabase/client';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { subscriptionTier, subscriptionEnd, refreshSubscription } = useSubscription();
  const { credits, resetCredits } = useCredits();

  const handleManagePayments = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to manage your payments.",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
        toast({
          title: "Customer Portal Opened",
          description: "Manage your subscription in the new tab.",
        });
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open payment management. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshSubscription = async () => {
    try {
      setLoading(true);
      await refreshSubscription();
      toast({
        title: "Subscription Refreshed",
        description: "Your subscription status has been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh subscription status.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetCredits = () => {
    resetCredits();
    toast({
      title: "Credits Reset",
      description: "Your credits have been reset based on your subscription tier.",
    });
  };

  if (!isOpen) return null;

  const endDate = subscriptionEnd ? new Date(subscriptionEnd).toLocaleDateString() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-semibold text-white">Account Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Subscription Info */}
          <div className="bg-gray-900 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Crown className="w-4 h-4 text-purple-400" />
              <h3 className="text-white font-medium">Subscription Status</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Current Plan:</span>
                <span className="text-white font-medium">
                  {subscriptionTier || 'Community'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Credits:</span>
                <span className="text-white font-medium">
                  {subscriptionTier === 'Studio' ? 'Unlimited' : `${credits} remaining`}
                </span>
              </div>
              {endDate && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Renewal Date:</span>
                  <span className="text-white font-medium">{endDate}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {subscriptionTier && subscriptionTier !== 'Community' && (
              <button
                onClick={handleManagePayments}
                disabled={loading}
                className="w-full flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors text-left disabled:opacity-50"
              >
                <CreditCard className="w-4 h-4 mr-3" />
                Manage Subscription & Billing
              </button>
            )}
            
            <button
              onClick={handleRefreshSubscription}
              disabled={loading}
              className="w-full flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors text-left disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-3 ${loading ? 'animate-spin' : ''}`} />
              Refresh Subscription Status
            </button>

            <button
              onClick={handleResetCredits}
              className="w-full flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors text-left"
            >
              <User className="w-4 h-4 mr-3" />
              Reset Credits
            </button>
          </div>
          
          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              Need help? Contact support or check our FAQ for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

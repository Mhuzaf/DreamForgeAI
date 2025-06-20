
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Check, Crown, Sparkles } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { useSubscription } from '../contexts/SubscriptionContext';
import { supabase } from '../integrations/supabase/client';

const SubscriptionPlans = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();
  const { subscriptionTier, refreshSubscription } = useSubscription();

  const handleSubscribe = async (plan: 'pro' | 'studio') => {
    try {
      setLoading(plan);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to subscribe to a plan.",
          variant: "destructive"
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { plan },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to create checkout session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to manage your subscription.",
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
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open customer portal. Please try again.",
        variant: "destructive"
      });
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Community',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        '25 credits per month',
        'Basic image generation',
        'Standard resolution (512x512)',
        'Community gallery access',
        'Basic social features'
      ],
      icon: <Sparkles className="w-6 h-6 text-blue-500" />,
      current: !subscriptionTier || subscriptionTier === 'Community'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'For serious creators',
      features: [
        'Unlimited image generation',
        'HD resolution (up to 1536x1536)',
        'Priority processing',
        'Private gallery',
        'Advanced editing tools',
        'Batch generation',
        'Early access to new models'
      ],
      icon: <Crown className="w-6 h-6 text-purple-500" />,
      popular: true,
      current: subscriptionTier === 'Pro'
    },
    {
      id: 'studio',
      name: 'Studio',
      price: '$19.99',
      period: 'per month',
      description: 'For professional studios',
      features: [
        'Everything in Pro',
        'Ultra HD resolution (up to 2048x2048)',
        'API access',
        'Commercial license',
        'Team collaboration',
        'Custom models training',
        'Priority support',
        'White-label options'
      ],
      icon: <Crown className="w-6 h-6 text-gold-500" />,
      current: subscriptionTier === 'Studio'
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Unlock the full potential of AI-powered creativity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative bg-gray-800 border-gray-700 ${
                plan.popular ? 'ring-2 ring-purple-500' : ''
              } ${plan.current ? 'ring-2 ring-green-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              {plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.current ? (
                  subscriptionTier && subscriptionTier !== 'Community' ? (
                    <Button
                      onClick={handleManageSubscription}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Manage Subscription
                    </Button>
                  ) : (
                    <Button
                      disabled
                      className="w-full bg-gray-600 text-gray-400 cursor-not-allowed"
                    >
                      Current Plan
                    </Button>
                  )
                ) : plan.id === 'free' ? (
                  <Button
                    disabled
                    className="w-full bg-gray-600 text-gray-400 cursor-not-allowed"
                  >
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleSubscribe(plan.id as 'pro' | 'studio')}
                    disabled={loading === plan.id}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    {loading === plan.id ? 'Processing...' : `Subscribe to ${plan.name}`}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            onClick={refreshSubscription}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Refresh Subscription Status
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;

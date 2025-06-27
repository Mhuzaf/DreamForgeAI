
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

      const priceId = plan === 'pro' ? 'price_1Rc84EBRyZcLVe9Y1fhjCoxS' : 'price_1Rc8DlBRyZcLVe9YxzqryocS';
      
      console.log('Creating checkout session for plan:', plan, 'with price ID:', priceId);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('Checkout response:', { data, error });

      if (error) {
        console.error('Checkout error details:', error);
        throw new Error(error.message || 'Failed to create checkout session');
      }

      if (data?.url) {
        console.log('Redirecting to checkout URL:', data.url);
        window.location.href = data.url;
        
        // Refresh subscription status after a delay
        setTimeout(() => {
          refreshSubscription();
        }, 3000);
      } else {
        throw new Error('No checkout URL received from server');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Payment Error",
        description: error instanceof Error ? error.message : "Failed to start checkout process. Please try again.",
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

      if (error) {
        console.error('Customer portal error:', error);
        throw new Error(error.message || 'Failed to open customer portal');
      }

      if (data?.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No portal URL received');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to open customer portal. Please try again.",
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
        '5 generations per day',
        'Basic prompt-to-image generation',
        '3 core styles (Realistic, Sketch, Anime)',  
        '512×512 resolution',
        'Access to Community Gallery',
        'Like & save images to library',
        'Download in PNG format',
        'Basic history of past 3 prompts',
        'Access to public contests',
        'Tooltips & beginner onboarding'
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
        'Everything in Community',
        '50 generations per day',
        'HD quality output (1024×1024)',
        'Prompt suggestions & autocomplete',
        'Live preview thumbnails',
        'Prompt templates by genre',
        'Prompt refinement chatbot',
        'Style advisor recommendations',
        'Save, organize, and favorite prompts',
        'Basic generation analytics'
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
        'Public gallery boost visibility',
        'Built-in AI image editor',
        'Inpainting & outpainting',
        'Image-to-image generation',
        'ControlNet input support',
        'REST & GraphQL API access',
        'Figma & Photoshop plugins',
        'Discord bot integration',
        'Export in PSD, PNG, JPG, SVG',
        'Priority support & early access'
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
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
                  >
                    {loading === plan.id ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      `Subscribe to ${plan.name}`
                    )}
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

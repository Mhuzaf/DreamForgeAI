
import { useFeatureAccess } from '../contexts/FeatureAccessContext';
import { useToast } from './use-toast';

export const useFeatureGate = () => {
  const featureAccess = useFeatureAccess();
  const { toast } = useToast();

  const checkFeature = (featureName: keyof typeof featureAccess, showToast = true) => {
    const hasAccess = featureAccess[featureName];
    
    if (!hasAccess && showToast) {
      toast({
        title: "Upgrade Required",
        description: "This feature is available in Pro and Studio plans.",
        variant: "destructive",
      });
    }
    
    return hasAccess;
  };

  const scrollToPricing = () => {
    const pricingSection = document.querySelector('#pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    featureAccess,
    checkFeature,
    scrollToPricing,
  };
};

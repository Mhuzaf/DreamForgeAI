
import { createContext, useContext, ReactNode } from 'react';
import { useSubscription } from './SubscriptionContext';

interface FeatureAccess {
  // Generation limits
  maxDailyGenerations: number;
  hasUnlimitedGenerations: boolean;
  
  // AI Features
  canUseAIBot: boolean;
  hasPromptSuggestions: boolean;
  hasLivePreview: boolean;
  hasPromptTemplates: boolean;
  hasPromptRefinementBot: boolean;
  hasStyleAdvisor: boolean;
  
  // Output quality
  maxResolution: string;
  canExportHD: boolean;
  supportedFormats: string[];
  
  // Gallery features
  canAccessGallery: boolean;
  canLikeAndSave: boolean;
  canAccessContests: boolean;
  hasGalleryBoost: boolean;
  
  // Advanced features
  hasImageEditor: boolean;
  hasInpainting: boolean;
  hasImageToImage: boolean;
  hasControlNet: boolean;
  
  // Developer tools
  hasAPIAccess: boolean;
  hasWebhooks: boolean;
  hasPluginSupport: boolean;
  hasSDKAccess: boolean;
  
  // Support
  hasPrioritySupport: boolean;
  hasEarlyAccess: boolean;
}

const FeatureAccessContext = createContext<FeatureAccess | undefined>(undefined);

export const useFeatureAccess = () => {
  const context = useContext(FeatureAccessContext);
  if (!context) {
    throw new Error('useFeatureAccess must be used within a FeatureAccessProvider');
  }
  return context;
};

interface FeatureAccessProviderProps {
  children: ReactNode;
}

export const FeatureAccessProvider = ({ children }: FeatureAccessProviderProps) => {
  const { subscriptionTier } = useSubscription();

  const getFeatureAccess = (): FeatureAccess => {
    switch (subscriptionTier) {
      case 'Pro':
        return {
          maxDailyGenerations: 50,
          hasUnlimitedGenerations: false,
          canUseAIBot: true,
          hasPromptSuggestions: true,
          hasLivePreview: true,
          hasPromptTemplates: true,
          hasPromptRefinementBot: true,
          hasStyleAdvisor: true,
          maxResolution: '1024×1024',
          canExportHD: true,
          supportedFormats: ['PNG', 'JPG'],
          canAccessGallery: true,
          canLikeAndSave: true,
          canAccessContests: true,
          hasGalleryBoost: false,
          hasImageEditor: false,
          hasInpainting: false,
          hasImageToImage: false,
          hasControlNet: false,
          hasAPIAccess: false,
          hasWebhooks: false,
          hasPluginSupport: false,
          hasSDKAccess: false,
          hasPrioritySupport: false,
          hasEarlyAccess: false,
        };
      
      case 'Studio':
        return {
          maxDailyGenerations: 1000,
          hasUnlimitedGenerations: true,
          canUseAIBot: true,
          hasPromptSuggestions: true,
          hasLivePreview: true,
          hasPromptTemplates: true,
          hasPromptRefinementBot: true,
          hasStyleAdvisor: true,
          maxResolution: '4K',
          canExportHD: true,
          supportedFormats: ['PSD', 'PNG', 'JPG', 'SVG'],
          canAccessGallery: true,
          canLikeAndSave: true,
          canAccessContests: true,
          hasGalleryBoost: true,
          hasImageEditor: true,
          hasInpainting: true,
          hasImageToImage: true,
          hasControlNet: true,
          hasAPIAccess: true,
          hasWebhooks: true,
          hasPluginSupport: true,
          hasSDKAccess: true,
          hasPrioritySupport: true,
          hasEarlyAccess: true,
        };
      
      default: // Community
        return {
          maxDailyGenerations: 5,
          hasUnlimitedGenerations: false,
          canUseAIBot: false,
          hasPromptSuggestions: false,
          hasLivePreview: false,
          hasPromptTemplates: false,
          hasPromptRefinementBot: false,
          hasStyleAdvisor: false,
          maxResolution: '512×512',
          canExportHD: false,
          supportedFormats: ['PNG'],
          canAccessGallery: true,
          canLikeAndSave: true,
          canAccessContests: true,
          hasGalleryBoost: false,
          hasImageEditor: false,
          hasInpainting: false,
          hasImageToImage: false,
          hasControlNet: false,
          hasAPIAccess: false,
          hasWebhooks: false,
          hasPluginSupport: false,
          hasSDKAccess: false,
          hasPrioritySupport: false,
          hasEarlyAccess: false,
        };
    }
  };

  const featureAccess = getFeatureAccess();

  return (
    <FeatureAccessContext.Provider value={featureAccess}>
      {children}
    </FeatureAccessContext.Provider>
  );
};

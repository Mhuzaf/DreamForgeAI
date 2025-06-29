
import { createContext, useContext, useState, useEffect } from 'react';
import { useSubscription } from './SubscriptionContext';

interface CreditsContextType {
  credits: number;
  useCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;
  resetCredits: () => void;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const useCredits = () => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error('useCredits must be used within a CreditsProvider');
  }
  return context;
};

interface CreditsProviderProps {
  children: React.ReactNode;
}

export const CreditsProvider = ({ children }: CreditsProviderProps) => {
  const { subscriptionTier } = useSubscription();
  const [credits, setCredits] = useState(5); // Start with Community tier credits

  // Update credits based on subscription tier
  useEffect(() => {
    if (subscriptionTier === 'Pro') {
      setCredits(50);
    } else if (subscriptionTier === 'Studio') {
      setCredits(1000);
    } else {
      setCredits(5); // Community tier
    }
  }, [subscriptionTier]);

  const useCredits = (amount: number): boolean => {
    if (subscriptionTier === 'Studio') {
      // Studio has unlimited generations, always return true
      return true;
    }
    
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addCredits = (amount: number) => {
    setCredits(prev => prev + amount);
  };

  const resetCredits = () => {
    if (subscriptionTier === 'Pro') {
      setCredits(50);
    } else if (subscriptionTier === 'Studio') {
      setCredits(1000);
    } else {
      setCredits(5);
    }
  };

  return (
    <CreditsContext.Provider value={{ credits, useCredits, addCredits, resetCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};

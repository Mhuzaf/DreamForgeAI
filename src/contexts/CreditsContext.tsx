
import { createContext, useContext, useState } from 'react';

interface CreditsContextType {
  credits: number;
  useCredits: (amount: number) => boolean;
  addCredits: (amount: number) => void;
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
  const [credits, setCredits] = useState(50); // Start with 50 credits

  const useCredits = (amount: number): boolean => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      return true;
    }
    return false;
  };

  const addCredits = (amount: number) => {
    setCredits(prev => prev + amount);
  };

  return (
    <CreditsContext.Provider value={{ credits, useCredits, addCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};

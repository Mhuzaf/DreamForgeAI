
import { useState } from 'react';
import { X, CreditCard, Settings as SettingsIcon } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import { supabase } from '../integrations/supabase/client';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { toast } = useToast();

  const handleManagePayments = async () => {
    try {
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
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open payment management. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (!isOpen) return null;

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
            <h2 className="text-xl font-semibold text-white">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <button
            onClick={handleManagePayments}
            className="w-full flex items-center px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors text-left"
          >
            <CreditCard className="w-4 h-4 mr-3" />
            Manage Payments
          </button>
          
          <div className="pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              More settings options coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;

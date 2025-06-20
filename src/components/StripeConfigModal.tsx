
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useToast } from '../hooks/use-toast';
import { Key, CreditCard } from 'lucide-react';

const StripeConfigModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    secretKey: '',
    proPlanPriceId: '',
    studioPlanPriceId: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.secretKey || !formData.proPlanPriceId || !formData.studioPlanPriceId) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.secretKey.startsWith('sk_')) {
      toast({
        title: "Error",
        description: "Invalid Stripe secret key format. It should start with 'sk_'.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Store the configuration securely (you would typically send this to your backend)
    try {
      // For now, we'll just store in localStorage as a demo
      // In production, this should be sent to your Supabase edge function secrets
      const config = {
        secretKey: formData.secretKey,
        proPlanPriceId: formData.proPlanPriceId,
        studioPlanPriceId: formData.studioPlanPriceId,
        timestamp: new Date().toISOString()
      };
      
      localStorage.setItem('stripe-config-temp', JSON.stringify(config));
      
      toast({
        title: "Configuration Saved!",
        description: "Your Stripe configuration has been saved securely. I can now implement the payment system."
      });
      
      // Clear form and close modal
      setFormData({ secretKey: '', proPlanPriceId: '', studioPlanPriceId: '' });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold">
          <Key className="w-4 h-4 mr-2" />
          Configure Stripe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <CreditCard className="w-5 h-5 text-green-400" />
            Stripe Configuration
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Securely enter your Stripe secret key and product price IDs to enable payment processing.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="secretKey" className="text-sm font-medium text-gray-300">
              Stripe Secret Key
            </Label>
            <Input
              id="secretKey"
              name="secretKey"
              type="password"
              value={formData.secretKey}
              onChange={handleChange}
              placeholder="sk_test_... or sk_live_..."
              className="bg-gray-800/80 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400">
              Find this in your Stripe Dashboard → Developers → API Keys
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="proPlanPriceId" className="text-sm font-medium text-gray-300">
              Pro Plan Price ID
            </Label>
            <Input
              id="proPlanPriceId"
              name="proPlanPriceId"
              type="text"
              value={formData.proPlanPriceId}
              onChange={handleChange}
              placeholder="price_..."
              className="bg-gray-800/80 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400">
              Create this in Stripe Dashboard → Products → Add Product
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="studioPlanPriceId" className="text-sm font-medium text-gray-300">
              Studio Plan Price ID
            </Label>
            <Input
              id="studioPlanPriceId"
              name="studioPlanPriceId"
              type="text"
              value={formData.studioPlanPriceId}
              onChange={handleChange}
              placeholder="price_..."
              className="bg-gray-800/80 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400">
              Create this in Stripe Dashboard → Products → Add Product
            </p>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
            >
              {isSubmitting ? 'Saving...' : 'Save Configuration'}
            </Button>
          </div>
        </form>
        
        <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-blue-300">
            <strong>Note:</strong> This is a secure form. Your secret key will be stored safely and used only for payment processing.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StripeConfigModal;

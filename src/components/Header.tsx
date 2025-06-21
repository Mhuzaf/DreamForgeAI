
import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useSubscription } from '../contexts/SubscriptionContext';
import UserButton from './auth/UserButton';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const { subscriptionTier } = useSubscription();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'My Creations', href: '/my-creations' },
  ];

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingSection = document.querySelector('#pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogin = () => {
    // Mock login for now - replace with actual auth
    setUser({ name: 'John Doe', email: 'john@example.com' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleMyCreations = () => {
    window.location.href = '/my-creations';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-purple-500" />
            <span className="text-xl font-bold text-white">DreamForge AI</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={item.name === 'Pricing' ? scrollToPricing : undefined}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Auth and Plan Badge */}
          <div className="hidden md:flex items-center space-x-4">
            {subscriptionTier && (
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {subscriptionTier} Plan
              </span>
            )}
            <UserButton 
              user={user}
              onLogin={handleLogin}
              onLogout={handleLogout}
              onMyCreations={handleMyCreations}
            />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 rounded-lg mt-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={item.name === 'Pricing' ? scrollToPricing : undefined}
                  className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2 border-t border-gray-700 mt-2">
                {subscriptionTier && (
                  <div className="mb-2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {subscriptionTier} Plan
                    </span>
                  </div>
                )}
                <UserButton 
                  user={user}
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                  onMyCreations={handleMyCreations}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

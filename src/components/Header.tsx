
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import UserButton from './auth/UserButton';
import AuthModal from './auth/AuthModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleMyCreations = () => {
    navigate('/my-creations');
  };

  const handleAuthSuccess = () => {
    // Mock user data - in real app this would come from authentication
    setUser({
      name: 'John Doe',
      email: 'john@example.com'
    });
    setIsAuthModalOpen(false);
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <button 
                onClick={() => navigate('/')}
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                DreamForge AI
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Desktop User Button */}
            <div className="hidden md:block">
              <UserButton
                user={user}
                onLogin={handleLogin}
                onLogout={handleLogout}
                onMyCreations={handleMyCreations}
              />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-gray-900 border-t border-gray-800 animate-fade-in">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200 text-base font-medium cursor-pointer w-full text-left"
                  >
                    {item.name}
                  </button>
                ))}
                <div className="border-t border-gray-800 pt-2 mt-2">
                  <div className="px-3 py-2">
                    <UserButton
                      user={user}
                      onLogin={handleLogin}
                      onLogout={handleLogout}
                      onMyCreations={handleMyCreations}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default Header;

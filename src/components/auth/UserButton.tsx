
import { useState } from 'react';
import { User, Settings, LogOut, History } from 'lucide-react';
import { Button } from '../ui/button';

interface UserButtonProps {
  user: { name: string; email: string } | null;
  onLogin: () => void;
  onLogout: () => void;
  onMyCreations: () => void;
}

const UserButton = ({ user, onLogin, onLogout, onMyCreations }: UserButtonProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!user) {
    return (
      <Button
        onClick={onLogin}
        variant="outline"
        className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
      >
        Sign In
      </Button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-md transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="hidden md:block">{user.name}</span>
      </button>

      {isDropdownOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-20">
            <div className="px-4 py-3 border-b border-gray-700">
              <p className="text-sm text-white font-medium">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => {
                  onMyCreations();
                  setIsDropdownOpen(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
              >
                <History className="w-4 h-4 mr-3" />
                My Creations
              </button>
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setIsDropdownOpen(false);
                }}
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserButton;

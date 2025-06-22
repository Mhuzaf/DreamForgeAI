import { useState, useEffect } from 'react';
import { History, Star, Trash2, RefreshCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';

interface HistoryItem {
  id: string;
  prompt: string;
  timestamp: string;
  imageUrl?: string;
  isFavorite: boolean;
  settings: {
    style: string;
    resolution: string;
    guidanceScale: number;
  };
}

interface PromptHistoryProps {
  onPromptSelect: (prompt: string) => void;
  currentPrompt: string;
}

const PromptHistory = ({ onPromptSelect, currentPrompt }: PromptHistoryProps) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    if (currentPrompt.trim()) {
      saveToHistory(currentPrompt);
    }
  }, [currentPrompt]);

  const loadHistory = () => {
    const saved = localStorage.getItem('dreamforge_prompt_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  };

  const saveHistory = (newHistory: HistoryItem[]) => {
    localStorage.setItem('dreamforge_prompt_history', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  const saveToHistory = (prompt: string) => {
    if (!prompt.trim()) return;

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      prompt: prompt.trim(),
      timestamp: new Date().toISOString(),
      isFavorite: false,
      settings: {
        style: 'realistic', // You can get this from current settings
        resolution: '1024',
        guidanceScale: 7.5
      }
    };

    const existingIndex = history.findIndex(item => item.prompt === prompt.trim());
    
    let newHistory: HistoryItem[];
    if (existingIndex >= 0) {
      // Update timestamp of existing item and move to top
      newHistory = [
        { ...history[existingIndex], timestamp: new Date().toISOString() },
        ...history.filter((_, index) => index !== existingIndex)
      ];
    } else {
      // Add new item to top, keep only last 50 items
      newHistory = [newItem, ...history].slice(0, 50);
    }

    saveHistory(newHistory);
  };

  const toggleFavorite = (id: string) => {
    const newHistory = history.map(item =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    );
    saveHistory(newHistory);
    
    const item = newHistory.find(h => h.id === id);
    toast({
      title: item?.isFavorite ? "Added to Favorites" : "Removed from Favorites",
      description: item?.isFavorite ? "Prompt saved to your favorites" : "Prompt removed from favorites",
    });
  };

  const deleteItem = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    saveHistory(newHistory);
    toast({
      title: "Deleted",
      description: "Prompt removed from history",
    });
  };

  const clearHistory = () => {
    saveHistory([]);
    toast({
      title: "History Cleared",
      description: "All prompt history has been removed",
    });
  };

  const favoriteItems = history.filter(item => item.isFavorite);
  const recentItems = history.filter(item => !item.isFavorite).slice(0, 10);

  const renderHistoryItem = (item: HistoryItem) => (
    <div
      key={item.id}
      className="p-3 bg-gray-900/50 rounded border border-gray-700 hover:border-purple-500 transition-colors group"
    >
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm text-gray-300 flex-1 line-clamp-2 cursor-pointer" 
           onClick={() => onPromptSelect(item.prompt)}>
          {item.prompt}
        </p>
        <div className="flex items-center space-x-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => toggleFavorite(item.id)}
            className={`p-1 h-auto ${item.isFavorite ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'}`}
          >
            <Star className={`w-3 h-3 ${item.isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onPromptSelect(item.prompt)}
            className="p-1 h-auto text-gray-500 hover:text-purple-400"
          >
            <RefreshCcw className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => deleteItem(item.id)}
            className="p-1 h-auto text-gray-500 hover:text-red-400"
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
            {item.settings.style}
          </Badge>
          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
            {item.settings.resolution}x{item.settings.resolution}
          </Badge>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(item.timestamp).toLocaleDateString()}
        </span>
      </div>
    </div>
  );

  return (
    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-white">
          <div className="flex items-center">
            <History className="w-5 h-5 mr-2 text-blue-400" />
            Prompt History
            <Badge variant="secondary" className="ml-2 bg-blue-600/20 text-blue-300">
              {history.length}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-red-400 hover:text-red-300 text-xs"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-gray-400 hover:text-white"
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        {history.length === 0 ? (
          <div className="text-center py-6 text-gray-400">
            <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No prompt history yet</p>
            <p className="text-xs">Your prompts will appear here as you create</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteItems.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-yellow-400 mb-2 flex items-center">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  Favorites ({favoriteItems.length})
                </h4>
                <ScrollArea className={`${isExpanded ? 'h-32' : 'h-20'}`}>
                  <div className="space-y-2">
                    {favoriteItems.map(renderHistoryItem)}
                  </div>
                </ScrollArea>
              </div>
            )}

            {recentItems.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">
                  Recent ({recentItems.length})
                </h4>
                <ScrollArea className={`${isExpanded ? 'h-40' : 'h-24'}`}>
                  <div className="space-y-2">
                    {recentItems.map(renderHistoryItem)}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PromptHistory;

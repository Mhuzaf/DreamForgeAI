
import { Download, Trash2, Edit2 } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './ui/context-menu';

interface Creation {
  id: string;
  url: string;
  prompt: string;
  style: string;
  timestamp: string;
  name?: string;
}

interface ContextMenuActionsProps {
  creation: Creation;
  onRename: (creation: Creation) => void;
  onDownload: (creation: Creation) => void;
  onDelete: (id: string) => void;
  children: React.ReactNode;
}

const ContextMenuActions = ({ 
  creation, 
  onRename, 
  onDownload, 
  onDelete, 
  children 
}: ContextMenuActionsProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56 bg-gray-800 border-gray-700 text-white">
        <ContextMenuItem 
          onClick={() => onRename(creation)}
          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-700 focus:bg-gray-700 cursor-pointer transition-colors duration-200"
        >
          <Edit2 className="w-4 h-4" />
          Rename
        </ContextMenuItem>
        <ContextMenuItem 
          onClick={() => onDownload(creation)}
          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-700 focus:bg-gray-700 cursor-pointer transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          Download
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-gray-600" />
        <ContextMenuItem 
          onClick={() => onDelete(creation.id)}
          className="flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-900/20 focus:bg-red-900/20 cursor-pointer transition-colors duration-200"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ContextMenuActions;

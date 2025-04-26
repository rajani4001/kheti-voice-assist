
import { Button } from "@/components/ui/button";
import { Volume } from "lucide-react";

interface ConversationItemProps {
  query: string;
  response: string;
  timestamp: string;
  onPlayResponse: (text: string) => void;
}

export function ConversationItem({ 
  query, 
  response, 
  timestamp,
  onPlayResponse 
}: ConversationItemProps) {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <p className="font-medium text-primary">Your Question:</p>
        <span className="text-xs text-gray-500">{timestamp}</span>
      </div>
      <p className="mb-4">{query}</p>
      
      <div className="border-t pt-2">
        <div className="flex justify-between items-center mb-2">
          <p className="font-medium text-secondary">Response:</p>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onPlayResponse(response)}
            className="flex items-center gap-1 text-xs"
          >
            <Volume size={14} />
            <span>Listen</span>
          </Button>
        </div>
        <p>{response}</p>
      </div>
    </div>
  );
}

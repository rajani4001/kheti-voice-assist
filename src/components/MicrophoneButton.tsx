
import { useState, useEffect } from 'react';
import { Mic, Square } from "lucide-react";

interface MicrophoneButtonProps {
  onStartRecording: () => void;
  onStopRecording: () => void;
  isListening: boolean;
}

export function MicrophoneButton({ 
  onStartRecording, 
  onStopRecording, 
  isListening 
}: MicrophoneButtonProps) {
  const handleClick = () => {
    if (isListening) {
      onStopRecording();
    } else {
      onStartRecording();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleClick}
        className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all
          ${isListening ? 'bg-destructive text-white' : 'bg-primary text-white hover:bg-primary-light'}`}
      >
        {isListening ? (
          <>
            <div className="mic-button-pulse animate-pulse-ring"></div>
            <Square size={24} />
          </>
        ) : (
          <Mic size={24} />
        )}
      </button>
      <span className="mt-2 text-sm">
        {isListening ? "Tap to stop" : "Tap to speak"}
      </span>
    </div>
  );
}

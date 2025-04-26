
import { useState, useEffect } from 'react';

interface UseSpeechSynthesisProps {
  language: string;
}

interface UseSpeechSynthesisReturn {
  speak: (text: string) => void;
  stop: () => void;
  isSpeaking: boolean;
  browserSupportsSpeechSynthesis: boolean;
}

export function useSpeechSynthesis({
  language = 'en-US',
}: UseSpeechSynthesisProps): UseSpeechSynthesisReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const browserSupportsSpeechSynthesis = 'speechSynthesis' in window;
  
  useEffect(() => {
    if (browserSupportsSpeechSynthesis) {
      const handleEnd = () => setIsSpeaking(false);
      window.speechSynthesis.addEventListener('end', handleEnd);
      
      return () => {
        window.speechSynthesis.removeEventListener('end', handleEnd);
        window.speechSynthesis.cancel();
      };
    }
  }, [browserSupportsSpeechSynthesis]);

  const speak = (text: string) => {
    if (!browserSupportsSpeechSynthesis) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    
    // Find the appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    const voiceForLanguage = voices.find(voice => voice.lang.startsWith(language.split('-')[0]));
    if (voiceForLanguage) utterance.voice = voiceForLanguage;
    
    // Set up events
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Speak
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (browserSupportsSpeechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return {
    speak,
    stop,
    isSpeaking,
    browserSupportsSpeechSynthesis,
  };
}

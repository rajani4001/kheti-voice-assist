
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Header } from "@/components/Header";
import { MicrophoneButton } from "@/components/MicrophoneButton";
import { VoiceWaveform } from "@/components/VoiceWaveform";
import { ConversationItem } from "@/components/ConversationItem";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { processQuery } from "@/services/agricultureService";

interface Conversation {
  id: string;
  query: string;
  response: string;
  timestamp: string;
}

const MAX_HISTORY = 5;

const Index = () => {
  const [language, setLanguage] = useState('en-IN');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [processingQuery, setProcessingQuery] = useState(false);
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  
  const { 
    isListening, 
    transcript, 
    startListening, 
    stopListening,
    browserSupportsSpeechRecognition 
  } = useSpeechRecognition({
    language,
    onResult: handleSpeechResult
  });
  
  const { 
    speak, 
    stop, 
    isSpeaking, 
    browserSupportsSpeechSynthesis 
  } = useSpeechSynthesis({ language });

  // Load conversations from localStorage on first render
  useEffect(() => {
    try {
      const savedConversations = localStorage.getItem('kheti-conversations');
      if (savedConversations) {
        setConversations(JSON.parse(savedConversations));
      }
    } catch (error) {
      console.error('Failed to load conversations from localStorage:', error);
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('kheti-conversations', JSON.stringify(conversations));
    } catch (error) {
      console.error('Failed to save conversations to localStorage:', error);
    }
  }, [conversations]);

  // Check browser support on component mount
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      toast({
        title: "Browser not supported",
        description: "Your browser doesn't support speech recognition. Try using Chrome.",
        variant: "destructive"
      });
    }

    if (!browserSupportsSpeechSynthesis) {
      toast({
        title: "Browser not supported",
        description: "Your browser doesn't support speech synthesis. Try using Chrome.",
        variant: "destructive"
      });
    }
  }, [browserSupportsSpeechRecognition, browserSupportsSpeechSynthesis]);

  async function handleSpeechResult(result: string) {
    if (!result) return;
    
    setAwaitingResponse(true);
    setProcessingQuery(true);
    
    try {
      // Send query to backend for processing
      const response = await processQuery(result);
      
      // Create new conversation item
      const newConversation: Conversation = {
        id: Date.now().toString(),
        query: result,
        response: response.text,
        timestamp: new Date().toLocaleTimeString()
      };
      
      // Add to conversation history (max 5 items)
      setConversations(prev => [newConversation, ...prev].slice(0, MAX_HISTORY));
      
      // Speak the response
      speak(response.text);
      
    } catch (error) {
      console.error("Error processing query:", error);
      toast({
        title: "Error",
        description: "Failed to process your query. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingQuery(false);
      setAwaitingResponse(false);
    }
  }

  function handleLanguageChange(newLanguage: string) {
    setLanguage(newLanguage);
    stop(); // Stop any ongoing speech when language is changed
    toast({
      title: "Language Changed",
      description: `Voice language set to ${newLanguage.split('-')[0]}`,
    });
  }

  function handleStartRecording() {
    if (isSpeaking) {
      stop(); // Stop any ongoing speech before recording
    }
    startListening();
  }

  function handlePlayResponse(text: string) {
    stop(); // Stop any ongoing speech
    speak(text);
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Header onLanguageChange={handleLanguageChange} />
      
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        <div className="flex-1 overflow-auto mb-6">
          {conversations.length > 0 ? (
            <div>
              <h2 className="text-lg font-medium mb-4">Recent Conversations</h2>
              {conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  query={conversation.query}
                  response={conversation.response}
                  timestamp={conversation.timestamp}
                  onPlayResponse={handlePlayResponse}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <p className="text-xl font-medium text-primary">Welcome to Kheti Voice Assistant!</p>
              <p className="mt-2 text-gray-600">
                Press the microphone button and ask a question about farming.
              </p>
              <p className="mt-1 text-gray-600">
                Try asking about wheat fertilizer, rice diseases, tomato pests, organic farming,
                water management, or weather forecasts.
              </p>
            </div>
          )}
        </div>
        
        <div className="sticky bottom-0 bg-cream pt-4 pb-8">
          <div className="flex flex-col items-center">
            {isListening && (
              <div className="mb-4 text-center">
                <p className="text-primary font-medium">Listening...</p>
                <p className="text-sm mt-1">{transcript || "Speak now"}</p>
              </div>
            )}
            
            {awaitingResponse && !isListening && (
              <div className="mb-4 text-center">
                <p className="text-secondary font-medium">Processing your question...</p>
              </div>
            )}
            
            <VoiceWaveform isActive={isListening || isSpeaking} />
            
            <MicrophoneButton
              onStartRecording={handleStartRecording}
              onStopRecording={stopListening}
              isListening={isListening}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

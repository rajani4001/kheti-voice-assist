
interface VoiceWaveformProps {
  isActive: boolean;
}

export function VoiceWaveform({ isActive }: VoiceWaveformProps) {
  if (!isActive) return null;
  
  return (
    <div className="flex items-center justify-center gap-1 h-16 my-4">
      <div className="wave-bar animate-wave-1"></div>
      <div className="wave-bar animate-wave-2"></div>
      <div className="wave-bar animate-wave-3"></div>
      <div className="wave-bar animate-wave-4"></div>
      <div className="wave-bar animate-wave-5"></div>
    </div>
  );
}

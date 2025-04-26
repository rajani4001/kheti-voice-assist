
import { LanguageSelector } from "./LanguageSelector";

interface HeaderProps {
  onLanguageChange: (language: string) => void;
}

export function Header({ onLanguageChange }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src="/placeholder.svg" 
            alt="Kheti Voice Assistant Logo" 
            className="w-8 h-8" 
          />
          <h1 className="text-xl font-bold text-primary">Kheti Voice</h1>
        </div>
        <LanguageSelector onLanguageChange={onLanguageChange} />
      </div>
    </header>
  );
}

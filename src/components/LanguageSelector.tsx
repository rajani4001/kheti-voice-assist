
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
}

const languages = [
  { code: 'en-IN', name: 'English' },
  { code: 'hi-IN', name: 'हिंदी (Hindi)' },
  { code: 'ta-IN', name: 'தமிழ் (Tamil)' },
  { code: 'te-IN', name: 'తెలుగు (Telugu)' },
  { code: 'bn-IN', name: 'বাংলা (Bengali)' },
];

export function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageSelect = (language: typeof languages[0]) => {
    setSelectedLanguage(language);
    onLanguageChange(language.code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-white">
          <span>{selectedLanguage.name}</span>
          <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className="flex items-center gap-2"
            onClick={() => handleLanguageSelect(language)}
          >
            {selectedLanguage.code === language.code && <Check size={16} />}
            <span className={selectedLanguage.code === language.code ? "font-medium" : ""}>
              {language.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

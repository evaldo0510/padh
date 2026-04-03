import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Pause, Play, SkipBack } from 'lucide-react';
import { Button } from './button';

interface TextReaderProps {
  text: string;
  label?: string;
  className?: string;
}

const TextReader: React.FC<TextReaderProps> = ({ text, label = 'Ouvir texto', className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = speechSynthesis.getVoices();
      // Prefer Portuguese voices, then any available
      const ptVoices = allVoices.filter(v => v.lang.startsWith('pt'));
      setVoices(ptVoices.length > 0 ? ptVoices : allVoices);
    };

    loadVoices();
    speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      speechSynthesis.cancel();
    };
  }, []);

  const getBestVoice = useCallback(() => {
    if (voices.length === 0) return null;
    // Prefer Google or Microsoft natural voices in pt-BR
    const premium = voices.find(v =>
      v.lang === 'pt-BR' && (v.name.includes('Google') || v.name.includes('Microsoft') || v.name.includes('Natural'))
    );
    if (premium) return premium;
    const ptBR = voices.find(v => v.lang === 'pt-BR');
    if (ptBR) return ptBR;
    const pt = voices.find(v => v.lang.startsWith('pt'));
    if (pt) return pt;
    return voices[0];
  }, [voices]);

  const handlePlay = useCallback(() => {
    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    speechSynthesis.cancel();

    const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voice = getBestVoice();
    if (voice) utterance.voice = voice;
    utterance.lang = 'pt-BR';
    utterance.rate = 0.92;
    utterance.pitch = 1.05;

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  }, [text, isPaused, getBestVoice]);

  const handlePause = useCallback(() => {
    speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const handleStop = useCallback(() => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {!isPlaying && !isPaused && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePlay}
          className="gap-2 text-primary hover:text-primary hover:bg-primary/10 text-xs"
          title={label}
        >
          <Volume2 className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      )}
      {isPlaying && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePause}
          className="gap-2 text-primary hover:text-primary hover:bg-primary/10 text-xs"
        >
          <Pause className="h-4 w-4" />
          <span className="hidden sm:inline">Pausar</span>
        </Button>
      )}
      {isPaused && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePlay}
          className="gap-2 text-primary hover:text-primary hover:bg-primary/10 text-xs"
        >
          <Play className="h-4 w-4" />
          <span className="hidden sm:inline">Continuar</span>
        </Button>
      )}
      {(isPlaying || isPaused) && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleStop}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          title="Parar"
        >
          <VolumeX className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default TextReader;

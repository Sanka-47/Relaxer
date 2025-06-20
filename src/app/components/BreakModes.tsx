'use client';

import { useState, useEffect } from 'react';
import BreathingCircle from './BreathingCircle';

type BreakMode = 'breathing' | 'bodyScan' | 'mindfulListening';

const bodyScanPrompts = [
  'Notice how your feet feel on the floor',
  'Feel the weight of your legs',
  'Bring attention to your posture',
  'Notice any tension in your shoulders',
  'Feel the weight of your hands',
  'Observe your facial expression'
];

const listeningPrompts = [
  'Close your eyes',
  'Listen for the furthest sound you can hear',
  'Notice a sound coming from nearby',
  'Try to identify three distinct sounds',
  'Focus on the quietest sound you can hear'
];

type BreakModesProps = {
  mode: BreakMode;
  isActive: boolean;
  onComplete?: () => void;
};

export default function BreakModes({ mode, isActive, onComplete }: BreakModesProps) {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setCurrentPromptIndex(0);
      return;
    }

    const prompts = mode === 'bodyScan' ? bodyScanPrompts : listeningPrompts;
    const interval = setInterval(() => {
      setCurrentPromptIndex(prev => {
        const next = prev + 1;
        if (next >= prompts.length) {
          clearInterval(interval);
          onComplete?.();
          return prev;
        }
        return next;
      });
    }, 10000); // Change prompt every 10 seconds

    return () => clearInterval(interval);
  }, [isActive, mode, onComplete]);

  if (mode === 'breathing') {
    return <BreathingCircle isBreaking={isActive} onBreakComplete={onComplete} />;
  }

  const prompts = mode === 'bodyScan' ? bodyScanPrompts : listeningPrompts;

  return (
    <div className="text-center space-y-8">
      <div className="text-2xl font-light text-white/90 h-20 flex items-center justify-center">
        {prompts[currentPromptIndex]}
      </div>
      {mode === 'mindfulListening' && (
        <div className="text-6xl animate-pulse">👂</div>
      )}
      {mode === 'bodyScan' && (
        <div className="text-6xl animate-pulse">🧘</div>
      )}
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';

type Mood = 'stressed' | 'tired' | 'anxious' | 'unfocused';
type Mode = 'breathing' | 'bodyScan' | 'mindfulListening';

interface ChromaTherapyProps {
  mood?: Mood;
  mode: Mode;
  isActive: boolean;
}

const colorPalettes = {
  breathing: {
    default: ['from-blue-400', 'to-blue-600'],
    stressed: ['from-blue-500', 'to-indigo-600'],
    anxious: ['from-green-400', 'to-blue-500'],
    tired: ['from-yellow-400', 'to-orange-500'],
    unfocused: ['from-purple-400', 'to-indigo-500']
  },
  bodyScan: {
    default: ['from-green-400', 'to-green-600'],
    stressed: ['from-teal-400', 'to-green-500'],
    anxious: ['from-emerald-400', 'to-teal-500'],
    tired: ['from-orange-400', 'to-yellow-500'],
    unfocused: ['from-blue-400', 'to-green-500']
  },
  mindfulListening: {
    default: ['from-purple-400', 'to-purple-600'],
    stressed: ['from-indigo-400', 'to-purple-500'],
    anxious: ['from-blue-400', 'to-purple-500'],
    tired: ['from-rose-400', 'to-purple-500'],
    unfocused: ['from-violet-400', 'to-purple-500']
  }
};

export default function ChromaTherapy({ mood, mode, isActive }: ChromaTherapyProps) {
  const [currentPalette, setCurrentPalette] = useState(colorPalettes[mode].default);
  const [transitionIndex, setTransitionIndex] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const palette = mood ? colorPalettes[mode][mood] : colorPalettes[mode].default;
    const transitionDuration = 10000; // 10 seconds for each color transition

    const interval = setInterval(() => {
      setTransitionIndex((prev) => (prev + 1) % palette.length);
    }, transitionDuration);

    setCurrentPalette(palette);

    return () => clearInterval(interval);
  }, [mood, mode, isActive]);

  return (
    <div
      className={`fixed inset-0 transition-colors duration-[10000ms] ease-in-out bg-gradient-to-b ${currentPalette.join(' ')}`}
      style={{ zIndex: -1 }}
    />
  );
}
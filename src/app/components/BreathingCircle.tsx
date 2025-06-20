'use client';

import { useEffect, useState } from 'react';

type BreathingCircleProps = {
  isBreaking: boolean;
  onBreakComplete?: () => void;
};

export default function BreathingCircle({ isBreaking, onBreakComplete }: BreathingCircleProps) {
  const [scale, setScale] = useState(1);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  useEffect(() => {
    if (!isBreaking) {
      setScale(1);
      setPhase('inhale');
      return;
    }

    const breathingCycle = () => {
      // Inhale: 4 seconds
      setPhase('inhale');
      setScale(2);
      
      setTimeout(() => {
        // Hold: 2 seconds
        setPhase('hold');
        
        setTimeout(() => {
          // Exhale: 6 seconds
          setPhase('exhale');
          setScale(1);
        }, 2000);
      }, 4000);
    };

    // Start the first cycle immediately
    breathingCycle();

    // Set up recurring cycles every 12 seconds (4s inhale + 2s hold + 6s exhale)
    const intervalId = setInterval(breathingCycle, 12000);

    return () => clearInterval(intervalId);
  }, [isBreaking]);

  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-[4000ms] ease-in-out
          ${phase === 'inhale' ? 'scale-[2]' : phase === 'exhale' ? 'scale-[1]' : ''}`}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/70 text-sm">
        {phase === 'inhale' ? 'Breathe In' : phase === 'hold' ? 'Hold' : 'Breathe Out'}
      </div>
    </div>
  );
}
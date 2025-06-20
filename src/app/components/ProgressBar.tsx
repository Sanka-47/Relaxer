'use client';

import { useEffect, useState } from 'react';

type ProgressBarProps = {
  duration: number; // Duration in seconds
  isActive: boolean;
  onComplete?: () => void;
};

export default function ProgressBar({ duration, isActive, onComplete }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setProgress(0);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / (duration * 1000)) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, duration, onComplete]);

  return (
    <div className="w-full max-w-md h-1 bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-white/30 transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
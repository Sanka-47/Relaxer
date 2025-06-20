'use client';

import { useState, useEffect } from 'react';
import { SettingsProvider } from './contexts/SettingsContext';
import BreakModes from './components/BreakModes';
import ProgressBar from './components/ProgressBar';
import SettingsPanel from './components/SettingsPanel';
import SoundManager from './components/SoundManager';
import Affirmation from './components/Affirmation';
import { useSettings } from './contexts/SettingsContext';
import ReminderSettings from './components/ReminderSettings';
import MoodSelector from './components/MoodSelector';
import ChromaTherapy from './components/ChromaTherapy';
import AudioPreloader from './components/AudioPreloader';

// Register service worker
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered successfully');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};

function BreakApp() {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  const [isBreaking, setIsBreaking] = useState(false);
  const [breakMode, setBreakMode] = useState<'breathing' | 'bodyScan' | 'mindfulListening'>('breathing');
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [currentMood, setCurrentMood] = useState<'stressed' | 'tired' | 'anxious' | 'unfocused' | null>(null);
  const { settings } = useSettings();

  const handleBreakComplete = () => {
    setIsBreaking(false);
    setShowAffirmation(true);
    setTimeout(() => setShowAffirmation(false), 5000); // Hide affirmation after 5 seconds
  };

  const startBreak = (mode: 'breathing' | 'bodyScan' | 'mindfulListening') => {
    setBreakMode(mode);
    setIsBreaking(true);
    setShowAffirmation(false);
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <ChromaTherapy mood={currentMood} mode={breakMode} isActive={isBreaking} />
      <main className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen gap-8 relative">
        <SoundManager isPlaying={isBreaking} />
        <SettingsPanel />
        <ReminderSettings />

        {showAffirmation ? (
          <Affirmation type={Math.random() > 0.5 ? 'quote' : 'affirmation'} />
        ) : !isBreaking ? (
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-bold mb-4">Time to Reset</h1>
            <p className="text-lg text-white/80 max-w-md mx-auto">
              Let's personalize your mindful break experience.
            </p>
            <MoodSelector
              onMoodSelect={(mood, recommendedMode) => {
                setCurrentMood(mood);
                setBreakMode(recommendedMode);
                startBreak(recommendedMode);
              }}
            />
          </div>
        ) : (
          <div className="space-y-12 w-full max-w-md mx-auto">
            <BreakModes
              mode={breakMode}
              isActive={isBreaking}
              onComplete={handleBreakComplete}
            />
            <ProgressBar
              duration={settings.duration}
              isActive={isBreaking}
              onComplete={handleBreakComplete}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <SettingsProvider>
      <AudioPreloader />
      <BreakApp />
    </SettingsProvider>
  );
}

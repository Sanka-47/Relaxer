'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Duration = 60 | 180 | 300; // 1, 3, or 5 minutes
type Sound = 'none' | 'rain' | 'forest' | 'ocean';

interface Settings {
  theme: Theme;
  duration: Duration;
  sound: Sound;
  isSoundEnabled: boolean;
}

interface SettingsContextType {
  settings: Settings;
  updateTheme: (theme: Theme) => void;
  updateDuration: (duration: Duration) => void;
  updateSound: (sound: Sound) => void;
  toggleSound: () => void;
}

const defaultSettings: Settings = {
  theme: 'dark',
  duration: 60,
  sound: 'none',
  isSoundEnabled: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('breakSettings');
      return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('breakSettings', JSON.stringify(settings));
  }, [settings]);

  const updateTheme = (theme: Theme) => {
    setSettings(prev => ({ ...prev, theme }));
  };

  const updateDuration = (duration: Duration) => {
    setSettings(prev => ({ ...prev, duration }));
  };

  const updateSound = (sound: Sound) => {
    setSettings(prev => ({ ...prev, sound }));
  };

  const toggleSound = () => {
    setSettings(prev => ({ ...prev, isSoundEnabled: !prev.isSoundEnabled }));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateTheme,
        updateDuration,
        updateSound,
        toggleSound,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
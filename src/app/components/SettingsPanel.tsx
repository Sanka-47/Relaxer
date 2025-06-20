'use client';

import { useSettings } from '../contexts/SettingsContext';

export default function SettingsPanel() {
  const { settings, updateTheme, updateDuration, updateSound, toggleSound } = useSettings();

  return (
    <div className="fixed top-4 right-4 bg-white/10 backdrop-blur-lg rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm text-white/80">Theme:</label>
        <select
          value={settings.theme}
          onChange={(e) => updateTheme(e.target.value as 'light' | 'dark')}
          className="bg-white/20 rounded px-2 py-1 text-sm [&>option]:text-black [&]:text-white"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="flex items-center justify-between gap-4">
        <label className="text-sm text-white/80">Duration:</label>
        <select
          value={settings.duration}
          onChange={(e) => updateDuration(Number(e.target.value) as 60 | 180 | 300)}
          className="bg-white/20 rounded px-2 py-1 text-sm [&>option]:text-black [&]:text-white"
        >
          <option value="60">1 Minute</option>
          <option value="180">3 Minutes</option>
          <option value="300">5 Minutes</option>
        </select>
      </div>

      <div className="flex items-center justify-between gap-4">
        <label className="text-sm text-white/80">Sound:</label>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className={`p-1 rounded ${settings.isSoundEnabled ? 'bg-white/30' : 'bg-white/10'}`}
            aria-label={settings.isSoundEnabled ? 'Mute sound' : 'Unmute sound'}
          >
            {settings.isSoundEnabled ? '🔊' : '🔇'}
          </button>
          <select
            value={settings.sound}
            onChange={(e) => updateSound(e.target.value as 'none' | 'rain' | 'forest' | 'ocean')}
            className="bg-white/20 rounded px-2 py-1 text-sm [&>option]:text-black [&]:text-white"
            disabled={!settings.isSoundEnabled}
          >
            <option value="none">None</option>
            <option value="rain">Rain</option>
            <option value="forest">Forest</option>
            <option value="ocean">Ocean</option>
          </select>
        </div>
      </div>
    </div>
  );
}
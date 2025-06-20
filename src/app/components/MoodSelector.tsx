'use client';

import { useState } from 'react';

type Mood = 'stressed' | 'tired' | 'anxious' | 'unfocused';

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood, recommendedMode: 'breathing' | 'bodyScan' | 'mindfulListening') => void;
}

const moodRecommendations: Record<Mood, {
  emoji: string;
  mode: 'breathing' | 'bodyScan' | 'mindfulListening';
  description: string;
  colors: string[];
}> = {
  stressed: {
    emoji: '😫',
    mode: 'breathing',
    description: 'A calming box breathing exercise to reduce stress',
    colors: ['from-blue-400', 'to-blue-600']
  },
  tired: {
    emoji: '🥱',
    mode: 'bodyScan',
    description: 'An energizing body scan to boost your energy',
    colors: ['from-yellow-400', 'to-orange-500']
  },
  anxious: {
    emoji: '😟',
    mode: 'breathing',
    description: 'A grounding breathing exercise to ease anxiety',
    colors: ['from-green-400', 'to-green-600']
  },
  unfocused: {
    emoji: '😵‍💫',
    mode: 'mindfulListening',
    description: 'A mindful listening session to improve focus',
    colors: ['from-purple-400', 'to-purple-600']
  }
};

export default function MoodSelector({ onMoodSelect }: MoodSelectorProps) {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    const recommendation = moodRecommendations[mood];
    onMoodSelect(mood, recommendation.mode);
  };

  return (
    <div className="w-full max-w-md mx-auto text-center space-y-6">
      <h2 className="text-2xl font-semibold mb-4">How are you feeling?</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(moodRecommendations).map(([mood, info]) => (
          <button
            key={mood}
            onClick={() => handleMoodSelect(mood as Mood)}
            className={`p-4 rounded-lg bg-gradient-to-r ${info.colors.join(' ')} 
              hover:opacity-90 transition-all duration-200
              ${selectedMood === mood ? 'ring-4 ring-white ring-opacity-50' : ''}`}
          >
            <div className="text-3xl mb-2">{info.emoji}</div>
            <div className="font-medium capitalize">{mood}</div>
          </button>
        ))}
      </div>
      {selectedMood && (
        <p className="text-sm text-white/80 mt-4">
          Recommended: {moodRecommendations[selectedMood].description}
        </p>
      )}
    </div>
  );
}
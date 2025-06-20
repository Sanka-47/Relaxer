'use client';

import { useEffect } from 'react';

const soundUrls = {
  rain: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1fb4ef3937.mp3',
  forest: 'https://cdn.pixabay.com/download/audio/2021/10/25/audio_f8364c8b05.mp3',
  ocean: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d9046b0a0d.mp3'
};

export default function AudioPreloader() {
  useEffect(() => {
    // Preload all audio files
    Object.values(soundUrls).forEach(url => {
      const audio = new Audio();
      audio.preload = 'auto';
      audio.src = url;
      // Trigger loading without playing
      audio.load();
    });
  }, []);

  return null; // This component doesn't render anything
}
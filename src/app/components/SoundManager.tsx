'use client';

import { useEffect, useRef } from 'react';
import { useSettings } from '../contexts/SettingsContext';

type SoundManagerProps = {
  isPlaying: boolean;
};

const soundUrls = {
  rain: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_1fb4ef3937.mp3',
  forest: 'https://cdn.pixabay.com/download/audio/2021/10/25/audio_f8364c8b05.mp3',
  ocean: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d9046b0a0d.mp3'
};

export default function SoundManager({ isPlaying }: SoundManagerProps) {
  const { settings } = useSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const initializeAudio = async () => {
      if (!settings.isSoundEnabled || settings.sound === 'none') {
        audioRef.current?.pause();
        return;
      }

      try {
        if (!audioRef.current) {
          audioRef.current = new Audio();
          audioRef.current.loop = true;
          audioRef.current.volume = 0.3;
          audioRef.current.preload = 'auto';
        }

        audioRef.current.src = soundUrls[settings.sound as keyof typeof soundUrls];
        await audioRef.current.load();

        if (isPlaying) {
          const playPromise = audioRef.current.play();
          await playPromise;
        } else {
          audioRef.current.pause();
        }
      } catch (error) {
        console.error('Audio initialization failed:', error);
      }
    };

    initializeAudio();

    return () => {
      audioRef.current?.pause();
    };
  }, [isPlaying, settings.isSoundEnabled, settings.sound]);

  // Update audio source when sound selection changes
  useEffect(() => {
    if (!audioRef.current || settings.sound === 'none') return;

    const wasPlaying = !audioRef.current.paused;
    audioRef.current.src = soundUrls[settings.sound as keyof typeof soundUrls];
    
    if (wasPlaying && settings.isSoundEnabled) {
      audioRef.current.play().catch(error => {
        console.log('Audio playback failed:', error);
      });
    }
  }, [settings.sound]);

  return null; // This component doesn't render anything
}
'use client';

import { useEffect, useRef } from 'react';
import { useSettings } from '../contexts/SettingsContext';

type SoundManagerProps = {
  isPlaying: boolean;
};

const soundUrls = {
  rain: '/sounds/rain.mp3',
  forest: '/sounds/forest.mp3',
  ocean: '/sounds/ocean.mp3'
};

export default function SoundManager({ isPlaying }: SoundManagerProps) {
  const { settings } = useSettings();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const initializeAudio = async () => {
      if (!settings.isSoundEnabled || settings.sound === 'none') {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        return;
      }

      try {
        if (!audioRef.current) {
          const audio = new Audio();
          audio.loop = true;
          audio.volume = 0.3;
          audio.preload = 'auto';
          audio.crossOrigin = 'anonymous';
          audioRef.current = audio;
        }

        const soundUrl = soundUrls[settings.sound as keyof typeof soundUrls];
        if (audioRef.current.src !== window.location.origin + soundUrl) {
          audioRef.current.src = soundUrl;
          await new Promise((resolve) => {
            audioRef.current!.addEventListener('canplaythrough', resolve, { once: true });
            audioRef.current!.load();
          });
        }

        if (isPlaying) {
          try {
            await audioRef.current.play();
          } catch (playError) {
            console.error('Audio playback failed:', playError);
          }
        } else {
          audioRef.current.pause();
        }
      } catch (error) {
        console.error('Audio initialization failed:', error);
      }
    };

    initializeAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
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
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import useSound from 'use-sound';

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playRankUp: () => void;
  playRankDown: () => void;
  playTopSpot: () => void;
  playUnlock: () => void;
  playSuccess: () => void;
  playError: () => void;
  playTransition: () => void;
  bgMusicVolume: number;
  setBgMusicVolume: (volume: number) => void;
}

const SoundContext = createContext<SoundContextType>({
  isMuted: true,
  toggleMute: () => {},
  playHover: () => {},
  playClick: () => {},
  playRankUp: () => {},
  playRankDown: () => {},
  playTopSpot: () => {},
  playUnlock: () => {},
  playSuccess: () => {},
  playError: () => {},
  playTransition: () => {},
  bgMusicVolume: 0.3,
  setBgMusicVolume: () => {},
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('soundMuted');
    return saved ? JSON.parse(saved) : true;
  });
  const [bgMusicVolume, setBgMusicVolume] = useState(0.3);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  // UI Sound Effects with lower volumes for a calmer experience
  const [playHoverSound] = useSound('https://assets.mixkit.co/sfx/preview/mixkit-interface-hint-notification-911.mp3', { volume: 0.1 });
  const [playClickSound] = useSound('https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-3124.mp3', { volume: 0.15 });
  const [playRankUpSound] = useSound('https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3', { volume: 0.2 });
  const [playRankDownSound] = useSound('https://assets.mixkit.co/sfx/preview/mixkit-interface-option-select-2573.mp3', { volume: 0.2 });
  const [playTopSpotSound] = useSound('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3', { volume: 0.25 });
  const [playUnlockSound] = useSound('https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3', { volume: 0.2 });
  const [playSuccessSound] = useSound('https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3', { volume: 0.2 });
  const [playErrorSound] = useSound('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-remove-2576.mp3', { volume: 0.2 });
  const [playTransitionSound] = useSound('https://assets.mixkit.co/sfx/preview/mixkit-fast-small-sweep-transition-166.mp3', { volume: 0.15 });

  // Helper function to ensure volume is within valid range
  const clampVolume = (vol: number): number => {
    return Math.max(0, Math.min(1, vol));
  };

  useEffect(() => {
    // Initialize background music with a calming ambient track
    bgMusicRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8b8236731.mp3?filename=ambient-piano-amp-strings-10711.mp3');
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = clampVolume(bgMusicVolume * 0.5); // Reduce the base volume for background music

    const fadeIn = () => {
      if (bgMusicRef.current && !isMuted) {
        let vol = 0;
        bgMusicRef.current.volume = vol;
        
        const fadeInterval = setInterval(() => {
          if (bgMusicRef.current && vol < bgMusicVolume * 0.5) {
            vol = clampVolume(vol + 0.05);
            bgMusicRef.current.volume = vol;
          } else {
            clearInterval(fadeInterval);
          }
        }, 200);
      }
    };

    const fadeOut = () => {
      if (bgMusicRef.current) {
        let vol = bgMusicRef.current.volume;
        
        const fadeInterval = setInterval(() => {
          if (bgMusicRef.current && vol > 0) {
            vol = clampVolume(vol - 0.05);
            bgMusicRef.current.volume = vol;
          } else {
            clearInterval(fadeInterval);
            if (bgMusicRef.current) {
              bgMusicRef.current.pause();
            }
          }
        }, 200);
      }
    };

    return () => {
      if (bgMusicRef.current) {
        fadeOut();
        bgMusicRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('soundMuted', JSON.stringify(isMuted));
    if (bgMusicRef.current) {
      if (isMuted) {
        const fadeOut = () => {
          let vol = bgMusicRef.current?.volume || 0;
          
          const fadeInterval = setInterval(() => {
            if (bgMusicRef.current && vol > 0) {
              vol = clampVolume(vol - 0.05);
              bgMusicRef.current.volume = vol;
            } else {
              clearInterval(fadeInterval);
              if (bgMusicRef.current) {
                bgMusicRef.current.pause();
              }
            }
          }, 200);
        };
        fadeOut();
      } else {
        const fadeIn = () => {
          let vol = 0;
          bgMusicRef.current!.volume = vol;
          
          const playPromise = bgMusicRef.current!.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Auto-play was prevented
            });
          }

          const fadeInterval = setInterval(() => {
            if (bgMusicRef.current && vol < bgMusicVolume * 0.5) {
              vol = clampVolume(vol + 0.05);
              bgMusicRef.current.volume = vol;
            } else {
              clearInterval(fadeInterval);
            }
          }, 200);
        };
        fadeIn();
      }
    }
  }, [isMuted]);

  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = clampVolume(bgMusicVolume * 0.5); // Keep the background music at half the main volume
    }
  }, [bgMusicVolume]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const playHover = () => !isMuted && playHoverSound();
  const playClick = () => !isMuted && playClickSound();
  const playRankUp = () => !isMuted && playRankUpSound();
  const playRankDown = () => !isMuted && playRankDownSound();
  const playTopSpot = () => !isMuted && playTopSpotSound();
  const playUnlock = () => !isMuted && playUnlockSound();
  const playSuccess = () => !isMuted && playSuccessSound();
  const playError = () => !isMuted && playErrorSound();
  const playTransition = () => !isMuted && playTransitionSound();

  return (
    <SoundContext.Provider value={{
      isMuted,
      toggleMute,
      playHover,
      playClick,
      playRankUp,
      playRankDown,
      playTopSpot,
      playUnlock,
      playSuccess,
      playError,
      playTransition,
      bgMusicVolume,
      setBgMusicVolume,
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSoundContext = () => useContext(SoundContext);
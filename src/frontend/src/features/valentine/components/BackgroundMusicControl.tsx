import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import { ASSETS } from '../content/assets';

export function BackgroundMusicControl() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(ASSETS.music);
    audio.loop = true;
    audioRef.current = audio;

    // Attempt autoplay (may be blocked by browser)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked, user will need to click play
          setIsPlaying(false);
        });
    }

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Handle play error
      });
    }
  };

  return (
    <div className="fixed right-4 top-4 z-50">
      <Button
        onClick={togglePlay}
        size="icon"
        variant="outline"
        className="h-12 w-12 rounded-full bg-white/90 shadow-lg backdrop-blur-sm hover:bg-white dark:bg-pink-950/90 dark:hover:bg-pink-950"
      >
        {isPlaying ? (
          <Volume2 className="h-5 w-5 text-pink-600 dark:text-pink-400" />
        ) : (
          <VolumeX className="h-5 w-5 text-pink-600 dark:text-pink-400" />
        )}
      </Button>
    </div>
  );
}

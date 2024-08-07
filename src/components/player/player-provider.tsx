'use client';
import {
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from 'react';

type PlayerRootProps = {
  audioUrl: string;
} & PropsWithChildren;

type PlayerContextProps = {
  togglePlayAndPause: () => void;
  isPlaying: boolean;
};

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('cant use usePlayer outside a PlayerProvider');
  }

  return context;
};

export const PlayerRoot = ({ audioUrl, children }: PlayerRootProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleOnEndAudio = () => {
    setIsPlaying(false);
  };

  const togglePlayAndPause = () => {
    setIsPlaying(prevState => !prevState);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    if (audioRef.current.volume === 1) {
      audioRef.current.volume = 0.3;
    }

    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  return (
    <PlayerContext.Provider value={{ isPlaying, togglePlayAndPause }}>
      <audio ref={audioRef} src={audioUrl} onEnded={handleOnEndAudio} />
      {children}
    </PlayerContext.Provider>
  );
};

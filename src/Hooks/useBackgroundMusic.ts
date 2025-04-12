import { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";

export const MAX_VOLUME = 0.4;

const useBackgroundMusic = () => {
  const [playedMusic, setPlayedMusic] = useState<boolean>(false);
  const [prevVolume, setPrevVolume] = useState<number>(MAX_VOLUME / 2);
  const [currentVolume, setCurrentVolume] = useState<number>(
    isMobile ? MAX_VOLUME / 2 : 0
  );
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const musicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (musicRef.current) {
      musicRef.current.volume = currentVolume;
    }
  }, [musicRef, currentVolume]);

  // starts music if not already started
  const playMusic = () => {
    if (!playedMusic && musicRef.current) {
      setPlayedMusic(true);
      musicRef.current.play();
      setIsMuted(false);
    }
  };

  // mutes the volume
  const toggleMute = () => {
    playMusic();

    // mobile protocols don't allow web apps to change audio volume
    if (isMobile) {
      if (musicRef.current) {
        if (musicRef.current.paused) {
          console.log("play");
          musicRef.current.play();
          setIsMuted(false);
        } else {
          console.log("pause");
          musicRef.current.pause();
          setIsMuted(true);
        }
      }
    } else {
      if (currentVolume === 0 && prevVolume !== 0) {
        setCurrentVolume(prevVolume);
        setIsMuted(false);
      } else if (currentVolume === 0) {
        setCurrentVolume(prevVolume);
        setIsMuted(false);
      } else {
        setPrevVolume(currentVolume);
        setCurrentVolume(0);
        setIsMuted(true);
      }
    }
  };

  // Sets the volume to the provided value
  const setVolume = (val: number) => {
    playMusic();

    if (val === 0) {
      setCurrentVolume(0);
      setPrevVolume(MAX_VOLUME / 2);
      setIsMuted(true);
    } else {
      setCurrentVolume(val);
      setPrevVolume(val);
      setIsMuted(false);
    }
  };

  return { currentVolume, isMuted, setVolume, toggleMute, musicRef };
};

export default useBackgroundMusic;

import { useState, useCallback } from 'react';

export const useVideoControls = (initialDuration = 100) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(initialDuration);

  const handleTimeUpdate = useCallback((newTime) => {
    setCurrentTime(newTime);
  }, []);

  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  return {
    isPlaying,
    currentTime,
    duration,
    handleTimeUpdate,
    formatTime,
    togglePlayPause,
    setDuration
  };
};

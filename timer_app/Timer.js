// Timer.js
import React, { useState, useEffect } from 'react';

const Timer = ({ isActive, isPaused, onDuration }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        onDuration(seconds + 1); // Callback for parent to receive duration updates
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    } else if (isPaused) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, seconds, onDuration]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return [hours, minutes, sec]
      .map(v => v < 10 ? "0" + v : v)
      .join(":");
  };

  return (
    <div>
      {formatTime(seconds)}
    </div>
  );
};

export default Timer;

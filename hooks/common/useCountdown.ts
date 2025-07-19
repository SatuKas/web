import dayjs from '@/libs/dayjs';
import { useEffect, useMemo, useState } from 'react';

/**
 * Custom hook to manage a countdown timer.
 *
 * @param {number} initialSeconds - The initial number of seconds for the countdown.
 * @returns {Object} An object containing:
 * - `seconds`: The current number of seconds remaining in the countdown.
 * - `isActive`: A boolean indicating if the countdown is currently active.
 * - `startCountdown`: A function to start the countdown.
 * - `formattedTime`: A string representing the formatted time in "MM:SS" format.
 */
const useCountdown = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  /**
   * Starts the countdown by setting the initial seconds and activating the timer.
   */
  const startCountdown = () => {
    setSeconds(initialSeconds);
    setIsActive(true);
  };

  /**
   * Memoized value that formats the remaining time into a "MM:SS" string.
   */
  const formattedTime = useMemo((): string => {
    const duration = dayjs.duration(seconds, 'seconds');
    const minutes = duration.minutes().toString().padStart(2, '0');
    const remainingSeconds = duration.seconds().toString().padStart(2, '0');
    return `${minutes}:${remainingSeconds}`;
  }, [seconds]);

  return {
    seconds,
    isActive,
    startCountdown,
    formattedTime,
  };
};

export default useCountdown;

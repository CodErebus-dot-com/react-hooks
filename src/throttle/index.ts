import { useState, useEffect, useRef } from "react";

export const useThrottle = <T>(value: T, delay: number = 500): T => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastUpdated = useRef(Date.now());

  useEffect(() => {
    const now = Date.now();
    if (lastUpdated.current && now >= lastUpdated.current + delay) {
      lastUpdated.current = now;
      setThrottledValue(value);
    } else {
      const id = window.setTimeout(() => {
        lastUpdated.current = now;
        setThrottledValue(value);
      }, delay);

      return () => window.clearTimeout(id);
    }
  }, [value, delay]);

  return throttledValue;
};

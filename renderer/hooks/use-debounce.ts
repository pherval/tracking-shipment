import { useEffect, useState } from "react";

export default function useDebounce<T>(
  value: T,
  callback?: { (value: T): void },
  delay: number = 500
): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      callback?.(value);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, callback]);

  return debouncedValue;
}

import {
  useEffect,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from "react";
import { getItem } from "../storage";

type SetValue<T> = Dispatch<SetStateAction<T>>;

export default function useStorage<T>(
  key: string,
  initialValue: T
): [T | undefined, SetValue<T | undefined>] {
  const readValue = useCallback((): T => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      return getItem(key) ?? initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T | undefined>(readValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T | undefined> = useCallback(
    (value) => {
      // Prevent build error "window is undefined" but keeps working
      if (typeof window === "undefined") {
        console.warn(
          `Tried setting localStorage key “${key}” even though environment is not a client`
        );
      }

      try {
        // Allow value to be a function so we have the same API as useState
        const newValue = value instanceof Function ? value(storedValue) : value;

        setItem(key, newValue);
        setStoredValue(newValue);
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    setStoredValue(storedValue);
  }, [storedValue]);

  return [storedValue, setValue];
}

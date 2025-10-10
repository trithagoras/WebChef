import { useState, useEffect, useCallback } from "react";

const useLocalStorage = (
  storageKey: string,
  initialValue: string
): [string, (newValue: string) => void] => {
  const [value, setValue] = useState<string>(initialValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const item = window.localStorage.getItem(storageKey);
      if (item !== null) {
        setValue(item);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, [storageKey]);

  const saveValue = useCallback((newValue: string) => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(storageKey, newValue);
      setValue(newValue);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [storageKey]);

  return [value, saveValue];
};

export default useLocalStorage;

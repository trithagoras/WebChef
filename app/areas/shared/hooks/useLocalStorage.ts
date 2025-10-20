import { useState, useCallback } from "react";
import { StorageKey } from "./useStorage";

export type LocalStorageKey = "useEndpoint" | "endpoint" | StorageKey;

export const getLocalStorageItem = <T>(key: LocalStorageKey) => {
  const res = window.localStorage.getItem(key);
  if (res === null) return undefined;
  try {
    return JSON.parse(res) as T;
  } catch (err) {
    console.log(err);
  }
  return undefined;
};

const useLocalStorage = <T>(storageKey: LocalStorageKey): [T | undefined, (newValue: T | undefined) => void] => {
  const readValue = (): T | undefined => {
    if (typeof window === "undefined") return undefined;
    try {
      const item = window.localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return undefined;
    }
  };

  const [value, setValue] = useState<T | undefined>(readValue);

  const saveValue = useCallback((newValue: T | undefined) => {
    if (typeof window === "undefined") return;
    if (newValue === undefined) {
      window.localStorage.removeItem(storageKey);
      setValue(undefined);
    } else {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(newValue));
        setValue(newValue);
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    }
  }, [storageKey]);

  return [value, saveValue];
};

export default useLocalStorage;

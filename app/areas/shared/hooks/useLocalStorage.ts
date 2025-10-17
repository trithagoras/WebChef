import { useState, useEffect, useCallback } from "react";

export type LocalStorageKey = "recipesJson" | "queryText" | "useDb" | "connectionString";

export const getLocalStorageItem = <T>(key: LocalStorageKey) => {
  const res = window.localStorage.getItem(key);
  if (res) {
    try {
      return JSON.parse(res) as T;
    } catch (err) {
      console.log(err);
      // TODO: something here...
    }
  }
  return undefined;
};

const useLocalStorage = <T>(
  storageKey: LocalStorageKey,
  initialValue: T
): [T, (newValue: T | undefined) => void] => {
  const [value, setValue] = useState<T>(initialValue);

  const saveValue = useCallback((newValue: T | undefined) => {
    if (typeof window === "undefined") return;

    if (newValue === undefined) {
      window.localStorage.removeItem(storageKey);
      setValue(initialValue);
      return;
    }

    try {
      const s = JSON.stringify(newValue);
      window.localStorage.setItem(storageKey, s);
      setValue(newValue);
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [initialValue, storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const item = window.localStorage.getItem(storageKey);
      if (item !== null) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      // clears the localStorage value - destructive!
      saveValue(undefined);
    }
  }, [saveValue, storageKey]);

  return [value, saveValue];
};

export default useLocalStorage;

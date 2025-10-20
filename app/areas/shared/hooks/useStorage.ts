import { useState, useEffect, useCallback } from "react";
import useLocalStorage, { getLocalStorageItem } from "./useLocalStorage";
import toast from "react-hot-toast";

export type StorageKey = "recipesJson" | "queryText";

export const getStorageItem = async (key: StorageKey) => {
  const usingEndpoint = getLocalStorageItem<boolean>("useEndpoint") === true;
  if (!usingEndpoint) {
    return getLocalStorageItem<string>(key);
  }

  const endpoint = getLocalStorageItem<string>("endpoint");

  try {
    if (!endpoint) {
      throw new Error("Endpoint is not configured.");
    }
    const res = await fetch(new URL(key, endpoint));
    const json = await res.json();
    return json as string;
  } catch (err) {
    toast.error('Fetching from endpoint failed.');
    console.error(err);
    return undefined;
  }
};

const useStorage = (key: StorageKey) => {
  const [useEndpoint] = useLocalStorage<boolean>("useEndpoint");
  const [endpoint] = useLocalStorage<string>("endpoint");
  const [localValue, setLocalValue] = useLocalStorage<string>(key);
  const [value, setValue] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  // Fetch value from endpoint on mount if using remote
  useEffect(() => {
    const fetchRemoteValue = async () => {
      if (!useEndpoint || !endpoint) {
        setValue(localValue);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(new URL(key, endpoint));
        const json = await res.json();
        const remoteValue = json;
        setValue(remoteValue);
      } catch (err) {
        console.error("Failed to fetch from remote endpoint:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemoteValue();
  }, [useEndpoint, endpoint, key, localValue]);

  const saveValue = useCallback(
    async (newValue: string | undefined) => {
      if (!useEndpoint || !endpoint) {
        setLocalValue(newValue);
        setValue(newValue);
        return;
      }

      try {
        await fetch(new URL(key, endpoint), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newValue),
        });

        setValue(newValue);
      } catch (err) {
        console.error("Failed to write to remote endpoint:", err);
      }
    },
    [useEndpoint, endpoint, setLocalValue, key]
  );

  return { value, saveValue, isLoading, error };
};

export default useStorage;

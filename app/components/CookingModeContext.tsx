'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CookingModeContextType {
  cookingMode: boolean;
  toggleCookingMode: () => void;
}

const CookingModeContext = createContext<CookingModeContextType | undefined>(undefined);

export const CookingModeProvider = ({ children }: { children: ReactNode }) => {
  const [cookingMode, setCookingMode] = useState(false);
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  useEffect(() => {
    if (cookingMode) {
      navigator.wakeLock?.request('screen').then(lock => {
        setWakeLock(lock);
        lock.addEventListener('release', () => setWakeLock(null));
      }).catch(err => {
        console.error('WakeLock error:', err);
      });
    } else {
      wakeLock?.release();
      setWakeLock(null);
    }
    return () => {
      wakeLock?.release();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookingMode]);

  const toggleCookingMode = () => setCookingMode(m => !m);

  return (
    <CookingModeContext.Provider value={{ cookingMode, toggleCookingMode }}>
      {children}
    </CookingModeContext.Provider>
  );
};

export const useCookingMode = () => {
  const ctx = useContext(CookingModeContext);
  if (!ctx) throw new Error("useCookingMode must be used within CookingModeProvider");
  return ctx;
};

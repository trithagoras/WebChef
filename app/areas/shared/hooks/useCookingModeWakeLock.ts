"use client"
import { useEffect, useRef } from 'react'
import { useCookingMode } from '../stores/cookingModeStore'

export const useCookingModeWakeLock = () => {
  const cookingMode = useCookingMode((state) => state.cookingMode)
  const wakeLockRef = useRef<WakeLockSentinel | null>(null)

  useEffect(() => {
    const enableWakeLock = async () => {
      try {
        const lock = await navigator.wakeLock?.request?.('screen')
        if (lock) {
          wakeLockRef.current = lock
          lock.addEventListener('release', () => {
            wakeLockRef.current = null
          })
        }
      } catch (err) {
        console.error('WakeLock error:', err)
      }
    }

    const releaseWakeLock = async () => {
      try {
        await wakeLockRef.current?.release()
        wakeLockRef.current = null
      } catch (err) {
        console.error('Error releasing WakeLock:', err)
      }
    }

    if (cookingMode) {
      enableWakeLock()
    } else {
      releaseWakeLock()
    }

    return () => {
      releaseWakeLock()
    }
  }, [cookingMode])
};

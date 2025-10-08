"use client";
import { useCookingModeWakeLock } from "../hooks/useCookingModeWakeLock";

const CookingModeWakeLock = () => {
  useCookingModeWakeLock();
  return null;
};

export default CookingModeWakeLock;

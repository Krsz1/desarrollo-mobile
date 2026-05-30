import { Preferences } from "@capacitor/preferences";

/**
 * useStorage — wrapper around Capacitor Preferences for typed key-value storage.
 * Covers the "Memoria" topic: persists data locally on the device between sessions.
 */
export const useStorage = () => {
  const setItem = async <T>(key: string, value: T): Promise<void> => {
    await Preferences.set({ key, value: JSON.stringify(value) });
  };

  const getItem = async <T>(key: string): Promise<T | null> => {
    const { value } = await Preferences.get({ key });
    if (value === null) return null;
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  };

  const removeItem = async (key: string): Promise<void> => {
    await Preferences.remove({ key });
  };

  return { setItem, getItem, removeItem };
};

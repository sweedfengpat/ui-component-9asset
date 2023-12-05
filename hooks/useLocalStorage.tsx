import { useState } from "react";

export const useLocalStorage = <T,>(keyName: string, defaultValue?: T|null): 
  [ T|null, (newValue: T | null) => void ] => {
  const [storedValue, setStoredValue] = useState<T|null>(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue || null));
        return defaultValue || null;
      }
    } catch {
      return defaultValue || null;
    }
  });

  const onStorageValueChanged = (value: T|null) => {

  }

  window.addEventListener('storage', (ev: StorageEvent) => {
    if (ev.key === keyName) {
      const value = ev.newValue ? JSON.parse(ev.newValue) : null;
      setStoredValue(value);
      // onStorageValueChanged(value);
    }
  });
  
  const setValue = (newValue:  T|null) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch {}
    setStoredValue(newValue);
  }

  return [storedValue, setValue];
}

import { useState, useEffect } from 'react';
import { WeddingData } from './types';
import { defaultData } from './data';

export function useWeddingData() {
  const [data, setData] = useState<WeddingData>(() => {
    try {
      const item = window.localStorage.getItem('weddingAppData');
      return item ? JSON.parse(item) : defaultData;
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return defaultData;
    }
  });
  
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        window.localStorage.setItem('weddingAppData', JSON.stringify(data));
        setLastSaved(new Date());
      } catch (error) {
        console.warn('Error saving to localStorage', error);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [data]);

  const updateData = <K extends keyof WeddingData>(key: K, value: WeddingData[K]) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return { data, updateData, setData, lastSaved };
}

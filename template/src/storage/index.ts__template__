import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialState?: T,
): [T, (value: T | null) => void] => {
  const [localStorageData, setLocalStorageData] = useState<T | null>(
    JSON.parse((localStorage.getItem(key) as string) ?? null),
  );

  const setData = (value: T | null) => {
    if (value === null) {
      localStorage.removeItem(key);
      setLocalStorageData(null);
    } else if (value) {
      localStorage.setItem(key, JSON.stringify(value));
      setLocalStorageData(value as T);
    }
  };
  useEffect(() => {
    if (localStorageData === null && initialState) {
      localStorage.setItem(key, JSON.stringify(initialState));
      setLocalStorageData(initialState);
    }
  }, []);

  return [localStorageData as T, setData];
};

export const useSessionStorage = <T>(
  key: string,
  initialState?: T,
): [T, (value: T | null) => void] => {
  const [sessionStorageData, setSessionStorageData] = useState<T | null>(
    JSON.parse((sessionStorage.getItem(key) as string) ?? null),
  );

  const setData = (value: T | null) => {
    if (value === null) {
      sessionStorage.removeItem(key);
      setSessionStorageData(null);
    } else if (value) {
      sessionStorage.setItem(key, JSON.stringify(value));
      setSessionStorageData(value as T);
    }
  };
  useEffect(() => {
    if (sessionStorageData === null && initialState) {
      sessionStorage.setItem(key, JSON.stringify(initialState));
      setSessionStorageData(initialState);
    }
  }, []);

  return [sessionStorageData as T, setData];
};

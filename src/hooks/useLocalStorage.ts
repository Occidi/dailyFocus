import { useState, useEffect } from "react";

export default function useLocalStorage(key: string, initialValue: object[]) {
  const [state, setState] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw === null) {
        return initialValue;
      }
      const result: object[] = JSON.parse(raw);

      return result;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (err) {
      console.error(err);
    }
  }, [key, state]);

  return [state, setState];
}

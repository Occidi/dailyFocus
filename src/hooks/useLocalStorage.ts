import { useState, useEffect } from "react";

/**
 * useLocalStorage - sync a state value with the localStorage
 * @param {string} key - the localStorage key
 * @param {*} initialValue - a value to be stored
 * @returns {[any, function]} [value, setValue]
 */
export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      const result = raw !== null ? JSON.parse(raw) : initialValue;
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

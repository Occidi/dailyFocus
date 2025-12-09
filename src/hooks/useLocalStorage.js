import { useState, useEffect } from "react";

/**
 * useLocalStorage - sync a state value with localStorage (JSON)
 * @param {string} key localStorage key
 * @param {*} initialValue initial value or lazy initializer
 * @returns {[any, function]} [value, setValue]
 */
export default function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    } catch (err) {
      console.error(err);
      // fallback to initial value on parse errors
      return typeof initialValue === "function" ? initialValue() : initialValue;
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

import { useEffect, useRef } from "react";

export const useDebounce = <T>(
  value: T,
  setValue: (v: T) => void,
  delay: number
) => {
  const handler = useRef<ReturnType<typeof setTimeout> | null>(null);
  const setValueRef = useRef(setValue);

  useEffect(() => {
    setValueRef.current = setValue;
  });

  useEffect(() => {
    if (handler.current) clearTimeout(handler.current);
    handler.current = setTimeout(() => {
      setValueRef.current(value);
    }, delay);

    return () => {
      if (handler.current) clearTimeout(handler.current);
    };
  }, [value, delay]);
};

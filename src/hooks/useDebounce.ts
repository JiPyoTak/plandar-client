import { useCallback, useRef } from 'react';

const useDebounce = (callback: (...cbArgs: any[]) => void, term: number) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>();

  const set = useCallback(
    (...args: any[]) => {
      if (timer.current) clear();

      timer.current = setTimeout(() => {
        callback(...args);
      }, term);
    },
    [callback, term],
  );

  const clear = useCallback(() => {
    if (!timer.current) return;

    clearTimeout(timer.current);
    timer.current = null;
  }, []);

  return [set, clear] as const;
};

export default useDebounce;

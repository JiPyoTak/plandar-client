import { useRef } from 'react';

const useDebounce = (callback: (...cbArgs: any[]) => void, term: number) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  return (...args: any[]) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      callback(...args);
    }, term);
  };
};

export default useDebounce;

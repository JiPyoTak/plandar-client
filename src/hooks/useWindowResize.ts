import { useEffect } from 'react';

import useWindowSize from '@/stores/window-size';

const useWindowResize = () => {
  const setWindowSizes = useWindowSize((state) => state.setWindowSizes);

  const debounce = (func: () => void, delay: number) => {
    let timer: NodeJS.Timeout;

    return () => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func();
      }, delay);
    };
  };

  const onResize = () => {
    const { innerWidth, innerHeight } = window;

    setWindowSizes({ innerWidth, innerHeight });
  };

  const resizeHandler = debounce(onResize, 200);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', resizeHandler);

    return () => window.removeEventListener('resize', resizeHandler);
  }, []);
};

export default useWindowResize;

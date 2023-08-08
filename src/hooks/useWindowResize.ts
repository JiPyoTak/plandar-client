import { useEffect } from 'react';

import useWindowSize from '@/stores/window-size';
import { debounce } from '@/utils/debounce';

const useWindowResize = () => {
  const setWindowSizes = useWindowSize((state) => state.setWindowSizes);

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

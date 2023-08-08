const debounce = (func: () => void, delay: number) => {
  let timer: NodeJS.Timeout;

  return () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func();
    }, delay);
  };
};

export { debounce };

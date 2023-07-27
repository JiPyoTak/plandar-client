import { useRef } from 'react';

const useModalPopupPosition = () => {
  const positionTopRef = useRef(0);

  const setPositionTop = (rect: DOMRect) => {
    const { top } = rect;

    positionTopRef.current = top + 20;
  };

  return { positionTopRef, setPositionTop };
};

export default useModalPopupPosition;

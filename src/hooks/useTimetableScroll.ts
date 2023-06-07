import { useRef } from 'react';

const useTimetableScroll = () => {
  const scrollTargets = useRef<{ [key: string]: HTMLElement }>({});

  const registTag = ({ id, ref }: { id: string; ref: HTMLElement | null }) => {
    if (id && ref) {
      scrollTargets.current[id] = ref;
    }
  };

  const removeTag = (id: string) => {
    delete scrollTargets.current[id];
  };

  const onMoveHorizontalScroll: React.UIEventHandler<HTMLElement> = (e) => {
    const target = e.target as HTMLElement;
    const scrollAmount = target.scrollLeft;

    for (const element of Object.values(scrollTargets.current)) {
      element.scrollLeft = scrollAmount;
    }
  };

  return { registTag, removeTag, onMoveHorizontalScroll };
};

export default useTimetableScroll;

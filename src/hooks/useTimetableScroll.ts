import { useRef } from 'react';

type TTimetableScrollController = {
  registTag: (arg: { id: string; ref: HTMLDivElement | null }) => void;
  removeTag: (id: string) => void;
  onMoveHorizontalScroll: React.UIEventHandler<HTMLElement>;
};

const useTimetableScroll = () => {
  const scrollTargets = useRef<{ [key: string]: HTMLElement }>({});

  const registTag: TTimetableScrollController['registTag'] = ({ id, ref }) => {
    if (id && ref) {
      scrollTargets.current[id] = ref;
    }
  };

  const removeTag: TTimetableScrollController['removeTag'] = (id: string) => {
    delete scrollTargets.current[id];
  };

  const onMoveHorizontalScroll: TTimetableScrollController['onMoveHorizontalScroll'] =
    (e) => {
      const target = e.target as HTMLElement;
      const scrollAmount = target.scrollLeft;

      for (const element of Object.values(scrollTargets.current)) {
        element.scrollLeft = scrollAmount;
      }
    };

  return { registTag, removeTag, onMoveHorizontalScroll };
};

export type { TTimetableScrollController };
export default useTimetableScroll;

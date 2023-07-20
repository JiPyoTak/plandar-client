import { useRef } from 'react';

type TTimetableScrollController = {
  signTag: (arg: { id: string; ref: HTMLElement | null }) => void;
  onMoveHorizontalScroll: React.UIEventHandler<HTMLElement>;
};

const useTimetableScroll = () => {
  const scrollTargets = useRef<{ [key: string]: HTMLElement }>({});

  const signTag: TTimetableScrollController['signTag'] = ({ id, ref }) => {
    if (id && ref) {
      scrollTargets.current[id] = ref;
    }
  };

  const onMoveHorizontalScroll: TTimetableScrollController['onMoveHorizontalScroll'] =
    (e) => {
      const target = e.target as HTMLElement;
      const scrollAmount = target.scrollLeft;

      for (const element of Object.values(scrollTargets.current)) {
        element.scrollLeft = scrollAmount;
      }
    };

  return { signTag, onMoveHorizontalScroll };
};

export type { TTimetableScrollController };
export default useTimetableScroll;

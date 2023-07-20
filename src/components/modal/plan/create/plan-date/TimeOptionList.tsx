import { useEffect, useRef } from 'react';

import styled from '@emotion/styled';

import { BOX_SCROLL_Y } from '@/styles/scroll';
import { IExtractedTimeInfo } from '@/types/time';
import { padZero } from '@/utils/padZero';

// [12:00, 12:15, 12:30, ..., 11:30, 11:45] 배열을 만드는 코드
const options = Array.from(Array(12), (_, i) =>
  Array.from(Array(4), (_, j) => `${i === 0 ? 12 : i}:${padZero(15 * j)}`),
).flat();

const ITEM_HEIGHT = 40;
const ITEM_COUNT_BY_HOUR = 4;
const ITEM_COUNT_BY_MERIDIEM = 12 * ITEM_COUNT_BY_HOUR;

interface Props {
  inputTime: string;
  timeInfo: IExtractedTimeInfo;
  setTime: (time: string) => void;
}

const TimeOptionList = ({ inputTime, timeInfo, setTime }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const { invalid, hour, minute, meridiem } = timeInfo;
    if (invalid) return;
    let top = -2 * ITEM_HEIGHT; // 선택된 시간을 가운데로 위치시키기 위해서 설정
    top += meridiem === '오전' ? 0 : ITEM_HEIGHT * ITEM_COUNT_BY_MERIDIEM;
    top += ITEM_HEIGHT * ITEM_COUNT_BY_HOUR * (hour === 12 ? 0 : hour);
    top += ITEM_HEIGHT * Math.floor(minute / 15);
    ref.current.scrollTo({ top });
  }, [timeInfo]);

  return (
    <Container ref={ref}>
      {['오전', '오후'].map((meridiem) => {
        return options.map((option) => {
          const timeText = `${meridiem} ${option}`;
          return (
            <TimeOption
              className={inputTime === timeText ? 'selected' : ''}
              key={timeText}
              onMouseDown={() => setTime(timeText)}
            >
              {timeText}
            </TimeOption>
          );
        });
      })}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  z-index: 20;

  width: 180px;
  height: 200px;

  margin-top: 0.75rem;
  border-radius: 5px;

  background-color: ${({ theme }) => theme.white};

  box-shadow: rgb(0 0 0 / 15%) 0px 4px 16px 0px;
  overflow-y: scroll;
  ${BOX_SCROLL_Y}
`;

const TimeOption = styled.div`
  display: flex;
  width: 100%;
  padding: 0 15px;
  height: ${ITEM_HEIGHT}px;
  align-items: center;

  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.background2};
  }

  &.selected {
    background-color: ${({ theme }) => theme.background3};
  }
`;

export default TimeOptionList;

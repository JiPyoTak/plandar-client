import { useRef, useState, KeyboardEvent } from 'react';

import styled from '@emotion/styled';

import moment, { Moment, MomentInput } from 'moment';

import ModalBackground from '@/components/common/modal/ModalBackground';
import TimeOptionList from '@/components/modal/plan/create/plan-date/TimeOptionList';
import useModalPopupPosition from '@/hooks/modal/useModalPopupPositon';
import { FONT_REGULAR_4 } from '@/styles/font';
import {
  extractTimeFromString,
  getTimeString,
} from '@/utils/date/getTimeString';
import { padZero } from '@/utils/padZero';

interface Props {
  time: Moment;
  setTime: (time: MomentInput) => boolean;
}

const initialTime = (time: Moment) => {
  return getTimeString(moment(time).toDate(), {
    hourPadZero: false,
  });
};

const TimeInput = ({ setTime, time }: Props) => {
  const { positionTopRef, setPositionTop } = useModalPopupPosition();
  const [inputTime, setInputTime] = useState<string>(initialTime(time));
  const inputRef = useRef<HTMLInputElement>(null);
  const [openedOptions, setOpenedOptions] = useState(false);

  const timeInfo = extractTimeFromString(inputTime);

  const onBlurHandler = () => {
    const { hour, minute, meridiem } = timeInfo;

    // ?: meridiem, hour, minute 계산을 라이브러리로 진행해야 하는지?
    let realHour = hour;
    if (meridiem === '오전' && hour === 12) {
      realHour = 0;
    } else if (meridiem === '오후' && hour === 12) {
      realHour = 12;
    } else if (meridiem === '오후') {
      realHour += 12;
    }

    const isValid = setTime({
      hour: realHour,
      minute,
    });

    if (isValid) {
      setInputTime(`${meridiem} ${hour}:${padZero(minute)}`);
    } else {
      setInputTime(initialTime(time));
    }

    setOpenedOptions(false);
  };

  const onInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    inputRef.current?.blur();
  };

  const onFocus: React.FocusEventHandler = (e) => {
    const target = e.target as HTMLInputElement;

    setPositionTop(target.getBoundingClientRect());
    setOpenedOptions(true);
  };

  return (
    <div css={{ display: 'inline-block' }}>
      <ModalBackground isOpen={openedOptions} />
      <Input
        invalid={timeInfo.invalid}
        type="text"
        ref={inputRef}
        value={inputTime}
        onFocus={onFocus}
        onChange={(e) => setInputTime(e.target.value)}
        onKeyDown={onInputEnter}
        onBlur={onBlurHandler}
      />
      {openedOptions && (
        <div
          css={{
            position: 'absolute',
            top: positionTopRef.current,
          }}
        >
          <TimeOptionList
            inputTime={inputTime}
            timeInfo={timeInfo}
            setTime={setInputTime}
          />
        </div>
      )}
    </div>
  );
};

const Input = styled.input<{ invalid?: boolean }>`
  width: 80px;
  padding: 3px 5px;
  ${FONT_REGULAR_4}

  text-align: center;
  border-radius: 5px;
  border: 2px solid transparent;
  outline: none;

  &:hover {
    background-color: ${({ theme }) => theme.background3};
  }
  &:focus {
    background-color: ${({ theme }) => theme.background1};
    border: 2px solid
      ${({ invalid, theme }) => (invalid ? theme.red : '#1053C0')};
  }
`;

export default TimeInput;

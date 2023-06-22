import { useRef, useState, KeyboardEvent } from 'react';

import styled from '@emotion/styled';

import moment from 'moment';

import TimeOptionList from '@/components/modal/plan/PlanDate/TimeOptionList';
import { FONT_REGULAR_3 } from '@/styles/font';
import { TTimeHM } from '@/types/time';
import {
  extractTimeFromString,
  getTimeString,
} from '@/utils/date/getTimeString';
import { padZero } from '@/utils/padZero';

interface Props {
  time: TTimeHM;
  setTime: (time: TTimeHM) => void;
}

const initialTime = (time: TTimeHM) => {
  return getTimeString(
    moment({ hour: time.hour, minute: time.minute }).toDate(),
    {
      hourPadZero: false,
    },
  );
};

const TimeInput = ({ setTime, time }: Props) => {
  const [inputTime, setInputTime] = useState<string>(initialTime(time));
  const inputRef = useRef<HTMLInputElement>(null);
  const [openedOptions, setOpenedOptions] = useState(false);
  const onInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      inputRef.current?.blur();
    }
  };

  const timeInfo = extractTimeFromString(inputTime);

  const onBlurHandler = () => {
    const { invalid, hour, minute, meridiem } = timeInfo;
    if (!invalid) {
      setInputTime(`${meridiem} ${hour}:${padZero(minute)}`);
      setTime({ hour: meridiem === '오후' ? hour + 12 : hour, minute });
    } else {
      setInputTime(initialTime(time));
    }
    setOpenedOptions(false);
  };

  return (
    <div css={{ position: 'relative', display: 'inline-block' }}>
      <Input
        invalid={timeInfo.invalid}
        type="text"
        ref={inputRef}
        value={inputTime}
        onFocus={() => setOpenedOptions(true)}
        onChange={(e) => setInputTime(e.target.value)}
        onKeyDown={onInputEnter}
        onBlur={onBlurHandler}
      />
      {openedOptions && (
        <TimeOptionList timeInfo={timeInfo} setTime={setInputTime} />
      )}
    </div>
  );
};

const Input = styled.input<{ invalid?: boolean }>`
  outline: none;
  border: none;
  border-radius: 5px;
  margin: 0 2px;
  text-align: center;
  width: 86px;
  ${FONT_REGULAR_3}
  &:hover {
    background-color: ${({ theme }) => theme.background3};
  }
  &:focus {
    background-color: ${({ theme }) => theme.background3};
    border-radius: 5px 5px 0 0;
    border-bottom: 2px solid
      ${({ invalid, theme }) => (invalid ? theme.red : theme.primary)};
  }
`;

export default TimeInput;

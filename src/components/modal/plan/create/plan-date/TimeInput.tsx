import { useRef, useState, KeyboardEvent } from 'react';

import styled from '@emotion/styled';

import moment, { Moment, MomentInput } from 'moment';

import TimeOptionList from '@/components/modal/plan/create/plan-date/TimeOptionList';
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
  const [inputTime, setInputTime] = useState<string>(initialTime(time));
  const inputRef = useRef<HTMLInputElement>(null);
  const [openedOptions, setOpenedOptions] = useState(false);

  const timeInfo = extractTimeFromString(inputTime);

  const onBlurHandler = () => {
    const { hour, minute, meridiem } = timeInfo;

    const isValid = setTime({
      hour: meridiem === '오후' ? hour + 12 : hour,
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

  return (
    <div css={{ display: 'inline-block' }}>
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
        <TimeOptionList
          inputTime={inputTime}
          timeInfo={timeInfo}
          setTime={setInputTime}
        />
      )}
    </div>
  );
};

const Input = styled.input<{ invalid?: boolean }>`
  width: 80px;

  margin: 0 2px;
  border-radius: 5px;
  ${FONT_REGULAR_4}

  text-align: center;
  border: none;
  outline: none;

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

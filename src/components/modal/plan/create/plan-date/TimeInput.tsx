import { useRef, useState, KeyboardEvent } from 'react';

import styled from '@emotion/styled';

import moment, { Moment, MomentInput } from 'moment';

import Background from '@/components/modal/plan/create/Background';
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

  const onFocus: React.FocusEventHandler = (e) => {
    const target = e.target as HTMLInputElement;

    setPositionTop(target.getBoundingClientRect());
    setOpenedOptions(true);
  };

  return (
    <div css={{ display: 'inline-block' }}>
      <Background isOpen={openedOptions} />
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

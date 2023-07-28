import { useLayoutEffect } from 'react';

import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import moment from 'moment';

import TagClassifier from '@/components/home/sidebar/content/classifier/TagClassifier';
import { CALENDAR_UNIT } from '@/constants';
import { useCreatePlanMutation } from '@/hooks/query/plan';
import useDateState from '@/stores/date';
import planStubManager from '@/stories/apis/data/plan';
import { createPlanApiHandler, getPlansApiHandler } from '@/stories/apis/plan';

export default {
  title: 'Sidebar/Classifier',
  component: TagClassifier,
  argTypes: {
    date: { control: 'date', description: '현재 달력에 선택된 날짜입니다.' },
    unit: {
      options: Object.values(CALENDAR_UNIT),
      mapping: Object.values(CALENDAR_UNIT),
      control: {
        type: 'select',
        labels: Object.keys(CALENDAR_UNIT),
      },
      description: '현재 달력을 나타내는 단위입니다.',
    },
  },
} as ComponentMeta<typeof TagClassifier>;

type TArgs = {
  date: number;
  unit: (typeof CALENDAR_UNIT)[keyof typeof CALENDAR_UNIT];
};

const Template: ComponentStory<
  (args: TArgs) => ReturnType<typeof TagClassifier>
> = ({ date: dateTime, unit, ...args }) => {
  const { referenceDate, setReferenceDate, setCalendarUnit } = useDateState(
    ({ referenceDate, setReferenceDate, setCalendarUnit }) => ({
      referenceDate,
      setReferenceDate,
      setCalendarUnit,
    }),
  );
  const { mutateAsync: createPlanMutateAsync } = useCreatePlanMutation();

  useLayoutEffect(() => {
    setReferenceDate(moment(dateTime));
  }, [dateTime]);

  useLayoutEffect(() => {
    setCalendarUnit(CALENDAR_UNIT[unit]);
  }, [unit]);

  const createRandomTagPlan = () => {
    const alphabetCount = 26;
    const randomAlphabet = String.fromCharCode(
      Math.round(Math.random() * alphabetCount) + 'A'.charCodeAt(0),
    );

    createPlanMutateAsync(
      planStubManager.createStub({
        startTime: referenceDate,
        endTime: referenceDate,
        isAllDay: true,
        tags: [randomAlphabet],
      }),
    );
  };

  return (
    <Container>
      <div className="category-classifier-controls">
        <TestButton onClick={createRandomTagPlan}>
          랜덤 태그 일정 추가하기
        </TestButton>
      </div>
      <div className="category-classifier-main">
        <TagClassifier {...args} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .category-classifier-controls {
    flex: 0;
    padding: 1rem;

    display: flex;
    column-gap: 1rem;
  }

  .category-classifier-main {
    flex: 1 0 0;
  }
`;

const TestButton = styled.button`
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 8px;
`;

export const Tag = Template.bind({});
Tag.args = {
  date: new Date().getTime(),
  unit: CALENDAR_UNIT.month,
};
Tag.parameters = {
  msw: {
    handlers: [getPlansApiHandler, createPlanApiHandler],
  },
};

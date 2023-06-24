import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import TypeClassifier from '@/components/sidebar/TypeClassifier';
import { useCreatePlanMutation } from '@/hooks/rq/plan';
import useClassifiedPlans from '@/hooks/useClassifiedPlans';
import useDateState from '@/stores/date';
import planStubManager from '@/stories/apis/data/plan';
import { createPlanApiHandler, getPlansApiHandler } from '@/stories/apis/plan';
import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';
import { TPlanType } from '@/types/rq/plan';

export default {
  title: 'Sidebar/Classifier',
  component: TypeClassifier,
} as ComponentMeta<typeof TypeClassifier>;

const Template: ComponentStory<typeof TypeClassifier> = (args) => {
  const { year, month } = useDateState();
  const { mutateAsync: createPlanMutateAsync } = useCreatePlanMutation();
  const plans = useClassifiedPlans();

  const typePlans = {
    task: 0,
    alarm: 0,
    event: 0,
  };
  plans.forEach(({ type }) => typePlans[type]++);

  const createRandomTypePlan = () => {
    const random = Math.round(Math.random() * 2);
    const types = {
      0: 'task',
      1: 'alarm',
      2: 'event',
    } as { [key: number]: TPlanType };

    createPlanMutateAsync(
      planStubManager.createStub({ type: types[random] ?? 'task' }),
    );
  };

  return (
    <Container>
      <div className="category-classifier-plans">
        <h4>
          {year}년 {month}월 일정 렌더링
        </h4>
        <PlanSummary>
          <div>총 {plans.length} 개의 일정</div>
          {Object.entries(typePlans).map(([name, count]) => {
            return (
              <div>
                {name}({count}개)
              </div>
            );
          })}
        </PlanSummary>
      </div>
      <div className="category-classifier-controls">
        <TestButton onClick={createRandomTypePlan}>
          랜덤 일정 추가하기
        </TestButton>
      </div>
      <div className="category-classifier-main">
        <TypeClassifier {...args} />
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

  .category-classifier-plans {
    width: 100%;
    flex: 0;
    padding: 0 1rem;
  }

  .category-classifier-main {
    flex: 1 0 0;
  }
`;

const PlanSummary = styled.div`
  ${TIMETABLE_SCROLL_STYLE}

  padding-top: 1rem;
  display: flex;
  column-gap: 1rem;

  overflow-x: scroll;
  overflow-y: hidden;
`;

const TestButton = styled.button`
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 8px;
`;

export const Type = Template.bind({});
Type.args = {};
Type.parameters = {
  msw: {
    handlers: [getPlansApiHandler, createPlanApiHandler],
  },
};

import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import TagClassifier from '@/components/home/sidebar/content/classifier/TagClassifier';
import { useCreatePlanMutation } from '@/hooks/query/plan';
import useClassifiedPlans from '@/hooks/useClassifiedPlans';
import useDateState from '@/stores/date';
import planStubManager from '@/stories/apis/data/plan';
import { createPlanApiHandler, getPlansApiHandler } from '@/stories/apis/plan';
import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';

export default {
  title: 'Sidebar/Classifier',
  component: TagClassifier,
} as ComponentMeta<typeof TagClassifier>;

const Template: ComponentStory<typeof TagClassifier> = (args) => {
  const { year, month } = useDateState();
  const { mutateAsync: createPlanMutateAsync } = useCreatePlanMutation();
  const plans = useClassifiedPlans();

  const tagPlans: { [key: string]: number } = {};
  plans.forEach(({ tags }) => {
    tags.forEach((tag) => {
      if (!Object.hasOwnProperty.call(tagPlans, tag)) tagPlans[tag] = 0;
      tagPlans[tag]++;
    });
  });

  const createRandomTagPlan = () => {
    const alphabetCount = 26;
    const randomAlphabet = String.fromCharCode(
      Math.round(Math.random() * alphabetCount) + 'A'.charCodeAt(0),
    );

    createPlanMutateAsync(
      planStubManager.createStub({ tags: [randomAlphabet] }),
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
          {Object.entries(tagPlans).map(([name, count]) => {
            return (
              <div>
                {name}({count}개)
              </div>
            );
          })}
        </PlanSummary>
      </div>
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

export const Tag = Template.bind({});
Tag.args = {};
Tag.parameters = {
  msw: {
    handlers: [getPlansApiHandler, createPlanApiHandler],
  },
};

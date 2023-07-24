import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryClassifier from '@/components/home/sidebar/content/classifier/CategoryClassifier';
import { useCategoryCreate, useCategoryQuery } from '@/hooks/query/category';
import { useCreatePlanMutation } from '@/hooks/query/plan';
import useClassifiedPlans from '@/hooks/useClassifiedPlans';
import useDateState from '@/stores/date';
import {
  createCategoryAPIHandler,
  getCategoryAPIHandler,
  updateCategoryAPIHandler,
} from '@/stories/apis/category';
import categoryStubManager from '@/stories/apis/data/category';
import planStubManager from '@/stories/apis/data/plan';
import { createPlanApiHandler, getPlansApiHandler } from '@/stories/apis/plan';
import { TIMETABLE_SCROLL_STYLE } from '@/styles/timetable';

export default {
  title: 'Sidebar/Classifier',
  component: CategoryClassifier,
} as ComponentMeta<typeof CategoryClassifier>;

const Template: ComponentStory<typeof CategoryClassifier> = (args) => {
  const referenceDate = useDateState(({ referenceDate }) => referenceDate);
  const plans = useClassifiedPlans();
  const { mutateAsync: createCategoryMutateAsync } = useCategoryCreate();
  const { mutateAsync: createPlanMutateAsync } = useCreatePlanMutation();

  const createCategory = () => {
    createCategoryMutateAsync(categoryStubManager.createStub());
  };

  const createPlan = () => {
    const maxId = categoryStubManager.getId();
    if (maxId === 0) return;

    const randomId = Math.round(Math.random() * (maxId - 1)) + 1;
    createPlanMutateAsync(planStubManager.createStub({ categoryId: randomId }));
  };

  const { data } = useCategoryQuery();
  const categories = data ?? [];
  const categoryNames = categories.reduce(
    (names, { id, name }) => names.set(id, name),
    new Map<number, string>(),
  );
  const initialCategoryPlans = categories.reduce(
    (object, { name }) => ({ ...object, [name]: 0 }),
    {} as { [key: string]: number },
  );
  const categoryPlans = plans.reduce((result, plan) => {
    const categoryName = categoryNames.get(plan?.categoryId ?? 0);

    if (categoryName) {
      result[categoryName]++;
    }

    return result;
  }, initialCategoryPlans);

  return (
    <Container>
      <div className="category-classifier-plans">
        <h4>
          {referenceDate.year()}년 {referenceDate.month() + 1}월 일정 렌더링
        </h4>
        <PlanSummary>
          <div>총 {plans.length} 개의 일정</div>
          {Object.entries(categoryPlans).map(([name, count]) => {
            return (
              <div>
                {name}({count}개)
              </div>
            );
          })}
        </PlanSummary>
      </div>
      <div className="category-classifier-controls">
        <TestButton onClick={createCategory}>카테고리 추가하기</TestButton>
        <TestButton onClick={createPlan}>
          랜덤 카테고리 일정 생성하기
        </TestButton>
      </div>
      <div className="category-classifier-main">
        <CategoryClassifier {...args} />
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

export const Category = Template.bind({});
Category.args = {};
Category.parameters = {
  msw: {
    handlers: [
      getCategoryAPIHandler,
      createCategoryAPIHandler,
      updateCategoryAPIHandler,
      createPlanApiHandler,
      getPlansApiHandler,
    ],
  },
};

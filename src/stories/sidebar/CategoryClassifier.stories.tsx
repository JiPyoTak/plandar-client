import styled from '@emotion/styled';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import CategoryClassifier from '@/components/sidebar/CategoryClassifier';
import { useCategoryCreate } from '@/hooks/rq/category';
import { useCreatePlanMutation } from '@/hooks/rq/plan';
import {
  createCategoryAPIHandler,
  getCategoryAPIHandler,
  updateCategoryAPIHandler,
} from '@/stories/apis/category';
import categoryStubManager from '@/stories/apis/data/category';
import planStubManager from '@/stories/apis/data/plan';
import { createPlanApiHandler } from '@/stories/apis/plan';

export default {
  title: 'Sidebar/Classifier',
  component: CategoryClassifier,
} as ComponentMeta<typeof CategoryClassifier>;

const Template: ComponentStory<typeof CategoryClassifier> = (args) => {
  const { mutateAsync: createCategoryMutateAsync } = useCategoryCreate();
  const { mutateAsync: createPlanMutateAsync } = useCreatePlanMutation();

  const createCategory = () => {
    createCategoryMutateAsync(categoryStubManager.createStub());
  };

  const createPlan = () => {
    const maxId = categoryStubManager.getId();
    if (maxId === 0) return;

    const randomId = Math.round(Math.random() * maxId);
    createPlanMutateAsync(planStubManager.createStub({ categoryId: randomId }));
  };

  return (
    <div>
      <Controls>
        <TestButton onClick={createCategory}>카테고리 추가하기</TestButton>
        <TestButton onClick={createPlan}>
          랜덤 카테고리 일정 생성하기
        </TestButton>
      </Controls>
      <CategoryClassifier {...args} />
    </div>
  );
};

const Controls = styled.div`
  padding: 1rem;

  display: flex;
  column-gap: 1rem;
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
    ],
  },
};

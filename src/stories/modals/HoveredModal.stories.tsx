import { useRef } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import HoveredModal from '@/components/modal/plan/hover';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';
import planStubManager from '@/stories/apis/data/plan';

export default {
  title: 'Modals/HoveredModal',
  component: HoveredModal,
} as ComponentMeta<typeof HoveredModal>;

const Template: ComponentStory<typeof HoveredModal> = () => {
  const ref = useRef<HTMLDivElement>(document.createElement('div'));
  const set = useHoveredPlanState((state) => state.setHoveredPlan);

  const MODKED_PLAN = planStubManager.createStub({});

  set({
    hoveredPlan: MODKED_PLAN,
    dom: ref.current,
  });

  return (
    <div css={{ position: 'relative' }}>
      <HoveredModal />
    </div>
  );
};

export const Day = Template.bind({});

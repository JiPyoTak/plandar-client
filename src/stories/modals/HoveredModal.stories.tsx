import { ComponentMeta, ComponentStory } from '@storybook/react';

import { createPlanMock } from '../plan/createPlanMock';

import HoveredModal from '@/components/modal/plan/Hovered';
import useHoveredPlanState from '@/stores/plan/hoveredPlan';

export default {
  title: 'Modals/HoveredModal',
  component: HoveredModal,
} as ComponentMeta<typeof HoveredModal>;

const Template: ComponentStory<typeof HoveredModal> = () => {
  const set = useHoveredPlanState((state) => state.setHoveredPlan);

  const MODKED_PLAN = createPlanMock({});

  set({
    hoveredPlan: MODKED_PLAN,
    rect: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

  return (
    <div css={{ position: 'relative' }}>
      <HoveredModal />
    </div>
  );
};

export const Day = Template.bind({});

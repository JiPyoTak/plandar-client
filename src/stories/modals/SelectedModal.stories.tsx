import { ComponentMeta, ComponentStory } from '@storybook/react';

import { createPlanMock } from '../plan/createPlanMock';

import SelectedModal from '@/components/modal/plan/Selected';
import useSelectedPlanState from '@/stores/plan/selectedPlan';

export default {
  title: 'Modals/SelectedModal',
  component: SelectedModal,
} as ComponentMeta<typeof SelectedModal>;

const Template: ComponentStory<typeof SelectedModal> = () => {
  const set = useSelectedPlanState((state) => state.setSelectedPlan);

  const MODKED_PLAN = createPlanMock({});

  set({
    selectedPlan: MODKED_PLAN,
    rect: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

  return <SelectedModal />;
};

export const Default = Template.bind({});

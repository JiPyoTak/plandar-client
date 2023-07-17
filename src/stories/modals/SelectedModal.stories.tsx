import { ComponentMeta, ComponentStory } from '@storybook/react';

import SelectedModal from '@/components/modal/plan/select';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import planStubManager from '@/stories/apis/data/plan';

export default {
  title: 'Modals/SelectedModal',
  component: SelectedModal,
} as ComponentMeta<typeof SelectedModal>;

const Template: ComponentStory<typeof SelectedModal> = () => {
  const set = useSelectedPlanState((state) => state.setSelectedPlan);

  const MODKED_PLAN = planStubManager.createStub({});

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

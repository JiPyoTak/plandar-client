import { useRef } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import SelectedModal from '@/components/modal/plan/select';
import useSelectedPlanState from '@/stores/plan/selectedPlan';
import planStubManager from '@/stories/apis/data/plan';

export default {
  title: 'Modals/SelectedModal',
  component: SelectedModal,
} as ComponentMeta<typeof SelectedModal>;

const Template: ComponentStory<typeof SelectedModal> = () => {
  const ref = useRef<HTMLDivElement>(document.createElement('div'));
  const set = useSelectedPlanState((state) => state.setSelectedPlan);

  const MODKED_PLAN = planStubManager.createStub({});

  set({
    selectedPlan: MODKED_PLAN,
    dom: ref.current,
  });

  return (
    <div style={{ position: 'relative' }}>
      <SelectedModal />
    </div>
  );
};

export const Default = Template.bind({});

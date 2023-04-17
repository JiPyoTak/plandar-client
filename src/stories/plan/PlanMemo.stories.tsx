import { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import PlanMemo from '@/components/plan/modal/PlanMemo';

export default {
  title: 'Plan/PlanMemo',
  component: PlanMemo,
} as ComponentMeta<typeof PlanMemo>;

const Template: ComponentStory<typeof PlanMemo> = (args) => {
  const [memoBody, setMemoBody] = useState('');
  return (
    <section
      css={{
        margin: '30px 0',
        maxHeight: '100vh',
        overflowX: 'hidden',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <PlanMemo
        value={memoBody}
        onChange={(e) => {
          setMemoBody(e.target.value);
        }}
        {...args}
      />
      <hr />
    </section>
  );
};

export const Primary = Template.bind({});
Primary.args = {};

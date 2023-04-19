import { useRef } from 'react';

import { ComponentStory } from '@storybook/react';

import Input from '@/components/common/Input';

export default {
  title: 'Common/Input',
  component: Input,
};

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Inline = Template.bind({});
Inline.args = {
  isInline: true,
  placeholder: '인라인 입력창입니다',
};

export const Box = Template.bind({});
Box.args = {
  placeholder: '박스 입력창입니다',
};

export const BoxWithIcon = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Input
      placeholder="박스 입력창입니다"
      ref={ref}
      isSearchIcon={true}
      onClear={() => ref.current && (ref.current.value = '')}
    />
  );
};

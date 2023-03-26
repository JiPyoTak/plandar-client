import React from 'react';

import { useTheme } from '@emotion/react';

import Dropdown from '@/components/common/dropdown';
import ClassifierItem from '@/components/sidebar/classifier/ClassifierItem';
import ClassifierTitle from '@/components/sidebar/classifier/ClassifierTitle';
import useTypeClassifierState from '@/stores/classifier/type';

const TypeClassifier: React.FC = () => {
  const theme = useTheme();

  const { type, toggleEventShow, toggleTaskShow, toggleAlarmShow } =
    useTypeClassifierState();

  return (
    <Dropdown>
      <Dropdown.Controller>
        <ClassifierTitle title={'분류'} />
      </Dropdown.Controller>
      <ClassifierItem
        onClick={toggleEventShow}
        isActive={type.showEvent}
        text={'기념일'}
        color={theme.orange}
      />
      <ClassifierItem
        onClick={toggleTaskShow}
        isActive={type.showTask}
        text={'할 일'}
        color={theme.blue}
      />
      <ClassifierItem
        onClick={toggleAlarmShow}
        isActive={type.showAlarm}
        text={'알림'}
        color={theme.red}
      />
    </Dropdown>
  );
};

export default TypeClassifier;

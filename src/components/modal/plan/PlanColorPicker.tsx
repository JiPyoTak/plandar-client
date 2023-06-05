import React from 'react';

import ColorPicker from '@/components/common/ColorPicker';
import ChevronIcon from '@/components/icons/ChevronIcon';
import { SELECTABLE_COLOR } from '@/constants';
import useFocusedPlanState from '@/stores/plan/focusedPlan';
import { TColor } from '@/types';

const PlanColorPicker = () => {
  const [color, setColor] = useFocusedPlanState(
    (store) => {
      const { focusedPlan, updateFocusedPlan } = store;
      const setColor = (color: TColor) => updateFocusedPlan({ color });
      return [focusedPlan?.color ?? SELECTABLE_COLOR[0], setColor];
    },
    (prev, cur) => prev[0] === cur[0],
  );
  return (
    <ColorPicker
      selectedColor={color}
      onSelect={setColor}
      additionalComponent={<ChevronIcon width="14" type="down" color="black" />}
    />
  );
};
export default PlanColorPicker;

import React from 'react';

import { SELECTABLE_COLOR } from '@/constants';
import { TColor } from '@/types';

type TCandidateItemProps = {
  type: 'tag' | 'category';
  isSelected: boolean;
  name: string;
  color?: TColor;
};

type TCandidateItem = React.FC<TCandidateItemProps>;

const CandidateItem: TCandidateItem = ({
  type,
  isSelected,
  name,
  color = SELECTABLE_COLOR[0],
}: TCandidateItemProps) => {
  return <div />;
};

export default CandidateItem;

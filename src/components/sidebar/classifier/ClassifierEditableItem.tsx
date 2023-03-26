import React from 'react';

import ClassifierItem, {
  CLASSIFIER_EDITABLE_ITEM_CLASS,
} from './ClassifierItem';
import { PencilIcon } from '@/components/icons';

type TProps = React.ComponentProps<typeof ClassifierItem> & {
  onEdit?: (...args: unknown[]) => unknown;
};

const ClassifierEditableItem: React.FC<TProps> = ({ onEdit, ...restProps }) => {
  return (
    <ClassifierItem {...restProps}>
      {onEdit && (
        <PencilIcon
          onClick={onEdit}
          className={CLASSIFIER_EDITABLE_ITEM_CLASS}
          width={20}
          height={20}
        />
      )}
    </ClassifierItem>
  );
};

export default ClassifierEditableItem;

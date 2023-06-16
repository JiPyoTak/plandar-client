import React from 'react';

import IconFrameComponent, { TIconProps } from '../common/IconFrameComponent';

import { ReactComponent as IconComponent } from '@/assets/trashcan-icon.svg';

const DefaultIcon = IconFrameComponent(IconComponent);

const DeleteIcon: React.FC<TIconProps> = (props) => {
  return <DefaultIcon {...props} />;
};

export default DeleteIcon;

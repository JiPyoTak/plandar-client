import React from 'react';

import IconFrameComponent, { TIconProps } from '../common/IconFrameComponent';

import { ReactComponent as IconComponent } from '@/assets/pencil-icon.svg';

const DefaultIcon = IconFrameComponent(IconComponent);

const EditIcon: React.FC<TIconProps> = (props) => {
  return <DefaultIcon {...props} />;
};

export default EditIcon;

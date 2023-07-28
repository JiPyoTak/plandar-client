import React from 'react';

import { css } from '@emotion/react';

interface IProps {
  isOpen: boolean;
  onClose?: () => void;
}

const ModalBackground: React.FC<IProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onMouseDown={onClose}
      css={css`
        z-index: 20;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      `}
    />
  );
};

export default ModalBackground;

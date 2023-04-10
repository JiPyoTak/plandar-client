import React, { useState } from 'react';

import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

import ModalContainer from './index';
import ColorPicker from '@/components/common/ColorPicker';
import { PencilIcon } from '@/components/icons';
import { TSelectableColor } from '@/types';

const CategoryModal = () => {
  const theme = useTheme();
  const [selectedColor, setSelectedColor] =
    useState<TSelectableColor>('primary');
  return (
    <Modal
      isBgBlack={true}
      HeaderLeftComponent={
        <ColorPicker
          selectedColor={selectedColor}
          onSelect={(color: TSelectableColor) => setSelectedColor(color)}
        />
      }
      HeaderRightComponent={
        <button>
          <PencilIcon color={'black'} />
        </button>
      }
    >
      바디입니다
    </Modal>
  );
};

const Modal = styled(ModalContainer)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 214px;
  padding: 24px;
  box-shadow: 1px 10px 25px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

export default CategoryModal;

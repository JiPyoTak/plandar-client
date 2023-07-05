import styled from '@emotion/styled';

import { TColor } from '@/types';

const ColorCircle = styled.div<{ color: TColor; size?: number }>`
  display: inline-block;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  width: ${({ size }) => size ?? 12}px;
  height: ${({ size }) => size ?? 12}px;
`;

export { ColorCircle };

import styled from '@emotion/styled';

import ClassifierTitle from '@/components/sidebar/classifier/ClassifierTitle';
import { FONT_REGULAR_7 } from '@/styles/font';

const ClassifierAdditionalMarginRight = '5px';
const ClassifierAdditionalFontStyle = FONT_REGULAR_7;

const PlanModalClassifierTitle = styled(ClassifierTitle)`
  padding: 21px 0;
  margin-top: 0;
  height: fit-content;
`;

export {
  ClassifierAdditionalMarginRight,
  ClassifierAdditionalFontStyle,
  PlanModalClassifierTitle,
};
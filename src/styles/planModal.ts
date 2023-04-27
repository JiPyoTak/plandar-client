import styled from '@emotion/styled';

import ClassifierTitle from '@/components/sidebar/classifier/ClassifierTitle';
import { FONT_REGULAR_7 } from '@/styles/font';

const ClassifierAdditionalMarginRight = '5px';
const ClassifierAdditionalFontStyle = FONT_REGULAR_7;

const PlanModalClassifierTitle = styled(ClassifierTitle)`
  padding-left: 0;
  padding-right: 0;
`;

export {
  ClassifierAdditionalMarginRight,
  ClassifierAdditionalFontStyle,
  PlanModalClassifierTitle,
};

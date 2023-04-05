import { css } from '@emotion/react';

import { FONT_SIZE } from './fontSize';
import { FONT_WEIGHT } from './fontWeight';

const FONT_BOLD_1 = css([FONT_SIZE[22], FONT_WEIGHT.bold]);
const FONT_BOLD_2 = css([FONT_SIZE[18], FONT_WEIGHT.bold]);
const FONT_BOLD_3 = css([FONT_SIZE[16], FONT_WEIGHT.bold]);
const FONT_BOLD_4 = css([FONT_SIZE[14], FONT_WEIGHT.bold]);
const FONT_BOLD_5 = css([FONT_SIZE[13], FONT_WEIGHT.bold]);
const FONT_BOLD_6 = css([FONT_SIZE[12], FONT_WEIGHT.bold]);
const FONT_BOLD_7 = css([FONT_SIZE[11], FONT_WEIGHT.bold]);
const FONT_BOLD_8 = css([FONT_SIZE[10], FONT_WEIGHT.bold]);

const FONT_REGULAR_1 = css([FONT_SIZE[22], FONT_WEIGHT.regular]);
const FONT_REGULAR_2 = css([FONT_SIZE[18], FONT_WEIGHT.regular]);
const FONT_REGULAR_3 = css([FONT_SIZE[16], FONT_WEIGHT.regular]);
const FONT_REGULAR_4 = css([FONT_SIZE[14], FONT_WEIGHT.regular]);
const FONT_REGULAR_5 = css([FONT_SIZE[13], FONT_WEIGHT.regular]);
const FONT_REGULAR_6 = css([FONT_SIZE[12], FONT_WEIGHT.regular]);
const FONT_REGULAR_7 = css([FONT_SIZE[11], FONT_WEIGHT.regular]);
const FONT_REGULAR_8 = css([FONT_SIZE[10], FONT_WEIGHT.regular]);

const FONT_INITILIZE = css`
  font-family: Pretendard;
  ${FONT_REGULAR_3}
`;

export {
  FONT_BOLD_1,
  FONT_BOLD_2,
  FONT_BOLD_3,
  FONT_BOLD_4,
  FONT_BOLD_5,
  FONT_BOLD_6,
  FONT_BOLD_7,
  FONT_BOLD_8,
};
export {
  FONT_REGULAR_1,
  FONT_REGULAR_2,
  FONT_REGULAR_3,
  FONT_REGULAR_4,
  FONT_REGULAR_5,
  FONT_REGULAR_6,
  FONT_REGULAR_7,
  FONT_REGULAR_8,
};
export { FONT_INITILIZE };

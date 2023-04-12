import styled from '@emotion/styled';

import { FONT_BOLD_8 } from './font';

const TimetableGuide = styled.div`
  ${FONT_BOLD_8}

  flex: 0 0 4rem;
  color: ${({ theme }) => theme.text4};

  text-align: end;
`;

export { TimetableGuide };

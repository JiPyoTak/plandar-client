import { Global, css, useTheme } from '@emotion/react';

import { FONT_INITILIZE } from './font';
import { reset } from '@/styles/reset';

const GlobalStyle: React.FC = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        ${reset}
        :root {
          ${FONT_INITILIZE}
        }
        * {
          box-sizing: border-box;
        }

        html {
          font-size: 30px;
        }

        body {
          width: 100vw;
          height: 100vh;

          overflow: hidden;
        }

        #root {
          width: 100%;
          height: 100%;
        }

        body::-webkit-scrollbar {
          width: 5px;
          background-color: transparent;
        }
        body::-webkit-scrollbar-thumb {
          background-clip: padding-box;
          border-radius: 2px;
          border: none;
          background-color: ${theme.placeholder};
        }
      `}
    />
  );
};

export default GlobalStyle;

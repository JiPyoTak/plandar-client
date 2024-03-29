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
          position: relative;

          width: 100vw;
          height: 100vh;

          overflow: hidden;
        }

        #root {
          width: 100%;
          height: 100%;

          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
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

        #modal {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 999;
        }
      `}
    />
  );
};

export default GlobalStyle;

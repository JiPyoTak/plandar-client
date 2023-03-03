import { ThemeType } from '@/styles/theme';
import '@emotion/react';

declare module '@emotion/react' {
  export type Theme = ThemeType;
}

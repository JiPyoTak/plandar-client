import { ThemeType } from '@/theme/theme';
import '@emotion/react';

declare module '@emotion/react' {
  export type Theme = ThemeType;
}

import { ReactComponent as CheckIconComponent } from '@/assets/check-icon.svg';
import { ReactComponent as PencilIconComponent } from '@/assets/pencil-icon.svg';
import frameIconComponent from '@/utils/frameIconComponent';

const ICON_COMPONENTS = {
  CheckIcon: CheckIconComponent,
  PencilIcon: PencilIconComponent,
} as const;

export const { CheckIcon, PencilIcon } = Object.entries(ICON_COMPONENTS).reduce(
  (result, [key, IconComponent]) => ({
    ...result,
    [key]: frameIconComponent(IconComponent),
  }),
  {} as typeof ICON_COMPONENTS,
);
export * as ChevronIcon from './ChevronIcon';

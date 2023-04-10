import { ReactComponent as CheckIconComponent } from '@/assets/check-icon.svg';
import { ReactComponent as CrossIconComponent } from '@/assets/cross-icon.svg';
import { ReactComponent as PencilIconComponent } from '@/assets/pencil-icon.svg';
import { ReactComponent as PlusIconComponent } from '@/assets/plus-icon.svg';
import { ReactComponent as SearchIconComponent } from '@/assets/search-icon.svg';
import frameIconComponent from '@/utils/frameIconComponent';

const ICON_COMPONENTS = {
  CheckIcon: CheckIconComponent,
  PencilIcon: PencilIconComponent,
  PlusIcon: PlusIconComponent,
  CrossIcon: CrossIconComponent,
  SearchIcon: SearchIconComponent,
} as const;

export const { CheckIcon, PencilIcon, PlusIcon, CrossIcon, SearchIcon } =
  Object.entries(ICON_COMPONENTS).reduce(
    (result, [key, IconComponent]) => ({
      ...result,
      [key]: frameIconComponent(IconComponent),
    }),
    {} as typeof ICON_COMPONENTS,
  );
export * as ChevronIcon from './ChevronIcon';

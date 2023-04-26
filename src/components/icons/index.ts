import { ReactComponent as CategoryIconComponent } from '@/assets/category-icon.svg';
import { ReactComponent as CheckIconComponent } from '@/assets/check-icon.svg';
import { ReactComponent as CrossIconComponent } from '@/assets/cross-icon.svg';
import { ReactComponent as GoogleIconComponent } from '@/assets/google-icon.svg';
import { ReactComponent as KakaoIconComponent } from '@/assets/kakao-icon.svg';
import { ReactComponent as MemoIconComponent } from '@/assets/memo-icon.svg';
import { ReactComponent as PencilIconComponent } from '@/assets/pencil-icon.svg';
import { ReactComponent as PlusIconComponent } from '@/assets/plus-icon.svg';
import { ReactComponent as SearchIconComponent } from '@/assets/search-icon.svg';
import { ReactComponent as TagIconComponent } from '@/assets/tag-icon.svg';
import frameIconComponent from '@/utils/frameIconComponent';

const ICON_COMPONENTS = {
  CheckIcon: CheckIconComponent,
  PencilIcon: PencilIconComponent,
  PlusIcon: PlusIconComponent,
  CrossIcon: CrossIconComponent,
  SearchIcon: SearchIconComponent,
  GoogleIcon: GoogleIconComponent,
  KakaoIcon: KakaoIconComponent,
  MemoIcon: MemoIconComponent,
  TagIcon: TagIconComponent,
  CategoryIcon: CategoryIconComponent,
} as const;

export const {
  CheckIcon,
  PencilIcon,
  PlusIcon,
  CrossIcon,
  SearchIcon,
  KakaoIcon,
  GoogleIcon,
  MemoIcon,
  TagIcon,
  CategoryIcon,
} = Object.entries(ICON_COMPONENTS).reduce(
  (result, [key, IconComponent]) => ({
    ...result,
    [key]: frameIconComponent(IconComponent),
  }),
  {} as typeof ICON_COMPONENTS,
);

export * as ChevronIcon from './ChevronIcon';

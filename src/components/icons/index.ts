import { ReactComponent as CalendarIconComponent } from '@/assets/calendar-icon.svg';
import { ReactComponent as CategoryIconComponent } from '@/assets/category-icon.svg';
import { ReactComponent as CheckIconComponent } from '@/assets/check-icon.svg';
import { ReactComponent as CrossIconComponent } from '@/assets/cross-icon.svg';
import { ReactComponent as GoogleIconComponent } from '@/assets/google-icon.svg';
import { ReactComponent as HamburgerIconComponent } from '@/assets/hamburger-icon.svg';
import { ReactComponent as HomeIconComponent } from '@/assets/home-icon.svg';
import { ReactComponent as KakaoIconComponent } from '@/assets/kakao-icon.svg';
import { ReactComponent as LogoIconComponent } from '@/assets/logo-icon.svg';
import { ReactComponent as MemoIconComponent } from '@/assets/memo-icon.svg';
import { ReactComponent as OnlyLogoIconComponent } from '@/assets/only-logo-icon.svg';
import { ReactComponent as PencilIconComponent } from '@/assets/pencil-icon.svg';
import { ReactComponent as PlusIconComponent } from '@/assets/plus-icon.svg';
import { ReactComponent as SearchIconComponent } from '@/assets/search-icon.svg';
import { ReactComponent as TagIconComponent } from '@/assets/tag-icon.svg';
import { ReactComponent as TrashcanIconComponent } from '@/assets/trashcan-icon.svg';
import IconFrameComponent from '@/components/common/IconFrameComponent';

const ICON_COMPONENTS = {
  CalendarIcon: CalendarIconComponent,
  CheckIcon: CheckIconComponent,
  PencilIcon: PencilIconComponent,
  PlusIcon: PlusIconComponent,
  CrossIcon: CrossIconComponent,
  SearchIcon: SearchIconComponent,
  GoogleIcon: GoogleIconComponent,
  HomeIcon: HomeIconComponent,
  KakaoIcon: KakaoIconComponent,
  LogoIcon: LogoIconComponent,
  MemoIcon: MemoIconComponent,
  OnlyLogoIcon: OnlyLogoIconComponent,
  TagIcon: TagIconComponent,
  CategoryIcon: CategoryIconComponent,
  HamburgerIcon: HamburgerIconComponent,
  TrashcanIcon: TrashcanIconComponent,
} as const;

export const {
  CalendarIcon,
  CheckIcon,
  PencilIcon,
  PlusIcon,
  CrossIcon,
  SearchIcon,
  KakaoIcon,
  GoogleIcon,
  HomeIcon,
  LogoIcon,
  MemoIcon,
  OnlyLogoIcon,
  TagIcon,
  CategoryIcon,
  HamburgerIcon,
  TrashcanIcon,
} = Object.entries(ICON_COMPONENTS).reduce(
  (result, [key, IconComponent]) => ({
    ...result,
    [key]: IconFrameComponent(IconComponent),
  }),
  {} as typeof ICON_COMPONENTS,
);

export * as ChevronIcon from './ChevronIcon';

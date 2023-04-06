import { ReactComponent as CheckIconComponent } from '@/assets/check-icon.svg';
import { ReactComponent as CrossIconComponent } from '@/assets/cross-icon.svg';
import { ReactComponent as GoogleIconComponent } from '@/assets/google-icon.svg';
import { ReactComponent as KakaoIconComponent } from '@/assets/kakao-icon.svg';
import { ReactComponent as PencilIconComponent } from '@/assets/pencil-icon.svg';
import { ReactComponent as PlusIconComponent } from '@/assets/plus-icon.svg';
import frameIconComponent from '@/utils/frameIconComponent';

const ICON_COMPONENTS = {
  CheckIcon: CheckIconComponent,
  CrossIcon: CrossIconComponent,
  GoogleIcon: GoogleIconComponent,
  KakaoIcon: KakaoIconComponent,
  PencilIcon: PencilIconComponent,
  PlusIcon: PlusIconComponent,
} as const;

export const {
  CheckIcon,
  CrossIcon,
  GoogleIcon,
  KakaoIcon,
  PencilIcon,
  PlusIcon,
} = Object.entries(ICON_COMPONENTS).reduce(
  (result, [key, IconComponent]) => ({
    ...result,
    [key]: frameIconComponent(IconComponent),
  }),
  {} as typeof ICON_COMPONENTS,
);
export * as ChevronIcon from './ChevronIcon';

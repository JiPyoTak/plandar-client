import { TDateYMD } from '@/stores/date';

type TTimeHM = { hour: number; minute: number };
type TDateYMDHM = TTimeHM & TDateYMD;

interface IExtractedTimeInfo {
  invalid: boolean;
  meridiem: '오전' | '오후';
  hour: number;
  minute: number;
}

export type { IExtractedTimeInfo, TTimeHM, TDateYMDHM };

interface IExtractedTimeInfo {
  invalid: boolean;
  meridiem: '오전' | '오후';
  hour: number;
  minute: number;
}

export type { IExtractedTimeInfo };

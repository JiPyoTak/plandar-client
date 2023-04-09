const CALENDAR_UNIT = ['일', '주', '월'] as const;

const DAY_OF_WEEK_UNIT = ['일', '월', '화', '수', '목', '금', '토'] as const;

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;
const ACCESS_TOKEN_KEY = import.meta.env.VITE_APP_ACCESS_TOKEN_KEY;

export { CALENDAR_UNIT, DAY_OF_WEEK_UNIT, SERVER_URL, ACCESS_TOKEN_KEY };

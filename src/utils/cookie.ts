/**
 * 쿠키에 저장된 key값에 해당하는 value 값을 가져옵니다.
 * @param key
 * @returns { value | undefined } cookie 값
 */
const getCookie = (key: string) => {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${key.replace(/([.$?*|{}()[]\/+^])/g, '$1')}=([^;]*)`),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
};

/**
 * 쿠키 전체를 삭제하거나 key값에 해당하는 value 값을 삭제합니다.
 * @param keys
 */
const clearCookie = (keys?: string | string[]): void => {
  const isAllClear = !keys;

  document.cookie.split(';').forEach((cookie) => {
    const key = cookie.split('=')[0];

    if (isAllClear || key === keys || keys?.indexOf(key) >= 0)
      document.cookie = cookie
        .replace(/^ +/, '')
        .replace(/=.*/, '=;max-age=0;');
  });
};

export { getCookie, clearCookie };

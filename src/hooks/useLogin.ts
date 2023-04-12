import { useLayoutEffect, useState } from 'react';

import { getUserAPI } from '@/apis/user';
import useUserStore from '@/stores/user';

const useLogin = () => {
  const { user, setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(user === null);

  useLayoutEffect(() => {
    if (user) return () => undefined;

    (async function checkUser() {
      try {
        const { success, data } = await getUserAPI();

        if (success && data) {
          setUser(data);
        }
      } catch (e) {
        // Do Nothing
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return { isLoading };
};

export default useLogin;

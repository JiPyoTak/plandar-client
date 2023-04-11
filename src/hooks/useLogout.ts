import { useNavigate } from 'react-router-dom';

import { logoutAPI } from '@/apis/user';
import useUserStore from '@/stores/user';

const useLogout = () => {
  const { reset } = useUserStore();
  const navigate = useNavigate();

  return async () => {
    // Clearing Cookie - refresh, access
    await logoutAPI();

    // Reset State and Move
    reset();
    navigate('/login');
  };
};

export default useLogout;

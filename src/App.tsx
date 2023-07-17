import { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import styled from '@emotion/styled';

import PrivateRoute from './components/core/PrivateRoute';
import useLogin from './hooks/useLogin';
import Login from './pages/Login';
import { toast } from '@/core/toast';
import Home from '@/pages';
import useUserStore from '@/stores/user';
import GlobalStyle from '@/styles/GlobalStyle';

const App = () => {
  const { isLoading: isLoginLoading } = useLogin();
  const isFirstTime = useRef(true);
  const username = useUserStore((state) => state?.user?.username);

  useEffect(() => {
    if (!(isFirstTime.current && username)) return;

    isFirstTime.current = false;
    toast(`${username}님, 환영합니다`);
  }, [username, isFirstTime.current]);

  return (
    <Wrapper id="App">
      <GlobalStyle />
      {!isLoginLoading && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import styled from '@emotion/styled';

import PrivateRoute from './components/common/PrivateRoute';
import useLogin from './hooks/useLogin';
import Login from './pages/Login';
import Home from '@/pages';
import Test from '@/pages/Test';
import GlobalStyle from '@/styles/GlobalStyle';

const App = () => {
  const { isLoading: isLoginLoading } = useLogin();

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
            <Route path="/test" element={<Test />} />
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

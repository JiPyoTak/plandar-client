import { BrowserRouter, Route, Routes } from 'react-router-dom';

import styled from '@emotion/styled';

import Home from '@/pages';
import Test from '@/pages/Test';
import GlobalStyle from '@/styles/GlobalStyle';

const App = () => {
  return (
    <Wrapper id="App">
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;

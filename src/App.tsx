import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/pages';
import Test from '@/pages/Test';
import GlobalStyle from '@/styles/GlobalStyle';

const App = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

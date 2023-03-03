import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/page';
import Test from '@/page/Test';
import GlobalStyle from '@/theme/GlobalStyle';

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

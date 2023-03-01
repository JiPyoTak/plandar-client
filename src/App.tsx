import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '@/page';
import GlobalStyle from '@/theme/GlobalStyle';

const App = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

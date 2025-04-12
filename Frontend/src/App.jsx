
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import GreetingPage from './components/GreetingPage';
import TestWindow from './components/TestWindow';
import EndTestCode from './components/EndTestCode';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GreetingPage />} />
        <Route path='/test' element={<TestWindow />} />
        <Route path='/end-test' element={<EndTestCode />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;


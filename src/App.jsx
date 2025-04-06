import React from 'react'

import GreetingPage from './components/GreetingPage';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import TestWindow from './components/TestWindow';
import EndTestCode from './components/EndTestCode';





const App = () => {
  return (
    <BrowserRouter>
    
    <Routes>
        <Route path='/' element = {<GreetingPage/>}></Route>
        <Route path='/test' element = {<TestWindow/>}></Route>
        <Route path="/end-test" element={<EndTestCode />}></Route>
       
        
    </Routes>
    
    </BrowserRouter>
  )
}

export default App



import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home';
import Header from './Components/Header';
import Quizes from './Pages/Quizes';
import Discuss from './Pages/Discuss';
import Interviews from './Pages/Interview';

function App() {
  return (
    <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/quizes' element={<Quizes></Quizes>}></Route>
          <Route path='/discuss' element={<Discuss></Discuss>}></Route>
          <Route path='/interview' element={<Interviews></Interviews>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;

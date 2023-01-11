import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './Nav';

import './App.css';
// import { BrowserRouter } from 'react-router-dom'
import Corps from './corps.js/Corps.js'
import Detail from './Detail/Detail';
import Favoris from './Favoris/Favoris';

function App() {

  


  return (
    <div >

      
      <BrowserRouter>
      <Navigation />
        <Routes>
        <Route path="" element={<Corps/>}/>
        <Route path='/detail' element={<Detail/>}/>
        <Route path='/favoris' element={<Favoris/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import './App.css';
import Header from './components/Header.js';
import Acceuil from './pages/acceuil.js';
import About from './pages/about.js';
import Work from './pages/work.js';
import Footer from './components/Footer.js';


function App() {
  const [acceuil, setAcceuil] = useState(false)
  return (
    <div className='app-container' style={{backgroundColor: acceuil && 'black'}}>
      <Router>
        <Header acceuil={acceuil} />
          <div className='content'>
        <Routes>
          <Route element={<Acceuil setAcceuil={setAcceuil}/>} path='/' exact/>
          <Route element={<About setAcceuil={setAcceuil}/>} path='/about' exact/>
          <Route element={<Work setAcceuil={setAcceuil}/>} path='/work' exact/>
        </Routes>
        </div>
        <Footer acceuil={acceuil}/>
      </Router>
    </div>
  );
}

export default App;

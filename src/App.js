import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, {useState} from 'react';
import './App.css';
import Header from './components/Header.js';
import Acceuil from './pages/acceuil.js';
import About from './pages/about.js';
import Work from './pages/work.js';
import Footer from './components/Footer.js';
import Foto from './pages/foto.js';
import Carel from './pages/carel.js';


function App() {
  const [acceuil, setAcceuil] = useState(false)
  const [logoFanch, setLogoFanch] = useState(true)
  return (
    <div className='app-container' style={{backgroundColor: acceuil && 'black'}}>
      <Router>
        <Header acceuil={acceuil} />
          <div className='content'>
        <Routes>
          <Route element={<Acceuil setAcceuil={setAcceuil} setLogoFanch={setLogoFanch}/>} path='/' exact/>
          <Route element={<About setAcceuil={setAcceuil} setLogoFanch={setLogoFanch}/>} path='/about' exact/>
          <Route element={<Work setAcceuil={setAcceuil} setLogoFanch={setLogoFanch}/>} path='/work' exact/>
          <Route element={<Foto setAcceuil={setAcceuil} setLogoFanch={setLogoFanch}/>} path='/Foto' exact/>
          <Route element={<Carel setAcceuil={setAcceuil} setLogoFanch={setLogoFanch}/>} path='/carel' exact/>
        </Routes>
        </div>
        <Footer acceuil={acceuil} logoFanch={logoFanch}/>
      </Router>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home.tsx';
import About from './pages/about';
import Work from './pages/work';
import Footer from './components/Footer';
import Foto from './pages/foto';
import Carel from './pages/carel';
import Nika from './pages/nika.tsx';
import './index.css';
import Background from './entities/Background.ts';

type BackgroundColor = typeof Background[keyof typeof Background];

const App: React.FC = () => {
  const [acceuil, setAcceuil] = useState<BackgroundColor>(Background.White);
  const [logoFanch, setLogoFanch] = useState<boolean>(true);

  return (
    <div id="nika-wrapper" className="h-screen w-screen flex flex-col" style={{ backgroundColor: acceuil }} >
      <Router>
        <Header acceuil={acceuil} />
        <div className="relative overflow-hidden flex-1">
          <Routes>
            <Route path="/" element={<Home setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} acceuil={acceuil}/>} />
            <Route path="/about" element={<About setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} />} />
            <Route path="/work" element={<Work setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} />} />
            <Route path="/photo" element={<Foto setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} />} />
            <Route path="/carel" element={<Carel setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} />} />
            <Route path="/nika" element={<Nika setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} />} />
          </Routes>
        </div>
        <Footer acceuil={acceuil} logoFanch={logoFanch} />
      </Router>
    </div>
  );
};

export default App;

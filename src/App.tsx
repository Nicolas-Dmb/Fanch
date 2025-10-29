import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.tsx';
import Home from './pages/Home.tsx';
import About from './pages/about';
import Work from './pages/work';
import Footer from './components/Footer.tsx';
import Foto from './pages/foto';
import Carel from './pages/carel.tsx';
import Nika from './pages/nika.tsx';
import './index.css';
import Colors from './entities/Background.ts';

type BackgroundColor = typeof Colors[keyof typeof Colors];

const App: React.FC = () => {
  const [bgColor, setAcceuil] = useState<BackgroundColor>(Colors.White);
  const [textColor, setTextColor] = useState<BackgroundColor>(Colors.Black);
  const [logoFanch, setLogoFanch] = useState<boolean>(true);

  return (
    <div id="nika-wrapper" className="h-screen w-screen flex flex-col" style={{ backgroundColor: bgColor }} >
      <Router>
        <Header bgColor={bgColor} textColor={textColor}/>
        <div className="relative overflow-hidden flex-1">
          <Routes>
            <Route path="/" element={<Home setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} acceuil={bgColor} setTextColor={setTextColor}/>} />
            <Route path="/about" element={<About setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} setTextColor={setTextColor}/>} />
            <Route path="/work" element={<Work setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} setTextColor={setTextColor}/>} />
            <Route path="/photo" element={<Foto setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} setTextColor={setTextColor}/>} />
            <Route path="/carel" element={<Carel setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} setTextColor={setTextColor}/>} />
            <Route path="/nika" element={<Nika setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} setTextColor={setTextColor}/>} />
          </Routes>
        </div>
        <Footer bgColor={bgColor} textColor={textColor} logoFanch={logoFanch} />
      </Router>
    </div>
  );
};

export default App;

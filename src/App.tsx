import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header.tsx';
import Home from './pages/Home.tsx';
import About from './pages/about';
import Work from './pages/work';
import Footer from './components/Footer.tsx';
import Carel from './pages/carel.tsx';
import Nika from './pages/nika.tsx';
import './index.css';
import Colors from './entities/Background.ts';
import CarelDetailRoute from './features/Carel/components/CarelDetail.tsx';

type BackgroundColor = typeof Colors[keyof typeof Colors];

const App: React.FC = () => {
  const [bgColor, setAcceuil] = useState<BackgroundColor>(Colors.White);
  const [textColor, setTextColor] = useState<BackgroundColor>(Colors.Black);
  const [logoFanch, setLogoFanch] = useState<boolean>(true);
  const [defaultStyle, setDefaultStyleState] = useState<boolean>(true);

  useEffect(() => {
    document.body.style.backgroundColor = bgColor;
    document.documentElement.style.backgroundColor = bgColor;
    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
    };
  }, [bgColor]);

  const setDefaultStyle = (isActive: boolean) => {
    if (isActive) {
      setDefaultStyleState(true);
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.overscrollBehavior = "none";
    } else {
      setDefaultStyleState(false);
      document.body.style.height = "";
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
    }
  }

  return (
    <div id="global-wrapper" className={defaultStyle ? 'h-screen w-screen flex flex-col overflow-hidden h-[100svh]' : 'h-screen w-screen flex flex-col overflow-hidden'} style={{backgroundColor: bgColor }} >
      <Router>
        <Header bgColor={bgColor} textColor={textColor}/>
        <div className="relative overflow-hidden flex-1">
          <Routes>
            <Route path="/" element={<Home setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} acceuil={bgColor} setTextColor={setTextColor} setDefaultStyle={setDefaultStyle}/>} />
            <Route path="/about" element={<About setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} setTextColor={setTextColor} setDefaultStyle={setDefaultStyle}/>} />
            <Route path="/work" element={<Work setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} setTextColor={setTextColor} setDefaultStyle={setDefaultStyle}/>} />
            <Route path="/carel" element={<Carel setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} setTextColor={setTextColor} setDefaultStyle={setDefaultStyle}/>} />
            <Route path="/nika" element={<Nika setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} setTextColor={setTextColor} setDefaultStyle={setDefaultStyle}/>} />
            <Route path="/carel/:name" element={<CarelDetailRoute setAcceuil={setAcceuil} setLogoFanch={setLogoFanch} setTextColor={setTextColor} setDefaultStyle={setDefaultStyle}/>} />
          </Routes>
        </div>
        <Footer bgColor={bgColor} textColor={textColor} logoFanch={logoFanch} />
      </Router>
    </div>
  );
};

export default App;

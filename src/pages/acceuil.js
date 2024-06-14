import React, {useEffect, useRef, useState} from 'react';
import Typewriter from 'typewriter-effect';
import Tetris from '../components/Tetris.js'
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

const screen = window.innerHeight;
const screenWidth = window.innerWidth;

function Acceuil({ setAcceuil, setLogoFanch }) {
  const [nameCircle, setNameCircle] = useState('circle');
  const [background, setBackground] = useState(false);
  const [descente, setDescente] = useState(); // Décompte

  useEffect(() => {
    setAcceuil(background);
    setLogoFanch(false);
  }, [background, setAcceuil, setLogoFanch]);

  const Descente = () => {
    let temps = 150;
    let interval = setInterval(() => {
      setDescente(prevDescente => prevDescente + 1);
    }, temps);
    return () => clearInterval(interval);
  };

  const handleCircle = () => {
    setNameCircle('circleClick');
    const time = 2000;
    setTimeout(() => {
      setBackground(true);
      setDescente(0);
    }, time);
    Descente();
  };
  const handleNoGame = () => {
      setBackground(true);
      setDescente(50);
  };

  return (
    <div style={{backgroundColor:background&&'black'}}>
    {!descente ?
    <div className='point'>
        <div className={nameCircle} onClick={handleCircle}></div>
        <div className='partie2'  onClick={handleNoGame}>
        <Typewriter 
            className='NoGame'
                options={{
                    strings: ["no game"],
                    pause:1000,
                    autoStart: true,
                    loop: true,
                }}
        />
        </div>
    </div>: <Tetris descente={descente}/>}
    </div>
  );
}

export default Acceuil;





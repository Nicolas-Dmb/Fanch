import { useEffect } from 'react';
import Colors from '../entities/Background.ts';

function About({setAcceuil,setLogoFanch, setTextColor, LockLayout}) {
  useEffect(() => {
    setAcceuil(Colors.White)
    setTextColor(Colors.Black)
    setLogoFanch(true)
    LockLayout(true)
  });
  return (
    <div className="about">
    </div>
  );
}

export default About;

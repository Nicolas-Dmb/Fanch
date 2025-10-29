import {useEffect, useState, useRef} from 'react';
import Colors from '../../../entities/Background.ts';
import data from '../static/tetris_timeline.json';

type BackgroundColor = typeof Colors[keyof typeof Colors];

interface useHomeProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
  setTextColor: React.Dispatch<React.SetStateAction<BackgroundColor>>;
}


export default function useHome({setAcceuil, setLogoFanch, setTextColor}:useHomeProps) {
  const [nameCircle, setNameCircle] = useState('circle');
  const grid = data.grid; 
  const [displayTetris, setDisplayTetris] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const timeline: any[] = data.timeline;
  const lastFrameIndex = timeline.length - 1;
  const [frameIndex, setFrameIndex] = useState(0);
  const frame = timeline[frameIndex];
  const [phase, setPhase] = useState<"idle" | "expanding" | "done">("idle");



  useEffect(() => {
    setAcceuil(Colors.White);
    setTextColor(Colors.Black);
    setLogoFanch(false);

    function computeSize() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      console.log('rect:', rect);
      setSize({
        w: rect.width,
        h: rect.height,
      });
    }

    computeSize();

    window.addEventListener("resize", computeSize);
    return () => {
      window.removeEventListener("resize", computeSize);
    };
  }, [setAcceuil, setLogoFanch, setTextColor]);

  const handleNoGame = () => {
      setFrameIndex(lastFrameIndex);
      setDisplayTetris(true);
      setAcceuil(Colors.Black);
      setTextColor(Colors.White);
  };

  const tetrisFrame = () => {
    const id = setInterval(() => {
      setFrameIndex((prev) => {
          if (prev >= lastFrameIndex) {
            return prev; 
          }
          return prev + 1;
        });
      }, 150);
    return () => clearInterval(id);
  }

  const handleCircleClick = () => {
      setNameCircle('circleClick')
      setPhase("expanding");

      // run circle animation then change background
      const time = 2000;
      setTimeout(() => {
        setDisplayTetris(true);
        setPhase("done");   
        setAcceuil(Colors.Black);
        setTextColor(Colors.White);
        tetrisFrame();
      }, time);
    
  }

  function handleCellClick(link: string) {
    console.log("clicked on link:", link);

    switch (link) {
      case "nika":
        window.location.href = "/Nika";
        break;
      case "carel":
        window.location.href = "/carel";
        break;
      default:
        console.warn("Unknown link:", link);
    }
  }

  return {
    nameCircle,
    grid,
    frame,
    displayTetris,
    handleNoGame,
    handleCircleClick,
    handleCellClick,
    size,
    containerRef,
    phase
  };
}
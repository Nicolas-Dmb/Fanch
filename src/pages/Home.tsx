import Typewriter from 'typewriter-effect';
import TetrisBoard from '../features/Home/components/Tetris.tsx'
import Background from '../entities/Background.ts';
import useHome from '../features/Home/hooks/useHome.ts';
import CircleOverlay from '../features/Home/components/Circle.tsx';

type BackgroundColor = typeof Background[keyof typeof Background];

interface HomeProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
  acceuil: BackgroundColor;
}

function Home({ setAcceuil, setLogoFanch, acceuil}:HomeProps) {
  const {nameCircle, grid, frame, displayTetris, handleNoGame, handleCircleClick, handleCellClick, size, containerRef,phase} = useHome({setAcceuil, setLogoFanch});

  const showIntro = phase === "idle";
  const showCircle = phase !== "done";


  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: acceuil }}
      className="w-full h-full relative"
    >
      {displayTetris ? (
        <TetrisBoard
          grid={grid}
          frame={frame}
          pixelWidth={size.w}
          pixelHeight={size.h}
          onCellClick={handleCellClick}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          {showIntro && (
            <div className="partie2 cursor-pointer" onClick={handleNoGame}>
              <Typewriter
                options={{
                  strings: ["no game"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </div>
          )}
        </div>
      )}

      {showCircle && (
        <CircleOverlay
          phase={phase}
          nameCircle={nameCircle}
          onClick={handleCircleClick}
        />
      )}
    </div>
  );
}

export default Home;





import Typewriter from 'typewriter-effect';
import TetrisBoard from '../features/Home/components/Tetris.tsx'
import Colors from '../entities/Background.ts';
import useHome from '../features/Home/hooks/useHome.ts';
import CircleOverlay from '../features/Home/components/Circle.tsx';
import useIsDesktop from '../hooks/isDesktop.tsx';
import Modal from '../components/Modal.tsx';
type BackgroundColor = typeof Colors[keyof typeof Colors];

interface HomeProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
  setTextColor: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  acceuil: BackgroundColor;
}

function Home({ setAcceuil, setLogoFanch,setTextColor, acceuil}:HomeProps) {
  const isDesktop = useIsDesktop();
  const {nameCircle, grid, frame, displayTetris, handleNoGame, handleCircleClick, handleCellClick, setDisplayMobileModal, size, containerRef,phase, displayMobileModal} = useHome({setAcceuil, setLogoFanch, setTextColor, isDesktop});

  const showIntro = phase === "idle";
  const showCircle = phase !== "done";


  return (
    <div
      ref={containerRef}
      style={{ backgroundColor: acceuil }}
      className="w-full h-full relative"
    >
      {displayMobileModal && 
        <Modal onClose={() => setDisplayMobileModal(false)} title="Bienvenue" content="Pour une meilleure expérience, il est préférable de visiter ce site sur ordinateur." background={Colors.White} text={Colors.Black} />
      }
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





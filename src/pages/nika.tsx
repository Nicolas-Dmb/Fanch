import {ColorType} from "../entities/Background.ts";
import useNika from "../features/Nika/hooks/useNika.ts";
import useDomino from "../features/Nika/hooks/useDominos.ts";
import useFonts from "../features/Nika/hooks/useFonts.ts";
import FontInput from "../features/Nika/components/FontInput.tsx";
import Book from "../features/Nika/components/Book.tsx";
import useNavigation from "../features/Nika/hooks/useNavigation.tsx";
import useDetailSimple from "../features/Nika/hooks/useDetailSimple.ts";

interface NikaProps {
  setAcceuil: React.Dispatch<React.SetStateAction<ColorType>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
  setTextColor: React.Dispatch<React.SetStateAction<ColorType>>;
}



export default function Nika({ setAcceuil, setLogoFanch, setTextColor }: NikaProps) {
    const {textRef, nRef, iRef, kRef, aRef, transitionRef, screenTiltTl, dominoTl, fallTl} = useDomino();
    const  {fontsTlRef, thinRef, bookRef, inputRef} = useFonts();
    const { left, right, transitionLeft, transitionRight, nextPageAnimation, prevPageAnimation } = useDetailSimple();
    const {
      currentLeftPage, currentRightPage, transitionLeftPage, transitionRightPage,
      goNext, goPrev, reset,close
    } = useNavigation({nextPageAnimation, prevPageAnimation });
    const { hasScrolled, letterClassName } = useNika({
        setAcceuil, setLogoFanch, setTextColor,
        screenTiltTl, dominoTl, fallTl, fontsTlRef,
        goNext, goPrev,
        currentPage: currentRightPage,
        maxPage: 4,
        bookRef,
        inputRef,
        reset,
        close
      });

  return (
    <>
    {/* Domino Effect Section */}
    <section 
      className="bg-[#f6e820] font-perso h-full w-full relative overflow-hidden flex flex-col items-center justify-center">
      <div ref={textRef} className="text-[30vw] md:text-[45vw] leading-[0.78] font-normal text-black select-none will-change-transform z-[999] relative">
        <p ref={nRef} style={!hasScrolled ?{
            }:{}} className={letterClassName}>N</p>
        <p ref={iRef} style={!hasScrolled ?{
                transition: "transform 0.6s ease-out",
            }:{}} className={letterClassName}>i</p>
        <p ref={kRef} style={!hasScrolled ?{
                transition: "transform 0.6s ease-out",
            }:{}} className={letterClassName}>k</p>
        <p ref={aRef} style={!hasScrolled ?{
                transition: "transform 0.6s ease-out",
            }:{}} className={letterClassName}>a</p>
      </div>
    </section>
    {/* Fonts Section */}
    <section ref={transitionRef} className="absolute inset-0 bg-[#f6e820] w-full">
      <section ref={thinRef} className="absolute inset-0 bg-[#f6e820] w-full flex flex-col md:flex-row items-center justify-center md:gap-[4vw] px-[4vw] py-[4vh] text-black font-thin">
        <div className="basis-[45%] flex items-start justify-start">
          <p className="text-[40vw] md:text-[45vw] leading-none text-black relative z-[2] font-perso">
            A
          </p>
        </div>

        <div className="basis-[40%] flex flex-col">
          <p
            className="text-[6vw] md:text-[4vw] leading-none text-black font-perso"
            style={{ opacity: 1 }}
          >
            Nika
          </p>

          <p className="text-[2vw] md:text-[1vw] leading-none tracking-bold mt-[4vh] pr-[2vw] md:pr-[0vw] font-text font-weight-700">
            Nika est une typographie linéale sans empattement, dessinée avec un contraste nul et des
            épaisseurs de traits homogènes, proposée ici en graisse light. La famille s’appuie sur une
            construction géométrique, des axes verticaux dominants, des courbes ouvertes et des
            terminaisons nettes, garantissant une bonne régularité de dessin. Les contreformes larges,
            la hauteur d’x modérée et un espacement contrôlé assurent une lisibilité stable pour des
            usages éditoriaux, identitaires et signalétiques.
          </p>

          <div className="w-full border-t border-black mt-[4vh] mb-[4vh]" />

          <div className="text-[4vw] md:text-[3vw] leading-none font-perso">
            <p>ABCDEFGHIJKLMN</p>
            <p>OPQRSTUVWXYZ</p>
            <p>abcdefghijklmnopqrstuvwxyz</p>
            <p>0123456789</p>
            <p>&amp; #- £ ! * @ : /</p>
          </div>
        </div>
      </section>
    </section>
    <Book
      ref={bookRef}
      bookApi={{
        left, right, transitionLeft, transitionRight,
        currentLeftPage, currentRightPage, transitionLeftPage, transitionRightPage
      }}
    />
    <FontInput ref={inputRef}/>
    </>
  );
}
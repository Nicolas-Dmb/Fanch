import Background from "../entities/Background.ts";
import useNika from "../features/Nika/hooks/useNika.ts";
import useDomino from "../features/Nika/hooks/useDominos.ts";
import useFonts from "../features/Nika/hooks/useFonts.ts";

type BackgroundColor = typeof Background[keyof typeof Background];

interface NikaProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
}



export default function Nika({ setAcceuil, setLogoFanch }: NikaProps) {
    const {textRef, nRef, iRef, kRef, aRef, transitionRef, screenTiltTl, dominoTl, fallTl} = useDomino();
    const  {fontsTlRef, thinRef,regularRef,boldRef} = useFonts();
    const {hasScrolled,letterClassName } = useNika({setAcceuil, setLogoFanch, screenTiltTl, dominoTl, fallTl, fontsTlRef});
    

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
    <section ref={transitionRef} className="absolute inset-0 bg-[#f6e820] w-full font-perso">
      <section ref={thinRef} className="absolute inset-0 bg-[#f6e820] w-full flex flex-row items-center justify-center gap-[4vw] px-[4vw] py-[4vh] text-black font-thin">
        <div className="basis-[45%] flex items-start justify-start">
          <p className="text-[30vw] md:text-[45vw] leading-none text-black relative z-[2]">
            A
          </p>
        </div>

        <div className="basis-[40%] flex flex-col">
          <p
            className="text-[4vw] leading-none text-black"
            style={{ opacity: 1 }}
          >
            Nika_Thin
          </p>

          <p className="text-[0.8vw] leading-none tracking-tight uppercase mt-[2vh]">
            FAIRE UN TEXTE EXPRIMANT LES INSPIRATION ET COMMENT TU EN ES ARRIVÉ LA
          </p>

          <div className="w-full border-t border-black mt-[4vh] mb-[4vh]" />

          <div className="text-[2vw] leading-[1.1]">
            <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p className="mt-[2vh]">abcdefghijklmnopqrstuvwxyz</p>
            <p className="mt-[2vh]">0123456789</p>
            <p className="mt-[2vh]">&amp; #- £ ! * @ : /</p>
          </div>
        </div>
    </section>
    <section ref={regularRef} className="absolute inset-0 bg-[#f6e820] w-full flex flex-row items-center justify-center gap-[4vw] px-[4vw] py-[4vh] text-black font-normal">
      <div className="basis-[45%] flex items-start justify-start">
        <p className="text-[30vw] md:text-[45vw] leading-none text-black relative z-[2]">
          A
        </p>
      </div>

      <div className="basis-[40%] flex flex-col">
        <p
          className="text-[4vw] leading-none text-black"
        >
          Nika_Regular
        </p>

        <p className="text-[0.8vw] leading-none tracking-tight uppercase mt-[2vh]">
          FAIRE UN TEXTE EXPRIMANT LES INSPIRATION ET COMMENT TU EN ES ARRIVÉ LA
        </p>

        <div className="w-full border-t border-black mt-[4vh] mb-[4vh]" />

        <div className="text-[2vw] leading-[1.1]">
          <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p className="mt-[2vh]">abcdefghijklmnopqrstuvwxyz</p>
          <p className="mt-[2vh]">0123456789</p>
          <p className="mt-[2vh]">&amp; #- £ ! * @ : /</p>
        </div>
      </div>
    </section>
    <section ref={boldRef} className="absolute inset-0 bg-[#f6e820] w-full flex flex-row items-center justify-center gap-[4vw] px-[4vw] py-[4vh] text-black font-bold">
      <div className="basis-[45%] flex items-start justify-start">
        <p className="text-[30vw] md:text-[45vw] leading-none text-black relative z-[2]">
          A
        </p>
      </div>

      <div className="basis-[40%] flex flex-col">
        <p
          className="text-[4vw] leading-none text-black"
        >
          Nika_Bold
        </p>

        <p className="text-[0.8vw] leading-none tracking-tight uppercase mt-[2vh]">
          FAIRE UN TEXTE EXPRIMANT LES INSPIRATION ET COMMENT TU EN ES ARRIVÉ LA
        </p>

        <div className="w-full border-t border-black mt-[4vh] mb-[4vh]" />

        <div className="text-[2vw] leading-[1.1]">
          <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
          <p className="mt-[2vh]">abcdefghijklmnopqrstuvwxyz</p>
          <p className="mt-[2vh]">0123456789</p>
          <p className="mt-[2vh]">&amp; #- £ ! * @ : /</p>
        </div>
      </div>
    </section>
    </section>
    </>
  );
}
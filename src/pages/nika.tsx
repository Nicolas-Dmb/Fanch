import Background from "../entities/Background.ts";
import useNika from "../features/Nika/hooks/useNika.ts";


type BackgroundColor = typeof Background[keyof typeof Background];

interface NikaProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
}



export default function Nika({ setAcceuil, setLogoFanch }: NikaProps) {
    const {hasScrolled,letterClassName, textRef, nRef, iRef, kRef, aRef, inputRef } = useNika(setAcceuil, setLogoFanch);
    

  return (
    <section
      className="bg-[#f6e820] font-perso h-full w-full relative overflow-hidden flex flex-col items-center justify-end">
      <div ref={textRef} className="text-[35vw] md:text-[50vw] leading-[0.78] font-normal text-black select-none will-change-transform z-[999] relative">
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
       <div
        ref={inputRef}
        className="w-[60vw] h-[10vh] flex items-end"
        >
            <input
                type="text"
                className=" text-[3vw] md:text-[5vw] w-full h-auto outline-none border-b-[3px] border-black bg-transparent text-black text-4xl leading-none placeholder-black pb-1 px-0 "
                placeholder="Tape ici..."
            />
        </div>
    </section>
  );
}

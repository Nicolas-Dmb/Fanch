import { useEffect } from "react";
import Colors from "../entities/Background.ts";
import Storage from "../features/Carel/static/images/storage.png";
import Alesia from "../features/Carel/static/images/alesia.png";
import APC from "../features/Carel/static/images/apc.png";
import Concorde from "../features/Carel/static/images/concorde.png";
import useFolders from "../features/Carel/hooks/useFolders.tsx";
import defaultFolder from "../features/Carel/static/images/default_folder.png";


type BackgroundColor = typeof Colors[keyof typeof Colors];

interface carelProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
  setTextColor: React.Dispatch<React.SetStateAction<BackgroundColor>>;
}

export default function Carel({ setAcceuil, setLogoFanch, setTextColor }: carelProps) {
  const { windowRef, concordeRef, apcRef, alesiaRef, StorageRef, defaultRef,  handleClick } = useFolders();

  useEffect(() => {
    setAcceuil(Colors.Black);
    setTextColor(Colors.White);
    setLogoFanch(false);
  }, [setAcceuil, setLogoFanch, setTextColor]);

  

  return (
    <div ref={windowRef} className="w-full h-screen relative overflow-hidden">
      <img ref={StorageRef} src={Storage} alt="Storage" className="absolute w-[70vw] h-auto" />
      <img ref={concordeRef} src={Concorde} alt="Concorde" className="absolute w-[70vw] h-auto" onClick={()=>{handleClick("concorde")}}/>
      <img ref={apcRef} src={APC} alt="APC" className="absolute w-[70vw] h-auto"  onClick={()=>{handleClick("apc")}}/>
      <img ref={alesiaRef} src={Alesia} alt="Alesia" className="absolute w-[70vw] h-auto" onClick={()=>{handleClick("alesia")}}/>
      <img ref={defaultRef} src={defaultFolder} alt="Default Folders" className="absolute w-[70vw] h-auto" />
    </div>
  );
}

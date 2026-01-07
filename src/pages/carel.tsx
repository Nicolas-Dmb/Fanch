import { useEffect } from "react";
import Colors from "../entities/Background.ts";
import Storage from "../features/Carel/static/images/storage.png";
import Alesia from "../features/Carel/static/images/alesia.png";
import APC from "../features/Carel/static/images/apc.png";
import Concorde from "../features/Carel/static/images/concorde.png";
import useFolders from "../features/Carel/hooks/useFolders.tsx";
import maroquinerie from "../features/Carel/static/images/maroquinerie.png";
import chaussures from "../features/Carel/static/images/chaussures.png";
import close_folders from "../features/Carel/static/images/close_folders.png";
import clemenceau from "../features/Carel/static/images/clemenceau.png";

type BackgroundColor = typeof Colors[keyof typeof Colors];

interface carelProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
  setTextColor: React.Dispatch<React.SetStateAction<BackgroundColor>>;
}

export default function Carel({ setAcceuil, setLogoFanch, setTextColor }: carelProps) {
  const { windowRef, concordeRef, apcRef, alesiaRef, StorageRef, maroquinerieRef, chaussuresRef, closeFoldersRef, clemenceauRef } = useFolders();

  useEffect(() => {
    setAcceuil(Colors.Black);
    setTextColor(Colors.White);
    setLogoFanch(false);
  }, [setAcceuil, setLogoFanch, setTextColor]);

  

  return (
    <div ref={windowRef} className="w-full h-screen relative overflow-hidden">
      <img ref={closeFoldersRef} src={close_folders} alt="Close Folders" className="absolute w-[70vw] h-auto"/>
      <img ref={StorageRef} src={Storage} alt="Storage" className="absolute w-[70vw] h-auto" />
      <img ref={concordeRef} src={Concorde} data-folder="concorde" alt="Concorde" className="absolute w-[70vw] h-auto"/>
      <img ref={chaussuresRef} src={chaussures} data-folder="chaussures" alt="Chaussures" className="absolute w-[70vw] h-auto"/>
      <img ref={apcRef} src={APC} data-folder="apc" alt="APC" className="absolute w-[70vw] h-auto"/>
      <img ref={maroquinerieRef} src={maroquinerie} data-folder="maroquinerie" alt="Maroquinerie" className="absolute w-[70vw] h-auto"/>
      <img ref={alesiaRef} src={Alesia} data-folder="alesia" alt="Alesia" className="absolute w-[70vw] h-auto"/>
      <img ref={clemenceauRef} src={clemenceau} data-folder="clemenceau" alt="Clemenceau" className="absolute w-[70vw] h-auto"/>
      {/*<img ref={defaultRef} src={defaultFolder} alt="Default Folders" className="absolute w-[70vw] h-auto" />*/}
    </div>
  );
}

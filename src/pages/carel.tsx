import { useEffect } from "react";
import Colors from "../entities/Background.ts";
import accessoires_folder from "../features/Carel/static/images/storage/accessoires_folder.png";
import accessoires from "../features/Carel/static/images/storage/accessoires.png";
import Storage from "../features/Carel/static/images/storage/storage.png";
import Alesia from "../features/Carel/static/images/storage/alesia.png";
import Bossa from "../features/Carel/static/images/storage/bossa.png";
import Concorde from "../features/Carel/static/images/storage/concorde.png";
import useFolders from "../features/Carel/hooks/useFolders.tsx";
import maroquinerie from "../features/Carel/static/images/storage/maroquinerie.png";
import chaussures from "../features/Carel/static/images/storage/chaussures.png";
import close_folders from "../features/Carel/static/images/storage/close_folders.png";
import clemenceau from "../features/Carel/static/images/storage/clemenceau.png";

// New Image 
import elysee from "../features/Carel/static/images/storage/elysee.png";
import mabillon from "../features/Carel/static/images/storage/mabillon.png";
import maddie from "../features/Carel/static/images/storage/maddie.png";
import madeleine_brodee from "../features/Carel/static/images/storage/madeleine_brodee.png";
import madeleine from "../features/Carel/static/images/storage/madeleine.png";
import mini_clemenceau from "../features/Carel/static/images/storage/mini_clemenceau.png";



type BackgroundColor = typeof Colors[keyof typeof Colors];

interface carelProps {
  setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>;
  setTextColor: React.Dispatch<React.SetStateAction<BackgroundColor>>;
  setDefaultStyle: (isActive: boolean) => void;
}

export default function Carel({ setAcceuil, setLogoFanch, setTextColor, setDefaultStyle }: carelProps) {
  const { windowRef, concordeRef, bossaRef, alesiaRef, StorageRef, maroquinerieRef, chaussuresRef, closeFoldersRef, clemenceauRef, accessoiresLabelRef, accessoiresRef, miniClemenceauRef, madeleineRef, madeleineBrodeeRef, maddieRef, mabillonRef, elyseeRef } = useFolders();

  useEffect(() => {
    setAcceuil(Colors.Black);
    setTextColor(Colors.White);
    setLogoFanch(false);
    setDefaultStyle(true);
  }, [setAcceuil, setLogoFanch, setTextColor, setDefaultStyle]);

  

  return (
    <div ref={windowRef} className="w-full h-screen relative overflow-hidden">
      <img ref={closeFoldersRef} src={close_folders} alt="Close Folders" className="absolute w-[70vw] h-auto"/>
      <img ref={StorageRef} src={Storage} alt="Storage" className="absolute w-[70vw] h-auto" />
      <img ref={accessoiresLabelRef} src={accessoires} data-folder="accessoires" alt="Accessoires" className="absolute w-[70vw] h-auto"/>
      <img ref={accessoiresRef} src={accessoires_folder} data-folder="accessoires_folder" alt="Accessoires Folder" className="absolute w-[70vw] h-auto"/>
      <img ref={chaussuresRef} src={chaussures} data-folder="chaussures" alt="Chaussures" className="absolute w-[70vw] h-auto"/>
      <img ref={bossaRef} src={Bossa} data-folder="bossa" alt="Bossa" className="absolute w-[70vw] h-auto"/>
      <img ref={maroquinerieRef} src={maroquinerie} data-folder="maroquinerie" alt="Maroquinerie" className="absolute w-[70vw] h-auto"/>
      <img ref={concordeRef} src={Concorde} data-folder="concorde" alt="Concorde" className="absolute w-[70vw] h-auto"/>
      <img ref={clemenceauRef} src={clemenceau} data-folder="clemenceau" alt="Clemenceau" className="absolute w-[70vw] h-auto"/>
      <img ref={miniClemenceauRef} src={mini_clemenceau} data-folder="mini_clemenceau" alt="Mini Clemenceau" className="absolute w-[70vw] h-auto"/>
      <img ref={alesiaRef} src={Alesia} data-folder="alesia" alt="Alesia" className="absolute w-[70vw] h-auto"/>
      <img ref={madeleineRef} src={madeleine} data-folder="madeleine" alt="Madeleine" className="absolute w-[70vw] h-auto"/>
      <img ref={maddieRef} src={maddie} data-folder="maddie" alt="Maddie" className="absolute w-[70vw] h-auto"/>
      <img ref={madeleineBrodeeRef} src={madeleine_brodee} data-folder="madeleine_brodee" alt="Madeleine Brodee" className="absolute w-[70vw] h-auto"/>
      <img ref={elyseeRef} src={elysee} data-folder="elysee" alt="Elysee" className="absolute w-[70vw] h-auto"/>
      <img ref={mabillonRef} src={mabillon} data-folder="mabillon" alt="Mabillon" className="absolute w-[70vw] h-auto"/>
      {/*<img ref={defaultRef} src={defaultFolder} alt="Default Folders" className="absolute w-[70vw] h-auto" />*/}
    </div>
  );
}

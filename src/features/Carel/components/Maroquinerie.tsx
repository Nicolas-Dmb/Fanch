import alesia from '../static/images/maroquinerie/alesia.png';
import clemenceau from '../static/images/maroquinerie/clemenceau.png';
import concorde from '../static/images/maroquinerie/concorde.png';
import maddie from '../static/images/maroquinerie/maddie.png';
import madeleine_brodee from '../static/images/maroquinerie/madeleine_brodee.png';
import madeleine from '../static/images/maroquinerie/madeleine.png';
import mini_clemenceau from '../static/images/maroquinerie/mini_clemenceau.png';
import { useNavigate } from 'react-router-dom';


interface BagProps{
    src: string;
    name: string;
    date: string;
    onClick: () => void;
    isVisible?: boolean;
}
function Bag({src, name, date, onClick, isVisible = true}: BagProps) {
    return (
        <div className="flex flex-col p-3 md:p-4" onClick={onClick}>
            <img src={src} alt={name} className={`h-auto ${isVisible ? "opacity-100" : "opacity-0"}`} />
            <div className="flex flex-row justify-between">
                <p className="text-black font-semibold tracking-tighter text-[8px]">{name}</p>
                <p className="text-black tracking-tighter text-[8px]">{date}</p>
            </div>
        </div>
    );
}

export default function Maroquinerie() {
    const navigate = useNavigate()
    return (
        <div className="w-full h-screen flex flex-col overflow-hidden">
            <div className="w-full flex-1 flex justify-between min-h-0">
                <Bag src={madeleine} name="madeleine" date="2024©" onClick={() => navigate("/carel/madeleine")} />
                <Bag src={maddie} name="maddie" date="2024©" onClick={() => navigate("/carel/maddie")} />
                <Bag src={madeleine_brodee} name="madeleine brodée" date="2025©" onClick={() => navigate("/carel/madeleine")} />
            </div>

            <div className="w-full flex-1 flex justify-between min-h-0">
                <Bag src={mini_clemenceau} name="mini clemenceau" date="2025©" onClick={() => navigate("/carel/mini_clemenceau")} />
                <Bag src={concorde} name="concorde" date="2025©" onClick={() => navigate("/carel/concorde")} />
                <Bag src={clemenceau} name="clemenceau" date="2025©" onClick={() => navigate("/carel/clemenceau")} />
            </div>

            <div className="w-full flex-1 flex justify-between min-h-0">
                <Bag src={alesia} name="alesia" date="2025©" onClick={() => navigate("/carel/alesia")} />
                <Bag src={alesia} name="" date="" onClick={() => {}} isVisible={false} />
                <Bag src={alesia} name="" date="" onClick={() => {}} isVisible={false} />
            </div>
        </div>
    );
}
import React, {useEffect, useRef, useState} from 'react';
import foto1 from '../static/image/foto1.png';
import foto2 from '../static/image/foto2.png';
import foto3 from '../static/image/foto3.png';
import foto4 from '../static/image/foto4.png';


const screen = window.innerHeight;
const screenWidth = window.innerWidth;
const headerFooterHeight = 151.13;
const screenHeight = screen - headerFooterHeight;

//footer 61


function Foto({ setAcceuil, setLogoFanch }) {
    const [localMousePos, setLocalMousePos] = useState({ x: 0, y: 0 });
    const [Fotochange, setFotoChange] = useState({ x: null, y: null});
    const [Foto, setFoto] = useState(1)

    useEffect(() => {
        setAcceuil(false);
        setLogoFanch(false);

        const handleMouseMove = (event) => {
            setLocalMousePos({
            x: event.clientX,
            y: event.clientY
            });
        };
        
        // Ajouter l'écouteur d'événements à la fenêtre
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        
    }, [setAcceuil, setLogoFanch, localMousePos, Fotochange, Foto]);

    useEffect(()=>{
            if (Fotochange.x===null && Fotochange.y===null){
                setFotoChange({
                    x: localMousePos.x,
                    y: localMousePos.y
                });
            }else if( localMousePos.x-Fotochange.x< -150 ||localMousePos.x-Fotochange.x >150 ||localMousePos.y-Fotochange.y< -150 ||localMousePos.y-Fotochange.y >150 ){
                setFotoChange({
                    x: localMousePos.x,
                    y: localMousePos.y
                });
                if(Foto===4){
                    setFoto(1)
                    document.getElementById('4').style.display='none'
                    document.getElementById('1').style.display='block'
                }else{
                    
                    document.getElementById(`${Foto}`).style.display='none'
                    document.getElementById(`${Foto+1}`).style.display='block'
                    setFoto(Foto+1)
                }
        }},[localMousePos])


  return (

        <div className='pagefoto' style={{width:'100%', height:screenHeight, overflow:'hidden'}}> 
            <img style={{width:'150px', height:'300px', position:'absolute', top: localMousePos.y+150 >= screenHeight +85 ? `${screen -85-300}px` : localMousePos.y-150 <= 91.13 ? `${91.13}px` : `${localMousePos.y - 150}px`, left: localMousePos.x - 75 <= 0 ? '0px' : localMousePos.x + 75 >= screenWidth ? `${screenWidth - 150}px` : `${localMousePos.x - 75}px`,overflow:'hidden', display:'block'}} src={foto1} id='1'/>
            <img style={{width:'300px', height:'300px', position:'absolute',top: localMousePos.y+150 >= screenHeight +85 ? `${screen -85-300}px` : localMousePos.y-150 <= 91.13 ? `${91.13}px` : `${localMousePos.y - 150}px`, left: localMousePos.x - 150 <= 0 ? '0px' : localMousePos.x + 150 >= screenWidth ? `${screenWidth - 300}px` : `${localMousePos.x - 150}px`, display:'none', overflow:'hidden'}} src={foto2} id='2'/>
            <img style={{width:'300px', height:'150px', position:'absolute',top: localMousePos.y+75 >= screenHeight +85 ? `${screen-85-150}px` : localMousePos.y-75 <= 91.13 ? `${91.13}px` : `${localMousePos.y - 75}px`, left: localMousePos.x - 150 <= 0 ? '0px' : localMousePos.x + 150 >= screenWidth ? `${screenWidth - 300}px` : `${localMousePos.x - 150}px`, display:'none', overflow:'hidden'}} src={foto3} id='3'/>
            <img style={{width:'300px', height:'150px', position:'absolute',top: localMousePos.y+75 >= screenHeight +85 ? `${screen -85-150}px` : localMousePos.y-75 <= 91.13 ? `${91.13}px` : `${localMousePos.y - 75}px`,left: localMousePos.x - 150 <= 0 ? '0px' : localMousePos.x + 150 >= screenWidth ? `${screenWidth - 300}px` : `${localMousePos.x - 150}px`, display:'none', overflow:'hidden'}} src={foto4} id='4'/>
        </div>
    
  );
}

export default Foto;
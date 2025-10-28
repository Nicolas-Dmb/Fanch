import React, { useState, useEffect } from 'react';
import'../App.css'
import {useNavigate} from "react-router-dom"
import maison1 from '../static/image/maison1.png'
import maison2 from '../static/image/maison2.png'
import maison3 from '../static/image/maison3.png'
import maison4 from '../static/image/maison4.png'
import maison5 from '../static/image/maison5.png'
import maison1_white from '../static/image/maison1_white.png'
import maison2_white from '../static/image/maison2_white.png'
import maison3_white from '../static/image/maison3_white.png'
import maison4_white from '../static/image/maison4_white.png'
import maison5_white from '../static/image/maison5_white.png'
import work from '../static/image/work.png'
import about from '../static/image/about.png'
import work_white from '../static/image/work_white.png'
import about_white from '../static/image/about_white.png'
import workphon_white from '../static/image/workphon_white.png'
import aboutphon_white from '../static/image/aboutphon_white.png'
import Worklettre from  '../static/image/Worklettre.png';
import Aboutlettre from  '../static/image/Aboutlettre.png'
import Background from '../entities/Background.ts';


function Header({acceuil}){
    const navigate = useNavigate()
    const images = [{maison:maison2, height:'1.0702cm', paddingTop:'0.2562cm'}, {maison:maison3, height:'1.1587cm', paddingTop:'0.1677cm'}, {maison:maison4, height:'1.2081cm', paddingTop:'0.1183cm'}, {maison:maison5, height:'1.3264cm', paddingTop:'0cm'}, {maison:maison1, height:'0.9679cm', paddingTop:'0.3585cm'}];
    const images_white = [{maison:maison2_white, height:'1.0702cm', paddingTop:'0.2562cm'}, {maison:maison3_white, height:'1.1587cm', paddingTop:'0.1677cm'}, {maison:maison4_white, height:'1.2081cm', paddingTop:'0.1183cm'}, {maison:maison5_white, height:'1.3264cm', paddingTop:'0cm'}, {maison:maison1_white, height:'0.9679cm', paddingTop:'0.3585cm'}];
    const [currentImage, setCurrentImage] = useState({maison:maison1, height:'0.9679cm', paddingTop:'0.3585cm'});
    const [currentImage_white, setCurrentImage_white] = useState({maison:maison1_white, height:'0.9679cm', paddingTop:'0.3585cm'});
    let intervalId;

    const[workPhone, setWorkPhone]=useState(true)
    const[aboutPhone, setAboutPhone]=useState(true)

    useEffect(() => {
        let index = 0;
        const id = setInterval(() => {
            if (acceuil === Background.Black) {
                setCurrentImage_white(images_white[index]);
                index = (index + 1) % images_white.length;
            } else {
                setCurrentImage(images[index]);
                index = (index + 1) % images.length;
            }
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, [acceuil]);
    /*let handleMouseOut=()=>{
        clearInterval(intervalId);
        setCurrentImage({maison:maison1, height:'0.9679cm', paddingTop:'0.3521cm'})
    };*/
    
    return(
        <div className='header' style={{ backgroundColor: acceuil }}>
            <div className='left'>
                {workPhone?
                <img src={acceuil === Background.Black ?work_white:Worklettre} style={{width:35.95, height:19}} alt='phonetique' onMouseOver={()=>setWorkPhone(false)} onClick={()=>navigate('/work')} />:<img src={acceuil === Background.Black ?workphon_white:work} style={{width:35.95, height:19}} alt='phonetique' onMouseOut={()=>setWorkPhone(true)} onClick={()=>navigate('/work')} />}
                {aboutPhone? 
                <img src={acceuil === Background.Black ?about_white:Aboutlettre} onMouseOver={()=>setAboutPhone(false)} style={{width:41.22, height:19}} className='lien' alt='phonetique' onClick={()=>navigate('/about')}/>:<img src={acceuil === Background.Black ?aboutphon_white:about} onMouseOut={()=>setAboutPhone(true)} style={{width:41.22, height:19}} className='lien' alt='phonetique'onClick={()=>navigate('/about')}/>}
            </div>
            <p className='FANCH' style={{ color: acceuil === Background.Black ? "#fff":"#000"}}>FANCH</p>
            <div className='house'>
                <img  src={acceuil === Background.Black ?currentImage_white.maison : currentImage.maison} alt='maison' id='image' className='maison_1' style={acceuil=== Background.Black ?{height: currentImage_white.height, marginTop:currentImage_white.paddingTop}: {height: currentImage.height, marginTop:currentImage.paddingTop}} onClick={()=>navigate('')}/>
            </div>
        </div>
    );
}

export default Header;


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


function Header({acceuil}){
    const navigate = useNavigate()
    const images = [{maison:maison2, height:'1.0702cm', paddingTop:'0.2562cm'}, {maison:maison3, height:'1.1587cm', paddingTop:'0.1677cm'}, {maison:maison4, height:'1.2081cm', paddingTop:'0.1183cm'}, {maison:maison5, height:'1.3264cm', paddingTop:'0cm'}, {maison:maison1, height:'0.9679cm', paddingTop:'0.3585cm'}];
    const images_white = [{maison:maison2_white, height:'1.0702cm', paddingTop:'0.2562cm'}, {maison:maison3_white, height:'1.1587cm', paddingTop:'0.1677cm'}, {maison:maison4_white, height:'1.2081cm', paddingTop:'0.1183cm'}, {maison:maison5_white, height:'1.3264cm', paddingTop:'0cm'}, {maison:maison1_white, height:'0.9679cm', paddingTop:'0.3585cm'}];
    const [currentImage, setCurrentImage] = useState({maison:maison1, height:'0.9679cm', paddingTop:'0.3585cm'});
    const [currentImage_white, setCurrentImage_white] = useState({maison:maison1_white, height:'0.9679cm', paddingTop:'0.3585cm'});
    let intervalId;

    const[workPhone, setWorkPhone]=useState(true)
    const[aboutPhone, setAboutPhone]=useState(true)

    let handleMouseOver=()=>{
        let index = 0;
        intervalId = setInterval(() => {
            acceuil ?
            setCurrentImage_white(images_white[index]):
            setCurrentImage(images[index]);
            acceuil ?
            index = (index + 1) % images_white.length:
            index = (index + 1) % images.length;
        }, 1000);
    };
    /*let handleMouseOut=()=>{
        clearInterval(intervalId);
        setCurrentImage({maison:maison1, height:'0.9679cm', paddingTop:'0.3521cm'})
    };*/
    useEffect(() => {
        handleMouseOver()
        /*const imgElement = document.getElementById('image');
        imgElement.addEventListener('mouseover', handleMouseOver);
        imgElement.addEventListener('mouseout', handleMouseOut);

        // Nettoyer les écouteurs d'événements lors du démontage
        return () => {
            imgElement.removeEventListener('mouseover', handleMouseOver);
            imgElement.removeEventListener('mouseout', handleMouseOut);
        };*/
    }, []);
    
    return(
        <div className='header' style={{ backgroundColor:acceuil ?'#000':'#fff'}}>
            <div className='left'>
                {workPhone?
                <img src={acceuil ?work_white:Worklettre} style={{width:35.95, height:19}} alt='phonetique' onMouseOver={()=>setWorkPhone(false)} onClick={()=>navigate('/work')} />:<img src={acceuil ?workphon_white:work} style={{width:35.95, height:19}} alt='phonetique' onMouseOut={()=>setWorkPhone(true)} onClick={()=>navigate('/work')} />}
                {aboutPhone? 
                <img src={acceuil ?about_white:Aboutlettre} onMouseOver={()=>setAboutPhone(false)} style={{width:41.22, height:19}} className='lien' alt='phonetique' onClick={()=>navigate('/about')}/>:<img src={acceuil ?aboutphon_white:about} onMouseOut={()=>setAboutPhone(true)} style={{width:41.22, height:19}} className='lien' alt='phonetique'onClick={()=>navigate('/about')}/>}
            </div>
            <p className='FANCH' style={{ color: acceuil&&'#fff'}}>FANCH</p>
            <img  src={acceuil ?currentImage_white.maison : currentImage.maison} alt='maison' id='image' className='maison_1' style={acceuil ?{height: currentImage_white.height, marginTop:currentImage_white.paddingTop}: {height: currentImage.height, marginTop:currentImage.paddingTop}} onClick={()=>navigate('')}/>
        </div>
    );
}

export default Header;


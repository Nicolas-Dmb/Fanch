import React, { useState, useEffect } from 'react';
import'../App.css'
import {useNavigate} from "react-router-dom"
import maison1 from '../static/image/maison1.png'
import maison2 from '../static/image/maison2.png'
import maison3 from '../static/image/maison3.png'
import maison4 from '../static/image/maison4.png'
import maison5 from '../static/image/maison5.png'
import work from '../static/image/work.png'
import about from '../static/image/about.png'
import Worklettre from  '../static/image/Worklettre.png';
import Aboutlettre from  '../static/image/Aboutlettre.png'


function Header({acceuil}){
    const navigate = useNavigate()
    const images = [{maison:maison2, height:'1.0702cm', paddingTop:'0.2562cm'}, {maison:maison3, height:'1.1587cm', paddingTop:'0.1677cm'}, {maison:maison4, height:'1.2081cm', paddingTop:'0.1183cm'}, {maison:maison5, height:'1.3264cm', paddingTop:'0cm'}, {maison:maison1, height:'0.9679cm', paddingTop:'0.3585cm'}];
    const [currentImage, setCurrentImage] = useState({maison:maison1, height:'0.9679cm', paddingTop:'0.3585cm'});
    let intervalId;

    const[workPhone, setWorkPhone]=useState(true)
    const[aboutPhone, setAboutPhone]=useState(true)

    let handleMouseOver=()=>{
        let index = 0;
        intervalId = setInterval(() => {
            setCurrentImage(images[index]);
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
        <div className='header' style={{ backgroundColor:acceuil &&'#000'}}>
            <div className='left'>
                {workPhone?
                <img src={Worklettre} style={{width:35.95, height:19}} alt='phonetique' onMouseOver={()=>setWorkPhone(false)} onClick={()=>navigate('/work')} />:<img src={work} style={{width:35.95, height:19}} alt='phonetique' onMouseOut={()=>setWorkPhone(true)} onClick={()=>navigate('/work')} />}
                {aboutPhone? 
                <img src={Aboutlettre} onMouseOver={()=>setAboutPhone(false)} style={{width:41.22, height:19}} className='lien' alt='phonetique' onClick={()=>navigate('/about')}/>:<img src={about} onMouseOut={()=>setAboutPhone(true)} style={{width:41.22, height:19}} className='lien' alt='phonetique'onClick={()=>navigate('/about')}/>}
            </div>
            <p className='FANCH' style={{ color: acceuil&&'#fff'}}>FANCH</p>
            <img src={currentImage.maison} alt='maison' id='image' className='maison_1' style={{height:currentImage.height, marginTop:currentImage.paddingTop}} onClick={()=>navigate('')}/>
        </div>
    );
}

export default Header;


import React, { useState, useEffect } from 'react';
import'../App.css'
import {useNavigate} from "react-router-dom"
import fanch from '../static/image/fanch.png';
import insta from '../static/image/insta.png';
import instaPhon from '../static/image/Instaphon.png';
import linkedin from '../static/image/linkedin.png';
import linkedinPhon from '../static/image/linkedinphon.png';
import copyright from '../static/image/copyright.png';
import insta_white from '../static/image/Insta_white.png';
import instaPhon_white from '../static/image/Instapho_white.png';
import linkedin_white from '../static/image/Linkedin_white.png';
import linkedinPhon_white from '../static/image/Linkedinpho_white.png';
import copyright_white from '../static/image/copyright_white.png';

function Footer({acceuil, logoFanch}){
    const navigate = useNavigate()
    const [instagram, setInsta] = useState(true)
    const [linke, setLinke] = useState(true)
    const [dateTime, setDateTime] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setDateTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    const formatDateTime = (date) => {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Europe/Paris',
      };
      const dateString = date.toLocaleDateString('en-US', options);
      const timeString = date.toLocaleTimeString('en-US', { timeZone: 'Europe/Paris', hour12: true });
      return { dateString, timeString };
    };

    const handleImageClick = () => {
        window.open("https://www.instagram.com/fanch.cos?igsh=MXVkdmkxc2N6NTQzOA%3D%3D&utm_source=qr", "_blank");
    };
    const handleLinkedinImageClick = () => {
        window.open("https://www.linkedin.com/in/fran%C3%A7ois-cosquer-881066256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", "_blank");
    };


   
    const { dateString, timeString } = formatDateTime(dateTime);
    return(
        <div className='footer' style={{ backgroundColor:acceuil ?'#000':'#fff'}}>
            {logoFanch &&
            <div className='top'>
                <img src={fanch} style={{width:'2.3612cm', height:'2.5722cm', margin:'auto'}} alt='fanch' className='fanch'/>
            </div>}
            <div style={{ width: '100%', height: 1, backgroundColor: acceuil? 'white':'black' }} />
            <div className='bottom'>
                <div className='left'>
                    <div className='column'>
                        <p style={{ color:acceuil &&'#fff'}}>fanch.cos@gmail.com</p>
                        <p style={{ color:acceuil &&'#fff'}}>+33 6 64 63 23 15</p>
                    </div>
                    <div className='columnlink' style={instagram ? {gap:'5px'} : {gap: '3.5px' }}>
                        {instagram?
                        <img src={acceuil ?insta_white:insta} style={{width:'1.41448cm', height:'0.3064cm'}} alt='instagrame' onMouseOver={()=>setInsta(false)} onClick={handleImageClick} />:
                        <img src={acceuil ?instaPhon_white:instaPhon} style={{width:'1.49592cm', height:'0.34312cm'}} alt='instagrame phonetique' onMouseOut={()=>setInsta(true)} onClick={handleImageClick} />}
                        {linke? 
                        <img src={acceuil ?linkedin_white:linkedin} style={{width:'1.21744cm', height:'0.3064cm', ...instagram ? {} : {margin:'2px'}}} onMouseOver={()=>setLinke(false)} alt='linkedin' onClick={handleLinkedinImageClick}/>:
                        <img src={acceuil ?linkedinPhon_white:linkedinPhon} style={{width:'0.97896cm', height:'0.31776cm'}} onMouseOut={()=>setLinke(true)} alt='Linkedine phonetique' onClick={handleLinkedinImageClick}/>}
                    </div>
                    <div className='column'>
                        <p style={{ color:acceuil &&'#fff'}}>Paris {timeString}</p>
                        <p style={{ color:acceuil &&'#fff'}}>{dateString} (GMT+02:00)</p>
                    </div>
                </div>
                <div className='right'>
                    <img src={acceuil ?copyright_white:copyright} style={{width:'3.2766cm', height:'0.2746cm'}} alt='copyright' className='copyright'/>
                </div>
            </div>
        </div>
    );
}

export default Footer;
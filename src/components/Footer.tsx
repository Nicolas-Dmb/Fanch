import { useState, useEffect } from 'react';
import'../App.css'
import {ColorType} from '../entities/Background.ts'
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
import Colors from '../entities/Background.ts';

interface FooterProps {
    bgColor: ColorType;
    logoFanch: boolean;
    textColor: ColorType;
}

export default  function Footer({bgColor, logoFanch, textColor}:FooterProps){
    const [instagram, setInsta] = useState(true)
    const [linke, setLinke] = useState(true)
    const [dateTime, setDateTime] = useState<Date>(new Date());

    useEffect(() => {
      const interval = setInterval(() => {
        setDateTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  
    const formatDateTime = (date: Date) => {
      const options: Intl.DateTimeFormatOptions = {
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
        <div className="footer h-18 border-t border-solid" style={{ backgroundColor:bgColor, borderColor:textColor, borderTopWidth: 1  }}>
            {logoFanch &&
            <div className='top'>
                <img src={fanch} style={{width:'2.3612cm', height:'2.5722cm', margin:'auto'}} alt='fanch' className='fanch'/>
            </div>}
            <div style={{ width: '100%', height: 1, backgroundColor: bgColor, color:textColor }} />
            <div className='bottom'>
                <div className='left'>
                    <div className='column'>
                        <p style={{color:textColor}}>fanch.cos@gmail.com</p>
                        <p style={{color:textColor}}>+33 6 64 63 23 15</p>
                    </div>
                    <div className='columnlink' style={instagram ? {gap:'5px'} : {gap: '3.5px' }}>
                        {instagram?
                        <img src={textColor === Colors.White ?insta_white:insta} style={{width:'1.41448cm', height:'0.3064cm'}} alt='instagrame' onMouseOver={()=>setInsta(false)} onClick={handleImageClick} />:
                        <img src={textColor === Colors.White?instaPhon_white:instaPhon} style={{width:'1.49592cm', height:'0.34312cm'}} alt='instagrame phonetique' onMouseOut={()=>setInsta(true)} onClick={handleImageClick} />}
                        {linke? 
                        <img src={textColor === Colors.White?linkedin_white:linkedin} style={{width:'1.21744cm', height:'0.3064cm', ...instagram ? {} : {margin:'2px'}}} onMouseOver={()=>setLinke(false)} alt='linkedin' onClick={handleLinkedinImageClick}/>:
                        <img src={textColor === Colors.White?linkedinPhon_white:linkedinPhon} style={{width:'0.97896cm', height:'0.31776cm'}} onMouseOut={()=>setLinke(true)} alt='Linkedine phonetique' onClick={handleLinkedinImageClick}/>}
                    </div>
                    <div className='column'>
                        <p style={{color:textColor}}>Paris {timeString}</p>
                        <p style={{color:textColor}}>{dateString} (GMT+02:00)</p>
                    </div>
                </div>
                <div className='right'>
                    <img src={textColor=== Colors.White ?copyright_white:copyright} style={{width:'3.2766cm', height:'0.2746cm'}} alt='copyright' className='copyright'/>
                </div>
            </div>
        </div>
    );
}


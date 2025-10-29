import React, { useEffect} from 'react';
import Colors from '../entities/Background.ts';


function Work({setAcceuil, setLogoFanch, setTextColor}){
    useEffect(()=>{
        setAcceuil(Colors.White)
        setTextColor(Colors.Black)
        setLogoFanch(true)
    },[setAcceuil, setLogoFanch, setTextColor])
    return(
        <div>
            work
        </div>
    );
}

export default Work;


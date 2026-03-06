import React, { useEffect} from 'react';
import Colors from '../entities/Background.ts';


function Work({setAcceuil, setLogoFanch, setTextColor, setDefaultStyle}) {
    useEffect(()=>{
        setAcceuil(Colors.White)
        setTextColor(Colors.Black)
        setLogoFanch(true)
        setDefaultStyle(false)
    },[setAcceuil, setLogoFanch, setTextColor, setDefaultStyle])
    return(
        <div>
            work
        </div>
    );
}

export default Work;


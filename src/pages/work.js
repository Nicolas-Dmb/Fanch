import React, { useEffect} from 'react';
import Colors from '../entities/Background.ts';


function Work({setAcceuil, setLogoFanch, setTextColor, LockLayout}) {
    useEffect(()=>{
        setAcceuil(Colors.White)
        setTextColor(Colors.Black)
        setLogoFanch(true)
        LockLayout(false)
    },[setAcceuil, setLogoFanch, setTextColor, LockLayout])
    return(
        <div>
            work
        </div>
    );
}

export default Work;


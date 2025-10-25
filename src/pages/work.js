import React, { useEffect} from 'react';
import Background from '../entities/Background.ts';


function Work({setAcceuil, setLogoFanch}){
    useEffect(()=>{
        setAcceuil(Background.White)
        setLogoFanch(true)
    },[setAcceuil, setLogoFanch])
    return(
        <div>
            work
        </div>
    );
}

export default Work;


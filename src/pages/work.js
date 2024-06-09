import React, { useEffect} from 'react';

function Work({setAcceuil, setLogoFanch}){
    useEffect(()=>{
        setAcceuil(false)
        setLogoFanch(true)
    },[setAcceuil, setLogoFanch])
    return(
        <div>
            work
        </div>
    );
}

export default Work;


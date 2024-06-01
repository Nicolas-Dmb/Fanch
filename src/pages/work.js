import React, { useEffect} from 'react';

function Work({setAcceuil}){
    useEffect(()=>{
        setAcceuil(false)
    },[])
    return(
        <div>
            work
        </div>
    );
}

export default Work;


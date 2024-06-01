import React, {useEffect, useRef, useState} from 'react';
import Typewriter from 'typewriter-effect';
import Tetris from '../components/Tetris.js'

function Acceuil({setAcceuil}){
    const [nameCircle, setNameCircle] = useState('circle')
    const [render, setRender] = useState(1)
    const [background, setBackground] = useState(false)

    useEffect(()=>{
        setAcceuil(background)

    },[background])

    const handleCircle = () =>{
        setNameCircle('circleClick')
        const time = 3000 
        let interval = setInterval(()=>{
            setRender(2)
            setBackground(true)
        }, time)
        return()=>clearInterval(interval)
    }
    return(<div style={{backgroundColor:background&&'black'}}>
        {render ===1 ?
        <div className='point'>
            <div></div>
                <div className={nameCircle} onClick={handleCircle}></div>
            <div className='partie2'>
            <Typewriter 
                className='NoGame'
                    options={{
                        strings: ["NO GAME"],
                        pause:1000,
                        autoStart: true,
                        loop: true,
                    }}
            />
            </div>
        </div>: <Tetris/>}
        </div>);
}

export default Acceuil;


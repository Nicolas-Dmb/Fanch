import React, {useEffect, useRef, useState} from 'react';
import carel1 from '../static/image/carel1.png';
import carel2 from '../static/image/carel2.png';
import ligne from '../static/image/Ligne.png';

const screen = window.innerHeight;
const screenWidth = window.innerWidth;
const BottomWidth= (screenWidth/100)*90

function Carel({ setAcceuil, setLogoFanch }) {
    const [picture, setPicture]=useState(carel1)
    const [concorde, setConcorde] = useState('none')


    useEffect(() => {
        setAcceuil(false);
        setLogoFanch(true);
    }, [setAcceuil, setLogoFanch]);

    return (
        <div className='Carel'>
            <div className='Top'>
                    <p>B</p>
                    <div className='Picture'>
                        <p>A</p>
                        <img src={picture} onMouseOver={()=>setPicture(carel2)} onMouseOut={()=>setPicture(carel1)} alt='BAG'/>
                    </div>
                    <p>G</p>
            </div>
            <div className='Bottom' style={{ width: BottomWidth, height: BottomWidth * 0.63, margin: 'auto', marginTop: '100px' }}>
                <div className='Concorde' onMouseOver={()=>setConcorde('block')}>
                    <div className='Carre'><p style={{ fontSize: '0.2em', position: 'relative', top: -30, left: -10 }}>4</p>C</div>
                    <div className='Carre'>O</div>
                    <div className='Carre'>N</div>
                    <div className='Carre'>C</div>
                    <div className='Carre'>O</div>
                    <div className='Carre'>R</div>
                    <div className='Carre'>D</div>
                    <div className='Carre'>E</div>
                </div>
                
                <div className='Clemenceau'>
                    <div className='Carre'><p style={{ fontSize: '0.2em', position: 'relative', top: -30, left: -10 }}>10</p>C</div>
                    <div className='Carre'>L</div>
                    <div className='Carre'>E</div>
                    <div className='Carre'>M</div>
                    <div className='Carre'>E</div>
                    <div className='Carre'>C</div>
                    <div className='Carre'>E</div>
                    <div className='Carre'>A</div>
                    <div className='Carre'>U</div>
                </div>
                <div className='Lorette'>
                    <div className='Carre'><p style={{ fontSize: '0.2em', position: 'relative', top: -30, left: -10 }}>8</p>L</div>
                    <div className='Carre'>O</div>
                    <div className='Carre'>R</div>
                    <div className='Carre'>E</div>
                    <div className='Carre'>T</div>
                    <div className='Carre'>T</div>
                    <div className='Carre'>E</div>
                </div>
                <div className='Nikita'>
                    <div className='Carre'><p style={{ fontSize: '0.2em', position: 'relative', top: -30, left: -10 }}>12</p>N</div>
                    <div className='Carre'>I</div>
                    <div className='Carre'>K</div>
                    <div className='Carre'>I</div>
                    <div className='Carre'>T</div>
                    <div className='Carre'>A</div>
                </div>
                <div className='Clochette'>
                    <div className='Carre'><p style={{ fontSize: '0.2em', position: 'relative', top: -30, left: -10 }}>7</p>C</div>
                    <div className='Carre'></div>
                    <div className='Carre'>O</div>
                    <div className='Carre'>C</div>
                    <div className='Carre'>H</div>
                    <div className='Carre'>E</div>
                    <div className='Carre'>T</div>
                    <div className='Carre'>T</div>
                    <div className='Carre'>E</div>
                </div>
                <div className='Elysee'>
                    <div className='Carre'><p style={{ fontSize: '0.2em', position: 'relative', top: -30, left: -10 }}>2</p>É</div>
                    <div className='Carre'>L</div>
                    <div className='Carre'>Y</div>
                    <div className='Carre'>S</div>
                    <div className='Carre'>É</div>
                    <div className='Carre'>E</div>
                </div>
                <div className='Vintage'>
                    <div className='Carre'><p style={{ fontSize: '0.2em', position: 'relative', top: -30, left: -10 }}>1</p>V</div>
                    <div className='Carre'>I</div>
                    <div className='Carre'>N</div>
                    <div className='Carre'>T</div>
                    <div className='Carre'>A</div>
                    <div className='Carre'>G</div>
                    <div className='Carre'>E</div>
                </div>
                <div className='Raya'>
                    <div className='Carre'><p style={{ fontSize: '0.2em', position: 'relative', top: -30, left: -10 }}>6</p>R</div>
                    <div className='Carre'>A</div>
                    <div className='Carre'>Y</div>
                    <div className='Carre'>A</div>
                </div>
                <div className='Mimi'>
                    <div className='Carre'><p style={{ fontSize: '0.2em', position: 'relative', top: -30, left: -10 }}>3</p>M</div>
                    <div className='Carre'>I</div>
                    <div className='Carre'>M</div>
                    <div className='Carre'>I</div>
                </div>
                <div className='Dauphine'>
                    <div className='Carre'><p style={{ fontSize: '0.2em', position: 'relative', top: -30, left: -10 }}>5</p>D</div>
                    <div className='Carre'>A</div>
                    <div className='Carre'>U</div>
                    <div className='Carre'>P</div>
                    <div className='Carre'>H</div>
                    <div className='Carre'>I</div>
                    <div className='Carre'>N</div>
                    <div className='Carre'>E</div>
                </div>
                <div className='Rivoli'>
                    <div className='Carre'><p style={{ fontSize: '0.2em', position: 'relative', top: -30, left: -10 }}>9</p>R</div>
                    <div className='Carre'>I</div>
                    <div className='Carre'>V</div>
                    <div className='Carre'>O</div>
                    <div className='Carre'>L</div>
                    <div className='Carre'>I</div>
                </div>
                <div className='Madeleine'>
                    <div className='Carre'><p style={{ fontSize: '0.2em', position: 'relative', top: -30, left: -10 }}>11</p>M</div>
                    <div className='Carre'>A</div>
                    <div className='Carre'>D</div>
                    <div className='Carre'>E</div>
                    <div className='Carre'>L</div>
                    <div className='Carre'>E</div>
                    <div className='Carre'>I</div>
                    <div className='Carre'>N</div>
                    <div className='Carre'>E</div>
                </div>
            </div>
        </div>
    );
}

export default Carel;

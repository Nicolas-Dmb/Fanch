import React, { useEffect, useState } from 'react';
import '../static/css/Tetris.css';
import Header from '../components/Header.js';

const screen = window.innerHeight;
const screenWidth = window.innerWidth;
const headerFooterHeight = 151.13; // Hauteur cumulée du header et du footer
const screenHeight = screen - headerFooterHeight;
const cellSize = screenHeight / 9;

function Tetris() {
    const tetrisStyle = {
        position: 'relative',
        marginTop:68,
        marginLeft:`${(screenWidth-(screenHeight * 2))/2}px`,
        top: `-${cellSize * 4}px`,
        gridTemplateColumns: `repeat(18, ${cellSize}px)`,
        gridTemplateRows: `repeat(13, ${cellSize}px)`, // Inclure les 4 nouvelles lignes
        width: `${screenHeight * 2}px`, // Double de la hauteur de la grille pour optimiser l'espace en largeur
        height: `${screenHeight + cellSize * 4}px`, // Ajuster la hauteur pour inclure les 4 lignes cachées
        backgroundColor: 'black',

    };
    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: `${cellSize * 3.2}px`, // Couvrir les 4 premières lignes
        backgroundColor: 'black',
    };
    const overlay = {
        position: 'absolute',
        top: `${cellSize * 3.2}px`,
        left: `-${(screenWidth-(screenHeight * 2))/2}px`,
        right: 0,
        height: `${cellSize * 1.2}px`, // Couvrir les 4 premières lignes
        backgroundColor: 'black',
        width:screenWidth,
    };

    // Gestion de la descente
    const [descente, setDescente] = useState(0); // Décompte
    const [cube, setCube] = useState(0);
    const [barre, setBarre] = useState(0);
    const [barre1, setBarre1] = useState(0);
    const [triangle, setTriangle] = useState(0)
    const [pont, setPont] = useState(0)
    const [pyramide, setPyramide] = useState(0)
    const [S, setS] = useState(0)
    const [L, setL] = useState(0)

    useEffect(() => {
        let temps = 250;
        let interval = setInterval(() => {
            setDescente(prevDescente => prevDescente + 1);
            setCube(descente+2);
            setBarre(descente - 6);
            setTriangle(descente);
            setPont(descente-10);
            setPyramide(descente-8);
            setBarre1(descente-1);
            setS(descente-13);
            setL(descente-18);

        }, temps);
        return () => clearInterval(interval);
    }, [descente]);

    return (
        
        <div className='TetrisContainer'>
            <div className='Tetris' style={tetrisStyle}>
                <div style={overlayStyle}>
                </div>
                <div style={overlay}>
                    <Header acceuil={true} style={{marginLeft:0}}/>
                </div>
                <div className='Cube' style={{gridRow: `${cube >= 12 ? 12 : cube} / span 2`, gridColumn: '1 / span 2 '}}>
                    <div className='Carre'>{L >= 11&&'I'}</div>
                    <div className='Carre'>{L >= 11.5&&'L'}</div>
                    <div className='Carre'>{S >= 11&&'P'}</div>
                    <div className='Carre'>{S >= 11.5&&'H'}</div>
                </div>
                <div className='Barre' style={{gridRow: `${barre<0?0:barre >= 10 ? 10 : barre} / span 4` }}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div>
                <div className='Triangle' style={{gridRow:`${triangle >= 12 ? 12 : triangle} / span 2`,  gridColumn:` ${triangle<=7?3:4} / span 2`}}>
                    <div className='Carre'>{L >= 12.5&&'U'}</div>
                    <div className={triangle<=6&&'Carre'}></div>
                    <div className='Carre'>{S >= 12.5&&'T'}</div>
                    <div className={triangle>6&&'Carre'}>{S >= 13&&'O'}</div>
                </div>
                <div className='Carre' style={{gridRow: `${barre<0?0:barre >= 13 ? 13 : barre} / span 1` ,  gridColumn:` 3/ span 1`}}>{S >= 12&&'O'}</div>
                <div className='Pont' style={{gridRow:`${pont<0?0:pont >= 11 ? 11 : pont} / span 2`,  gridColumn:` ${pont<=5?5:pont===6?4:3} / span 3`}}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'>{L >= 12&&'L'}</div>
                    <div></div>
                    <div className='Carre'>{L >= 13&&'S'}</div>
                </div>
                <div className={pyramide<9?'Pyramide':'PyramideTurn'} style={{gridRow:`${pyramide < 1 ? 1 : pyramide >= 11 ? 11 : pyramide} / span ${pyramide<9?2:3}`,  gridColumn:`${pyramide<9?15:16}/ span ${pyramide<9?3:2}`}}>
                    <div ></div>
                    <div className='Carre'></div>
                    <div className={pyramide>9&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className={pyramide<9&&'Carre'}></div>
                    <div className='Carre'></div>
                </div>
                <div className='Barre1' style={{gridRow: `${barre1<0?0:barre1 >= 13 ? 13 : barre1} / span 1`, gridColumn: ` ${barre1<7? 11 :barre1<8?12:13} / span 4` }}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div>
                <div className='S' style={{gridRow:`${S<=0? 0 : S >= 11 ? 11 : S} / span 3`,  gridColumn:` ${S<9?13:12} / span 2`}}>
                    <div></div>
                    <div className='Carre'></div>
                    <div className='Carre'>{L >= 17&&'N'}</div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div></div>
                </div>
                <div className='Cube' style={{gridRow: `${ barre1 <= 2? 1: barre1 >= 12 ? 12 : barre1} / span 2`, gridColumn: '6 / span 2' }}>
                    <div className='Carre'>{L >= 13.5&&'T'}</div>
                    <div className='Carre'>{L >= 14&&'R'}</div>
                    <div className='Carre'>{S >= 13.5&&'G'}</div>
                    <div className='Carre'>{S >= 14&&'R'}</div>
                </div>
                <div className='Triangle' style={{gridRow:`${cube<=4 ? 1: cube >= 12 ? 12 : cube} / span 2`,  gridColumn:` ${cube<=7?9:8} / span 2`}}>
                    <div className='Carre'>{L >= 14.5&&'A'}</div>
                    <div className={cube<7&&'Carre'}></div>
                    <div className={cube>6&&'Carre'}>{S >= 14.5&&'A'}</div>
                    <div className={cube!==6&&'Carre'}>{S >= 15&&'P'}</div>
                </div>
                <div className='Triangle' style={{gridRow:`${S<=4 ? 1: S >= 11? 11 : S} / span 2`,  gridColumn:` ${S<10?16:15} / span 2`}}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div></div>
                </div>
                <div className={L===6?'LTurn':'L'} style={{display:`${L <= 4?'none':'grid'}`,gridRow:`${L <= 4? 0 : L >= 10 ? 10 : L} / span ${L===6?2:3}`,  gridColumn:` ${L===6?13:14} / span ${L===6?3:2}`}}>
                    <div className={L>=6&&'Carre'}></div>
                    <div className={L!==6&&'Carre'}></div>
                    <div className={L>6&&'Carre'}></div>
                    <div className={L<=6&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className={L<=6&&'Carre'}></div>
                </div>
                <div className='Cube' style={{gridRow: `${ pont <= 2? 1: pont >= 12 ? 12 : pont} / span 2`, gridColumn: '10 / span 2' }}>
                    <div className='Carre'>{L >= 16&&'I'}</div>
                    <div className='Carre'>{L >= 16.5&&'O'}</div>
                    <div className='Carre'>{S >= 16&&'H'}</div>
                    <div className='Carre'>{S >= 16.5&&'Y'}</div>
                </div>
                <div className='L' style={{display:`${barre <= 4?'none':'grid'}`,gridRow:`${barre <= 4? 0 : barre >= 9 ? 9 : barre} / span 3`,  gridColumn:`1 / span 2`}}>
                    <div className='Carre'></div>
                    <div></div>
                    <div className='Carre'></div>
                    <div></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div>
                <div className='Triangle' style={{gridRow:`${L<=4 ? 1: L >= 11 ? 11 : L} / span 2`,  gridColumn:` ${L<=7?10:9} / span 2`}}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'>{L >= 15&&'T'}</div>
                    <div ></div>
                </div>
            </div>
            <footer>Footer Content</footer>
        </div>
    );
}

export default Tetris;

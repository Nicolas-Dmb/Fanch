import React, { useEffect, useState } from 'react';
import '../static/css/Tetris.css';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';

const screen = window.innerHeight;
const screenWidth = window.innerWidth;
const headerFooterHeight = 151.13; // Hauteur cumulée du header et du footer
const screenHeight = screen - headerFooterHeight;
const cellSize = screenHeight / 9;

function Tetris({descente}) {
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
        height: `${cellSize * 6}px`, // Couvrir les 4 premières lignes
        backgroundColor: 'black',
        width:screenWidth,
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
    /*
    const [cube, setCube] = useState(0);
    const [barre, setBarre] = useState(0);
    const [barre1, setBarre1] = useState(0);
    const [triangle, setTriangle] = useState(0)
    const [pont, setPont] = useState(0)
    const [pyramide, setPyramide] = useState(0)
    const [S, setS] = useState(0)
    const [L, setL] = useState(0)
    const [cube3, setCube3] = useState(0)
    const [pont1, setPont1] = useState(0)
    const [barre2, setBarre2] = useState(0)
    const [S1, setS1] = useState(0)
    const [pyramide1, setPyramide1] = useState(0)
    const [L1, setL1] = useState(0)
    const [L2, setL2] = useState(0)
    const [triangle1, setTriangle1]= useState(0)
    */
    const[un, setUn] = useState(0)
    const[deux, setDeux] = useState(0)
    const[trois, setTrois] = useState(0)
    const[quatre, setQuatre]= useState(0)
    const[cinq, setCinq] = useState(0)
    const[six, setSix] = useState(0)
    const[sept, setSept] = useState(0)
    const[huit, setHuit] = useState(0)
    const[neuf, setNeuf] = useState(0)
    const[dix, setDix] = useState(0)

    useEffect(() => {
        setUn(descente)
        setDeux(descente-4)
        setTrois(descente-8)
        setQuatre(descente-12)
        setCinq(descente-16)
        setSix(descente-20)
        setSept(descente-24)
        setHuit(descente-28)
        setNeuf(descente-32)
        setDix(descente-36)
        /*
            setCube(descente+2);
            setBarre(descente - 5);
            setTriangle(descente);
            setPont(descente-10);
            setPyramide(descente-9);
            setBarre1(descente-2);
            setS(descente-14);
            setL(descente-22);
            setCube3(descente-19);
            setPont1(descente-26);
            setL2(descente-32);
            setL1(descente-35);
            setBarre2(descente-37);
            setTriangle1(descente-40);
            setS1(descente-42);
            setPyramide1(descente-44);
        */
    }, [descente]);

    return (
        
        <div className='TetrisContainer'>
            <div className='Tetris' style={tetrisStyle}>
                <div style={overlayStyle}>
                </div>
                <div style={overlay}>
                    <Header acceuil={true} style={{marginLeft:0}}/>
                </div>
                <div className='Cube' style={{display:`${un <= 1?'none':'grid'}`,gridRow: `${un >= 12 ? 12 : un} / span 2`, gridColumn: '1 / span 2 '}}>
                    <div className='Carre'>{quatre-1 >= 11&&'I'}</div>
                    <div className='Carre'>{quatre-1 >= 11.5&&'L'}</div>
                    <div className='Carre'>{deux-3 >= 11&&'P'}</div>
                    <div className='Carre'>{deux-3 >= 11.5&&'H'}</div>
                </div>
                <div className={un-1>9?'LTurn':'L'} style={{display:`${un-1 <= 1?'none':'grid'}`,gridRow:`${un-1 <= 1? 1 : un-1 >= 12 ? 12 : un-1} / span ${un-1>9?2:3}`,  gridColumn:`${un-1<10?11:un-1>10?11:10}/ span ${un-1>9?3:2}`}}>
                    <div className='Carre'>{quatre-1 >= 16&&'0'}</div>
                    <div className={un-1<=9&&'Carre'}></div>
                    <div className={un-1<=9&&'Carre'}></div>
                    <div className={un-1>9&&'Carre'}>{deux-3 >= 16&&'Y'}</div> 
                    <div className='Carre'></div>
                    <div className={un-1>9&&'Carre'}></div>
                </div>
                <div className={un-2===6?'PyramideTurn':'Pyramide'} style={{display:`${un-2 <= 1?'none':'grid'}`,gridRow:`${un-2 < 1 ? 1 : un-2 >= 12 ? 12 : un-2} / span ${un-2===6?3:2}`,  gridColumn:`${un-2<10?5:6}/ span ${un-2===6?2:3}`}}>
                    <div className={un-2<6&&'Carre'}></div>
                    <div className='Carre'>{quatre-1 >= 14&&'R'}</div>
                    <div className={un-2<=6&&'Carre'}></div>
                    <div className={un-2>=6&&'Carre'}>{deux-3 >= 13.5&&'G'}</div>
                    <div className={un-2!==6&&'Carre'}>{deux-3 >= 14&&'R'}</div>
                    <div className={un-2>=6&&'Carre'}>{deux-3 >= 14.5&&'A'}</div>
                </div>
                <div className='Barre1' style={{display:`${un-2 <= 1?'none':'grid'}`,gridRow: `${un-2<1?1:un-3 >= 13 ? 13 : un-2} / span 1`, gridColumn: ` ${un-2<7? 15 :14} / span 4` }}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div>
                {//deux
                }
                <div className='Cube' style={{display:`${deux <= 1?'none':'grid'}`, gridRow:`${deux >= 11 ? 11 : deux} / span 2`, gridColumn: `${deux<10?11:12} / span 2 `}}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'>{quatre-1 >= 16.5&&'N'}</div>
                    <div className='Carre'></div>
                </div>
                <div className={deux-1>6?'LTurn':'L'} style={{display:`${deux-1 <= 1?'none':'grid'}`,gridRow:`${deux-1 <= 1? 1 : deux-1 >= 12 ? 12 : deux-1} / span ${deux-1>6?2:3}`,  gridColumn:`3/ span ${deux-1>6?3:2}`}}>
                    <div className={deux-1<=6&&'Carre'}></div>
                    <div className={deux-1<=6&&'Carre'}></div>
                    <div className={deux-1>6&&'Carre'}>{quatre-1>= 13&&'S'}</div>
                    <div className='Carre'>{deux-3 >= 12&&'0'}</div> 
                    <div className={deux-1>6&&'Carre'}>{deux-3 >= 12.5&&'T'}</div>
                    <div className='Carre'>{deux-3 >= 13&&'0'}</div>
                </div>
                <div className='STurn' style={{display:`${deux-2 <= 1?'none':'grid'}`,gridRow:`${deux-2<=1? 1 : deux-2 >= 12 ? 12 : deux-2} / span 2`,  gridColumn:` ${deux-2<=6?6:deux-2===7?7:8} / span 3`}}>
                    <div className='Carre'>{quatre-1 >= 14.5&&'A'}</div>
                    <div className='Carre'>{quatre-1 >= 15&&'T'}</div>
                    <div></div>
                    <div></div>
                    <div className='Carre'>{deux-3 >= 15&&'P'}</div>
                    <div className='Carre'>{deux-3 >= 15.5&&'H'}</div>
                </div>
                <div className={deux-3<9?'STurn':'S'} style={{display:`${deux-3 <= 1?'none':'grid'}`,gridRow:`${deux-3<=1? 1 : deux-3 >= 11 ? 11 : deux-3} / span ${deux-3<9?'2':'3'}`,  gridColumn:` ${deux-3<9?16:17} / span ${deux-3<9?'3':'2'}`}}>
                    <div className={deux-3>=9&&'Carre'}></div>
                    <div className={deux-3<9&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className={deux-3<9&&'Carre'}></div>
                    <div className={deux-3>=9&&'Carre'}></div>
                </div>
                {//Trois
                }
                <div className={trois-1<8?'S':'STurn'} style={{display:`${trois-1 <= 1?'none':'grid'}`,gridRow:`${trois-1<=1? 1 : trois-1 >= 11 ? 11 : trois-1} / span ${trois-1<8?3:2}`,  gridColumn:` ${trois-1<8?3:2} / span  ${trois-1<8?2:3}`}}>
                    <div className={trois-1>=8&&'Carre'}>{cinq-2>=10.5&&'C'}</div>
                    <div className='Carre'>{cinq-2>=11&&'U'}</div>
                    <div className={trois-1<8&&'Carre'}></div>
                    <div className={trois-1<8&&'Carre'}></div>
                    <div className='Carre'>{quatre-1 >= 12&&'L'}</div>
                    <div className={trois-1>=8&&'Carre'}>{quatre-1 >= 12.5&&'U'}</div>
                </div>
                <div className={trois-2>6?'LTurn':'L'} style={{display:`${trois-2 <= 1?'none':'grid'}`,gridRow:`${trois-2 <= 1? 1 : trois-2 >= 11 ? 11 : trois-2} / span ${trois-2>6?2:3}`,  gridColumn:`6/ span ${trois-2>6?3:2}`}}>
                    <div className='Carre'>{cinq-2>=12.5&&'T'}</div>
                    <div className={trois-2>6&&'Carre'}>{cinq-2>=13&&'U'}</div>
                    <div className='Carre'>{cinq-2>=13.5&&'R'}</div> 
                    <div className={trois-2>6&&'Carre'}>{quatre-1 >= 13.5&&'T'}</div>
                    <div className={trois-2<=6&&'Carre'}></div> 
                    <div className={trois-2<=6&&'Carre'}></div>
                    <div className={trois-2<=6&&'Carre'}></div>
                </div>
                <div className={trois-3>6?'LTurn':'L'} style={{display:`${trois-3 <= 1?'none':'grid'}`,gridRow:`${trois-3 <= 1? 1 : trois-3 >= 11 ? 11 : trois-3} / span ${trois-3>6?2:3}`,  gridColumn:`14/ span ${trois-3>6?3:2}`}}>
                    <div className={trois-3<=6&&'Carre'}></div>
                    <div className={trois-3<=6&&'Carre'}></div>
                    <div className={trois-3>6&&'Carre'}></div>
                    <div className='Carre'></div> 
                    <div className={trois-3>6&&'Carre'}></div>
                    <div className='Carre'></div>
                </div>
                {
                    //Quatre
                }
                <div className={quatre-3<6?'Pyramide':'PyramideTurn'} style={{display:`${quatre-3 <= 1?'none':'grid'}`,gridRow:`${quatre-3< 1 ? 1 : quatre-3 >= 9 ? 9 : quatre-3} / span ${quatre-3<6?2:3}`,  gridColumn:`${quatre-3<=6?15:quatre-3>7?17:16}/ span ${quatre-3<6?3:2}`}}>
                    <div className={quatre-3<6&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className={quatre-3>=6&&'Carre'}></div>
                    <div className={quatre-3<6&&'Carre'}></div>
                    <div className={quatre-3>=6&&'Carre'}></div>
                </div>
                <div className='Pyramide' style={{display:`${quatre <= 1?'none':'grid'}`,gridRow:`${quatre< 1 ? 1 : quatre >= 11 ? 11 : quatre} / span 2`,  gridColumn:`${quatre<=6?10:9}/ span 3`}}>
                    <div className='Carre'>{cinq-2>=14&&'E'}</div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div></div>
                    <div className='Carre'>{quatre-1 >= 15.5&&'I'}</div>
                    <div></div>
                </div>
                <div className='STurn' style={{display:`${quatre-1 <= 1?'none':'grid'}`,gridRow:`${quatre-1 <= 1? 1 : quatre-1 >= 10 ? 10 : quatre-1} / span 2`,  gridColumn:` ${quatre-1<8?4:3} / span  3`}}>
                    <div className='Carre'>{six-2>=10&&'R'}</div>
                    <div className='Carre'>{six-2>=10.5&&'D'}</div>
                    <div></div>
                    <div></div>
                    <div className='Carre'>{cinq-2>=11.5&&'L'}</div>
                    <div className='Carre'>{cinq-2>=12&&'P'}</div>
                </div>
                <div className='Barre1' style={{display:`${quatre-3 <= 1?'none':'grid'}`,gridRow: `${quatre-3<1?1:quatre-3>= 10 ? 10 :quatre-3} / span 1`, gridColumn: ` ${quatre-3<7? 9 :10} / span 4` }}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div>
                {
                    //Cinq
                }
                <div className='STurn' style={{display:`${cinq-2 <= 1?'none':'grid'}`,gridRow:`${cinq-2 <= 1? 1 : cinq-2 >= 10 ? 10 : cinq-2} / span 2`,  gridColumn:` ${cinq-2<8?13:14} / span  3`}}>
                    <div></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div></div>
                </div>
                <div className={cinq<6?'Pyramide':'PyramideTurn'} style={{display:`${cinq <= 1?'none':'grid'}`,gridRow:`${cinq< 1 ? 1 : cinq >= 9 ? 9 : cinq} / span ${cinq<6?2:3}`,  gridColumn:`${cinq<6?1:cinq===6?2:1}/ span ${cinq<6?3:2}`}}>
                    <div className='Carre'>{neuf>=7&&'C'}</div>
                    <div className={cinq<6&&'Carre'}></div>
                    <div className='Carre'>{six-2>=9&&'B'}</div>
                    <div className={cinq>=6&&'Carre'}>{six-2>=9.5&&'I'}</div>
                    <div className='Carre'>{cinq-2>=10&&'S'}</div>
                    <div></div>
                </div>
                <div className={cinq-1===6?'PyramideTurn':'Pyramide'} style={{display:`${cinq-1 <= 1?'none':'grid'}`,gridRow:`${cinq-1 < 1 ? 1 : cinq-1 >= 9 ? 9 : cinq-1} / span ${cinq-1===6?3:2}`,  gridColumn:`${cinq-1 <7?6:5}/ span ${cinq-1 ===6?2:3}`}}>
                    <div className={cinq-1<6&&'Carre'}></div>
                    <div className='Carre'>{neuf>=9.5&&'P'}</div>
                    <div className={cinq-1<=6&&'Carre'}></div>
                    <div className={cinq-1>=6&&'Carre'}>{six-2>=11&&'-'}</div>
                    <div className={cinq-1!==6&&'Carre'}>{six-2>=11.5&&'B'}</div>
                    <div className={cinq-1>=6&&'Carre'}>{six-2>=12&&'A'}</div>
                </div>
                {
                    //Six
                }
                <div className={six<7?'S':'STurn'} style={{display:`${six <= 1?'none':'grid'}`,gridRow:`${six<=1? 1 : six >= 9 ? 9 : six} / span ${six<7?3:2}`,  gridColumn:` ${six<7?8:7} / span  ${six<7?2:3}`}}>
                    <div className={six>=7&&'Carre'}>{neuf>=10&&'T'}</div>
                    <div className='Carre'></div>
                    <div className={six<7&&'Carre'}></div>
                    <div className={six<7&&'Carre'}></div>
                    <div className='Carre'>{six-2>=12.5&&'G'}</div>
                    <div className={six>=7&&'Carre'}></div>
                </div>
                <div className={six-1>6?'LTurn':'L'} style={{display:`${six-1 <= 1?'none':'grid'}`,gridRow:`${six-1 <= 1? 1 : six-1 >= 8 ? 8 : six-1} / span ${six-1>6?2:3}`,  gridColumn:`${six-1<7?2:six-1>7?2:3}/ span ${six-1>6?3:2}`}}>
                    <div className='Carre'>{dix>=6.5&&'A'}</div>
                    <div className={six-1<=6&&'Carre'}></div>
                    <div className={six-1<=6&&'Carre'}></div>
                    <div className={six-1>6&&'Carre'}>{neuf>=7.5&&'O'}</div> 
                    <div className='Carre'>{neuf>=8&&'N'}</div>
                    <div className={six-1>6&&'Carre'}>{neuf>=8.5&&'C'}</div>
                </div>
                <div className={six-2>6?'LTurn':'L'} style={{display:`${six-2 <= 1?'none':'grid'}`,gridRow:`${six-2 <= 1? 1 : six-2 >= 9 ? 9 : six-2} / span ${six-2>6?2:3}`,  gridColumn:`14/ span ${six-2>6?3:2}`}}>
                    <div className='Carre'></div>
                    <div className={six-2>6&&'Carre'}></div>
                    <div className='Carre'></div> 
                    <div className={six-2>6&&'Carre'}></div>
                    <div className={six-2<=6&&'Carre'}></div> 
                    <div className={six-2<=6&&'Carre'}></div>
                    <div className={six-2<=6&&'Carre'}></div>
                </div>
                {
                    //Sept
                }
                <div className='LTurn' style={{display:`${sept <= 1?'none':'grid'}`,gridRow:`${sept <= 1? 1 : sept >= 8 ? 8 : sept} / span 2`,  gridColumn:`3/ span 3`}}>
                    <div className='Carre'>{dix>=7&&'L'}</div>
                    <div className='Carre'>{dix>=7.5&&'E'}</div> 
                    <div className='Carre'>{dix>=8&&'T'}</div> 
                    <div></div>
                    <div></div> 
                    <div className='Carre'>{neuf>=9&&'E'}</div>
                </div>

                <div className={sept-2>4?'LTurn':'L'} style={{display:`${sept-2 <= 1?'none':'grid'}`,gridRow:`${sept-2 <= 1? 1 : sept-2 >= 8 ? 8 : sept-2} / span ${sept-2>4?2:3}`,  gridColumn:`15/ span ${sept-2>4?3:2}`}}>
                    <div className='Carre'></div>
                    <div className='Carre'></div> 
                    <div className='Carre'></div> 
                    <div></div>
                    <div className={sept-2<=4&&'Carre'}></div> 
                    <div className={sept-2>4&&'Carre'}></div>
                </div>
                <div className={sept<6?'S':'STurn'} style={{display:`${sept <= 1?'none':'grid'}`,gridRow:`${sept<=1? 1 : sept >= 8 ? 8 : sept} / span ${sept<6?3:2}`,  gridColumn:` ${sept<6?9:8} / span  ${sept<6?2:3}`}}>
                    <div className={sept>=6&&'Carre'}>{dix>=9.5&&'-'}</div>
                    <div className='Carre'>{dix>=10&&'S'}</div>
                    <div className={sept<6&&'Carre'}></div>
                    <div className={sept<6&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className={sept>=6&&'Carre'}></div>
                </div>
                {
                    //Huit
                }
                <div className='STurn' style={{display:`${huit <= 1?'none':'grid'}`,gridRow:`${huit <= 1? 1 : huit >= 8 ? 8 : huit} / span 2`,  gridColumn:` ${huit<6?11:12} / span  3`}}>
                    <div></div>
                    <div className='Carre'>{dix>=12&&'I'}</div>
                    <div className='Carre'>{dix>=12.5&&'0'}</div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div></div>
                </div>
                <div className='STurn' style={{display:`${huit <= 1?'none':'grid'}`,gridRow:`${huit <= 1? 1 : huit >= 7? 7 : huit} / span 2`,  gridColumn:` ${huit<5?5:6} / span  3`}}>
                    <div></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'>{dix>=8.5&&'T'}</div>
                    <div className='Carre'>{dix>=9&&'E'}</div>
                    <div></div>
                </div>
                <div className={huit-1<4?'Pyramide':'PyramideTurn'} style={{display:`${huit-1 <= 1?'none':'grid'}`,gridRow:`${huit-1< 1 ? 1 : huit-1 >= 6 ? 6 : huit-1} / span ${huit-1<4?2:3}`,  gridColumn:`${huit-1>4?17:16}/ span ${huit-1<4?3:2}`}}>
                    <div className={huit-1<4&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className={huit-1>=4&&'Carre'}></div>
                    <div className={huit-1<4&&'Carre'}></div>
                    <div className={huit-1>=4&&'Carre'}></div>
                </div>
                <div className='S' style={{display:`${huit-3 <= 1?'none':'grid'}`,gridRow:`${huit-3 <= 1? 1 : huit-3 >= 6 ? 6 : huit-3} / span 3`,  gridColumn:` ${huit-3<3?2:1} / span  2`}}>
                    <div></div>
                    <div className='Carre'></div>
                    <div className='Carre'>{dix-3>=5&&'C'}</div>
                    <div className='Carre'>{dix-3>=5.5&&'A'}</div>
                    <div className='Carre'>{dix>=6&&'V'}</div>
                    <div></div>
                </div>
                {
                    //Neuf
                }
                <div className={neuf<4?'STurn':'S'} style={{display:`${neuf <= 1?'none':'grid'}`,gridRow:`${neuf<=1? 1 : neuf >= 7 ? 7 : neuf} / span ${neuf<4?'2':'3'}`,  gridColumn:` ${neuf<4?9:10} / span ${neuf<4?'3':'2'}`}}>
                    <div className={neuf>=4&&'Carre'}></div>
                    <div className={neuf<4&&'Carre'}></div>
                    <div className='Carre'>{dix>=10.5&&'T'}</div>
                    <div className='Carre'>{dix>=11&&'U'}</div>
                    <div className={neuf<4&&'Carre'}></div>
                    <div className={neuf>=4&&'Carre'}></div>
                </div>
                <div className='Barre1' style={{display:`${neuf <= 1?'none':'grid'}`,gridRow: `${neuf<1?1:neuf>= 7 ? 7 :neuf} / span 1`, gridColumn: ` ${neuf<4? 4 :3} / span 4` }}>
                    <div className='Carre'>{dix-3>=6&&'R'}</div>
                    <div className='Carre'>{dix-3>=6.5&&'E'}</div>
                    <div className='Carre'>{dix-3>=7&&'L'}</div>
                    <div className='Carre'></div>
                </div>
                <div className={neuf-1===3?'PyramideTurn':'Pyramide'} style={{display:`${neuf-1 <= 1?'none':'grid'}`,gridRow:`${neuf-1 < 1 ? 1 : neuf-1 >= 6 ? 6 : neuf-1} / span ${neuf-1===3?3:2}`,  gridColumn:`${neuf-1 <3?14:13}/ span ${neuf-1 ===3?2:3}`}}>
                    <div className={neuf-1<3&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className={neuf-1<=3&&'Carre'}></div>
                    <div className={neuf-1>=3&&'Carre'}></div>
                    <div className={neuf-1!==3&&'Carre'}></div>
                    <div className={neuf-1>=3&&'Carre'}></div>
                </div>
                {
                    //Dix
                }
                <div className={dix<4?'STurn':'S'} style={{display:`${dix <= 1?'none':'grid'}`,gridRow:`${dix<=1? 1 : dix >= 6 ? 6 : dix} / span ${dix<4?'2':'3'}`,  gridColumn:` ${dix<4?10:11} / span ${dix<4?'3':'2'}`}}>
                    <div className={dix>=4&&'Carre'}></div>
                    <div className={dix<4&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className={dix<4&&'Carre'}></div>
                    <div className={dix>=4&&'Carre'}>{dix>=11.5&&'D'}</div>
                </div>
                <div className='LTurn' style={{display:`${dix-2 <= 1?'none':'grid'}`,gridRow:`${dix-2 <= 1? 1 : dix-2 >= 6 ? 6 : dix-2} / span 2`,  gridColumn:`7/ span 3`}}>
                    <div className='Carre'></div>
                    <div className='Carre'></div> 
                    <div className='Carre'></div> 
                    <div></div>
                    <div></div> 
                    <div className='Carre'></div>
                </div>
                <div className={dix-1<3?'STurn':'S'} style={{display:`${dix-1 <= 1?'none':'grid'}`,gridRow:`${dix-1<=1? 1 : dix-1 >= 5? 5 : dix-1} / span ${dix-1<3?'2':'3'}`,  gridColumn:` ${dix-1<3?14:15} / span ${dix-1<3?'3':'2'}`}}>
                    <div className={dix-1>=3&&'Carre'}></div>
                    <div className={dix-1<3&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className={dix-1<3&&'Carre'}></div>
                    <div className={dix-1>=3&&'Carre'}></div>
                </div>
            </div>
        </div>
    );
}

export default Tetris;


/*
                <div className='Cube' style={{display:`${cube <= 1?'none':'grid'}`,gridRow: `${cube >= 12 ? 12 : cube} / span 2`, gridColumn: '1 / span 2 '}}>
                    <div className='Carre'>{L >= 11&&'I'}</div>
                    <div className='Carre'>{L >= 11.5&&'L'}</div>
                    <div className='Carre'>{S >= 11&&'P'}</div>
                    <div className='Carre'>{S >= 11.5&&'H'}</div>
                </div>
                <div className='Barre' style={{display:`${barre-1 <= 1?'none':'grid'}`,gridRow: `${barre-1<0?0:barre-1 >= 10 ? 10 : barre-1} / span 4` }}>
                    <div className='Carre' ></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div>
                <div className={triangle<8?'PyramideTurn':'Pyramide'} style={{display:`${triangle <= 1?'none':'grid'}`,gridRow:`${triangle < 1 ? 1 : triangle >= 12 ? 12 : triangle} / span ${triangle<8?3:2}`,  gridColumn:`${triangle<8?4:3}/ span ${triangle<8?2:3}`}}>
                    <div className={triangle<8&&'Carre'}></div>
                    <div className={triangle>=8&&'Carre'}>{L >= 12.5&&'U'}</div>
                    <div className={triangle<8&&'Carre'}></div>
                    <div className='Carre'>{S >= 12&&'O'}</div>
                    <div className='Carre'>{S >= 12.5&&'T'}</div>
                    <div className={triangle>=8&&'Carre'}>{S >= 13&&'O'}</div>
                </div>


                <div className='Pont' style={{display:`${pont <= 1?'none':'grid'}`,gridRow:`${pont<0?0:pont >= 11 ? 11 : pont} / span 2`,  gridColumn:` ${pont<=5?5:pont===6?4:3} / span 3`}}>
                    <div className='Carre'>{L>=13&&'U'}</div>
                    <div className='Carre'>{L>=13.5&&'L'}</div>
                    <div className='Carre'>{L>=14&&'P'}</div>
                    <div className='Carre'>{L >= 12&&'L'}</div>
                    <div></div>
                    <div className='Carre'>{L >= 13&&'S'}</div>
                </div>


                <div className={pyramide<9?'Pyramide':'PyramideTurn'} style={{display:`${pyramide <= 1?'none':'grid'}`,gridRow:`${pyramide < 1 ? 1 : pyramide >= 11 ? 11 : pyramide} / span ${pyramide<9?2:3}`,  gridColumn:`${pyramide<9?15:16}/ span ${pyramide<9?3:2}`}}>
                    <div ></div>
                    <div className='Carre'></div>
                    <div className={pyramide>=9&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className={pyramide<9&&'Carre'}></div>
                    <div className='Carre'></div>
                </div>
                <div className='Barre1' style={{display:`${barre1 <= 1?'none':'grid'}`,gridRow: `${barre1<0?0:barre1 >= 13 ? 13 : barre1} / span 1`, gridColumn: ` ${barre1<7? 11 :barre1<8?12:13} / span 4` }}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div>
                <div className='S' style={{display:`${S <= 1?'none':'grid'}`,gridRow:`${S<=0? 0 : S >= 11 ? 11 : S} / span 3`,  gridColumn:` ${S<9?13:12} / span 2`}}>
                    <div></div>
                    <div className='Carre'></div>
                    <div className='Carre'>{L >= 17&&'N'}</div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div></div>
                </div>
                <div className='Cube' style={{display:`${barre1 <= 1?'none':'grid'}`,gridRow: `${ barre1 <= 2? 1: barre1 >= 12 ? 12 : barre1} / span 2`, gridColumn: '6 / span 2' }}>
                    <div className='Carre'>{L >= 13.5&&'T'}</div>
                    <div className='Carre'>{L >= 14&&'R'}</div>
                    <div className='Carre'>{S >= 13.5&&'G'}</div>
                    <div className='Carre'>{S >= 14&&'R'}</div>
                </div>
                <div className='Triangle' style={{display:`${cube <= 1?'none':'grid'}`,gridRow:`${cube<=4 ? 1: cube >= 12 ? 12 : cube} / span 2`,  gridColumn:` ${cube<=9?9:8} / span 2`}}>
                    <div className='Carre'>{L >= 14.5&&'A'}</div>
                    <div className={cube<=7&&'Carre'}></div>
                    <div className={cube>=7&&'Carre'}>{S >= 14.5&&'A'}</div>
                    <div className={cube!==7&&'Carre'}>{S >= 15&&'P'}</div>
                </div>
                <div className='Triangle' style={{display:`${S <= 1?'none':'grid'}`,gridRow:`${S<=4 ? 1: S >= 11? 11 : S} / span 2`,  gridColumn:` ${S<10?16:15} / span 2`}}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div></div>
                </div>
                <div className={L===6?'LTurn':'L'} style={{display:`${L <= 1?'none':'grid'}`,gridRow:`${L <= 4? 0 : L >= 10 ? 10 : L} / span ${L===6?2:3}`,  gridColumn:` ${L===6?13:14} / span ${L===6?3:2}`}}>
                    <div className={L>=6&&'Carre'}></div>
                    <div className={L!==6&&'Carre'}></div>
                    <div className={L>6&&'Carre'}></div>
                    <div className={L<=6&&'Carre'}></div> 
                    <div className='Carre'></div>
                    <div className={L<=6&&'Carre'}></div>
                </div>
                <div className='Cube' style={{display:`${pont <= 1?'none':'grid'}`,gridRow: `${ pont <= 2? 1: pont >= 12 ? 12 : pont} / span 2`, gridColumn: '10 / span 2' }}>
                    <div className='Carre'>{L >= 16&&'I'}</div>
                    <div className='Carre'>{L >= 16.5&&'O'}</div>
                    <div className='Carre'>{S >= 16&&'H'}</div>
                    <div className='Carre'>{S >= 16.5&&'Y'}</div>
                </div>
                <div className='L' style={{display:`${barre <= 1?'none':'grid'}`,gridRow:`${barre <= 4? 0 : barre >= 9 ? 9 : barre} / span 3`,  gridColumn:`1 / span 2`}}>
                    <div className='Carre' >{barre2>=8&&'C'}</div>
                    <div></div>
                    <div className='Carre'>{L1>=7&&'B'}</div>
                    <div></div>
                    <div className='Carre'>{L>=12&&'S'}</div>
                    <div className='Carre'>{L>=12.5&&'C'}</div>
                </div>
                <div className='Triangle' style={{display:`${L <= 1?'none':'grid'}`,gridRow:`${L<=4 ? 1: L >= 11 ? 11 : L} / span 2`,  gridColumn:` ${L<=7?10:9} / span 2`}}>
                    <div className='Carre'>{L>=16&&'E'}</div>
                    <div className='Carre'></div>
                    <div className='Carre'>{L >= 15&&'T'}</div>
                    <div ></div>
                </div>
                <div className={S>=7?'LTurn':'L'} style={{display:`${S <= 1?'none':'grid'}`,gridRow:`${S <= 4? 0 : S >= 10 ? 10 : S} / span ${S>=7?2:3}`,  gridColumn:`6 / span ${S>=7?3:2}`}}>
                    <div className={S<7&&'Carre'}></div>
                    <div></div>
                    <div className='Carre'>{L1>=10.5&&'G'}</div>
                    <div className={S>=7&&'Carre'}>{L>=14.5&&'T'}</div>
                    <div className='Carre'>{L>=15&&'U'}</div>
                    <div className='Carre'>{L>=15.5&&'R'}</div>
                </div>
                <div className='Cube' style={{display:`${cube3+3 <= 1?'none':'grid'}`,gridRow: `${ cube3+3 <= 2? 1: cube3+3 >= 10 ? 10 : cube3+3} / span 2`, gridColumn: `${cube3+3<=5?10:11} / span 2` }}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div>


                <div className={pont1<=5?'PontTurn':'Pont'} style={{display:`${pont1 <= 1?'none':'grid'}`,gridRow:`${pont1<=1?1:pont1 >= 9 ? 9 : pont1} / span ${pont1<=5?3:2}`,  gridColumn:` ${pont1<=5?9:pont1===6?8:7} / span ${pont1<=5?2:3}`}}>
                    <div className='Carre'>{barre2>=11&&'T'}</div>
                    <div className='Carre'></div>
                    <div className={pont1>5&&'Carre'}></div>
                    <div className='Carre'>{L1>=10&&'A'}</div>
                    <div className={pont1<=5&&'Carre'}></div>
                    <div className='Carre'></div>
                </div>


                <div className='STurn' style={{display:`${L-4 <= 1?'none':'grid'}`,gridRow:`${L-4<=1? 1 : L-4>= 9 ? 9 : L-4} / span 2`,  gridColumn:` ${L-4<7?15:16} / span 3`}}>
                    <div></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div></div>
                </div>
                <div className={L-8<=5?'STurn':'S'} style={{display:`${L-8<=1?'none':'grid'}`,gridRow:`${L-8<=1? 1 : L-8>= 7 ? 7 : L-8} / span ${L-8<=5?2:3}`,  gridColumn:` ${L-8<6?15:16} / span ${L-8<=5?3:2}`}}>
                    <div className={L-8<=5&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className={L-8>5&&'Carre'}></div>
                    <div className={L-8>5&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className={L-8<=5&&'Carre'}></div>
                </div>
                <div className='Barre' style={{display:`${barre2<=1?'none':'grid'}`, gridRow: `${barre2<1?1:barre2 >= 5 ? 5 : barre2} / span 4` }}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div>  


                <div className='Cube' style={{display:`${barre2 <= 1?'none':'grid'}`,gridRow:`${ barre2 <= 2? 1: barre2 >= 8 ? 8 : barre2} / span 2`, gridColumn: `14 / span 2` }}>
                    <div className='Carre'>{pyramide1>=13.5&&'O'}</div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div>


                <div className='STurn' style={{display:`${S1 <= 1?'none':'grid'}`,gridRow:`${S1<=1? 1 : S1>= 6 ? 6 : S1} / span 2`,  gridColumn:` ${S1<5?14:15} / span 3`}}>
                    <div></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div></div>
                </div>
                <div className={pont1-3<5?'L':'LTurn'} style={{display:`${pont1-3 <= 1?'none':'grid'}`,gridRow:`${pont1-3 <= 4? 0 : pont1-3 >= 9 ? 9 : pont1-3} / span ${pont1-3<5?3:2}`,  gridColumn:` 11 / span ${pont1-3<5?2:3}`}}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre' ></div>
                    <div></div> 
                    <div className={pont1-3<5&&'Carre'}></div>
                    <div className={pont1-3>=5&&'Carre'}></div>
                </div>

                <div className={pyramide1<4?'Pyramide':'PyramideTurn'} style={{display:`${pyramide1 <= 1?'none':'grid'}`,gridRow:`${pyramide1 < 1 ? 1 : pyramide1 >= 6? 6 : pyramide1} / span ${pyramide1<4?2:3}`,  gridColumn:`${pyramide1<4?14:13}/ span ${pyramide1<4?3:2}`}}>
                    <div className='Carre'></div>
                    <div className={pyramide1<4&&'Carre'}></div>
                    <div className='Carre'></div>
                    <div className={pyramide1>4&&'Carre'}></div>
                    <div className='Carre'>{pyramide1>=13&&'I'}</div>
                    <div ></div>
                </div>
                <div className={'PyramideTurn'} style={{display:`${L <= 1?'none':'grid'}`, gridRow:`${L < 1 ? 1 : L >= 8? 8 : L} / span 3`,  gridColumn:`${L < 7 ?6:5}/ span 2`}}>
                    <div></div>
                    <div className='Carre'>{pyramide1>=9.5&&'T'}</div>
                    <div className='Carre' >{barre2>=10&&'E'}</div>
                    <div className='Carre' >{barre2>=10.5&&'P'}</div>
                    <div></div>
                    <div className='Carre'>{L1>=9.5&&'B'}</div>
                </div>
                <div className='Barre1' style={{display:`${cube3<=1?'none':'grid'}`, gridRow: `${cube3<1?1:cube3 >= 10 ? 10 : cube3} / span 1`, gridColumn:`${cube3<=7?1:2}/ span 4` }}>
                    <div className='Carre'>{L1>=7.5&&'I'}</div>
                    <div className='Carre'>{L1>=8&&'R'}</div>
                    <div className='Carre'>{L1>=8.5&&'D'}</div>
                    <div className='Carre'>{L1>=9&&'-'}</div>
                </div> 
                <div className='Barre' style={{display:`${L1<=1?'none':'grid'}`, gridRow: `${L1<1?1:L1 >= 7 ? 7 : L1} / span 4`, gridColumn:`10/ span 1` }}>
                    <div className='Carre'></div>
                    <div className='Carre'>{pyramide1>=11.5&&'T'}</div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div> 
                <div className='Cube' style={{display:`${pont1<=1?'none':'grid'}`,gridRow:`${ pont1 <= 2? 1: pont1 >= 8 ? 8 : pont1} / span 2`, gridColumn: `${pont1<=5?5:pont1===6?4:3} / span 2` }}>
                    <div className='Carre'>{pyramide1>=8&&'L'}</div>
                    <div className='Carre'>{pyramide1>=8.5&&'E'}</div>
                    <div className='Carre'>{barre2>=9&&'N'}</div>
                    <div className='Carre'>{barre2>=9.5&&'C'}</div>
                </div>
                <div className='Triangle' style={{display:`${pont1-2<=1?'none':'grid'}`,gridRow:`${pont1-2 >= 8 ? 8 : pont1-2} / span 2`,  gridColumn:'1 / span 2'}}>
                    <div className='Carre'>{pyramide1>=7&&'V'}</div>
                    <div className='Carre'>{pyramide1>=7.5&&'A'}</div>
                    <div className={pont1-2<7&&'Carre'}></div>
                    <div className={pont1-2>=7&&'Carre'}>{barre2>=7.5&&'O'}</div>
                </div>



                <div className='Triangle' style={{display:`${triangle1<=1?'none':'grid'}`,gridRow:`${ triangle1 <= 2? 1: triangle1 >= 7 ? 7 : triangle1} / span 2`, gridColumn: `11 / span 2` }}>
                    <div></div>
                    <div className='Carre'></div>
                    <div className='Carre'>{pyramide1>=12&&'U'}</div>
                    <div className='Carre'>{pyramide1>=12.5&&'D'}</div>
                </div>




                <div className='Barre' style={{display:`${pyramide1-6 <= 1?'none':'grid'}`,gridRow:`${pyramide1-6<=0? 0 : pyramide1-6 >= 4 ? 4 : pyramide1-6} / span 4`,  gridColumn:` 11 / span 1`}}>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div>
                <div className={L2<6?'L':'LTurn'} style={{display:`${L2 <= 1?'none':'grid'}`,gridRow:`${L2 <= 4? 1 : L2 >= 7 ? 7 : L2} / span ${L2<6?3:2}`,  gridColumn:`7 / span ${L2<6?2:3}`}}>
                    <div className='Carre'></div>
                    <div className={L2<6&&'Carre'}></div>
                    <div className={L2<6&&'Carre'}></div>
                    <div className={L2>=6&&'Carre'}>{pyramide1>=10&&'E'}</div>
                    <div className='Carre'>{pyramide1>=10.5&&'-'}</div>
                    <div className={L2>=6&&'Carre'}>{pyramide1>=11&&'S'}</div>
                </div>
                <div className='Triangle' style={{display:`${S1 <= 1?'none':'grid'}`,gridRow:`${S1<=4 ? 1: S1 >= 7 ? 7 : S1} / span 2`,  gridColumn:` 5 / span 2`}}>
                    <div className='Carre'>{pyramide1-4>=10&&'L'}</div>
                    <div className='Carre'></div>
                    <div className='Carre'>{pyramide1>=9&&'T'}</div>
                    <div ></div>
                </div>
                <div className='Triangle' style={{display:`${pyramide1 <= 1?'none':'grid'}`,gridRow:`${pyramide1<=4 ? 1: pyramide1 >= 6 ? 6 : pyramide1} / span 2`,  gridColumn:` 1 / span 2`}}>
                    <div></div>
                    <div className='Carre'></div>
                    <div className='Carre'>{pyramide1-4>=8&&'C'}</div>
                    <div className='Carre'>{pyramide1-4>=8.5&&'A'}</div>
                </div>
                <div className='STurn' style={{display:`${S1-5 <= 1?'none':'grid'}`,gridRow:`${S1-5<=1? 1 : S1-5>= 6 ? 6 : S1-5} / span 2`,  gridColumn:` ${S1-5<5?4:3} / span 3`}}>
                    <div></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                    <div className='Carre'>{pyramide1-4>=9&&'R'}</div>
                    <div className='Carre'>{pyramide1-4>=9.5&&'E'}</div>
                    <div></div>
                </div>
                <div className='L' style={{display:`${S1 <= 1?'none':'grid'}`,gridRow:`${S1 <= 1? 1 : S1 >= 5 ? 5 : S1} / span 3`,  gridColumn:`8 / span 2`}}>
                    <div className='Carre'></div>
                    <div></div>
                    <div className='Carre'></div>
                    <div></div>
                    <div className='Carre'></div>
                    <div className='Carre'></div>
                </div>
            </div>
            */

{//<Footer acceuil={true} setLogoFanch={false} style={{marginLeft:0}}/>
}
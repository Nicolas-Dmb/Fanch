import React, { useEffect, useState } from 'react';
import carel1 from '../static/image/carel_1.png';
import carel2 from '../static/image/carel_2.png';
import carel3 from '../static/image/carel_3.png';
import carel4 from '../static/image/carel_4.png';
import carel5 from '../static/image/carel_5.png';
import carel6 from '../static/image/carel_6.png';
import carel7 from '../static/image/carel_7.png';
import carel8 from '../static/image/carel_8.png';
import ligne from '../static/image/Ligne.png';
import ligne1 from '../static/image/Ligne1.png';

function Carel({ setAcceuil, setLogoFanch }) {
    const [display, setDisplay] = useState(true);
    const [stop, setStop] = useState(false);

    const [concorde, setConcorde] = useState(false);
    const [clemenceau, setClemenceau] = useState(false);
    const [nikita, setNikita] = useState(false);
    const [lorette, setLorette] = useState(false);
    const [clochette, setClochette] = useState(false);
    const [elysee, setElysee] = useState(false);
    const [vintage, setVintage] = useState(false);
    const [mimi, setMimi] = useState(false);
    const [raya, setRaya] = useState(false);
    const [dauphine, setDauphine] = useState(false);
    const [rivoli, setRivoli] = useState(false);
    const [madeleine, setMadeleine] = useState(false);

    const [screenDimensions, setScreenDimensions] = useState({
        screenHeight: window.innerHeight,
        screenWidth: window.innerWidth,
        BottomWidth: (window.innerWidth / 100) * 90,
        BottomMargin: (window.innerWidth / 100) * 5
    });

    const carels = [carel1, carel2, carel3, carel4, carel5, carel6, carel7, carel8];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const preloadImages = async () => {
            const promises = carels.map((src) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = reject;
                });
            });
            await Promise.all(promises);
            setImagesLoaded(true);
        };
        preloadImages();
    }, [carels]);

    useEffect(() => {
        if (imagesLoaded) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % carels.length);
            }, 1000); // Change image every second

            return () => clearInterval(interval); // Cleanup the interval on component unmount
        }
    }, [carels.length, imagesLoaded]);

    useEffect(() => {
        setAcceuil(false);
        setLogoFanch(true);

        const handleResize = () => {
            setScreenDimensions({
                screenHeight: window.innerHeight,
                screenWidth: window.innerWidth,
                BottomWidth: (window.innerWidth / 100) * 90,
                BottomMargin: (window.innerWidth / 100) * 5
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setAcceuil, setLogoFanch]);

    const { screenHeight, screenWidth, BottomWidth, BottomMargin } = screenDimensions;

    return (
        <div className='Carel'>
            <div className='Top'>
                <p>B</p>
                <div style={{ position: 'relative' }}>
                    <p>A</p>
                    {imagesLoaded && (
                        <img
                            src={carels[currentIndex]}
                            className='A'
                            alt='BAG'
                            style={{
                                position: 'absolute',
                                top: '87%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    )}
                </div>
                <p>G</p>
            </div>
            <div className='Bottom' style={{ width: BottomWidth, height: BottomWidth * 0.63,margin:BottomMargin,marginTop: '100px', position:'absolute' }}>
                    <img src={ligne} className='LigneConcorde' style={{height:BottomWidth * 0.63/13*8, width:BottomWidth/30, margin:'20px 10px', display:concorde?'block':'none'}}/>
                    <img src={ligne1} className='LigneClemenceau' style={{height:BottomWidth * 0.63/16, width:BottomWidth/21*9, display:clemenceau?'block':'none'}}/>
                    <img src={ligne1} className='LigneNikita' style={{height:BottomWidth * 0.63/16, width:BottomWidth/21*6, display:nikita?'block':'none'}}/>
                    <img src={ligne} className='LigneLorette' style={{height:BottomWidth * 0.63/13*6, width:BottomWidth/30,margin:'20px 10px', display:lorette?'block':'none'}}/>
                    <img src={ligne1} className='LigneClochette' style={{height:BottomWidth * 0.63/16, width:BottomWidth/21*9, display:clochette?'block':'none'}}/>
                    <img src={ligne} className='LigneElysee' style={{height:BottomWidth * 0.63/13*5, width:BottomWidth/30, margin:'20px 10px', display:elysee?'block':'none'}}/>
                    <img src={ligne} className='LigneVintage' style={{height:BottomWidth * 0.63/13*6, width:BottomWidth/30, margin:'20px 10px', display:vintage?'block':'none'}}/>
                    <img src={ligne} className='LigneDauphine' style={{height:BottomWidth * 0.63/13*7, width:BottomWidth/30, margin:'20px 10px', display:dauphine?'block':'none'}}/>
                    <img src={ligne1} className='LigneMimi' style={{height:BottomWidth * 0.63/16, width:BottomWidth/21*4, display:mimi?'block':'none'}}/>
                    <img src={ligne1} className='LigneRaya' style={{height:BottomWidth * 0.63/16, width:BottomWidth/21*4, display:raya?'block':'none'}}/>
                    <img src={ligne1} className='LigneRivoli' style={{height:BottomWidth * 0.63/16, width:BottomWidth/21*6, display:rivoli?'block':'none'}}/>
                    <img src={ligne1} className='LigneMadeleine' style={{height:BottomWidth * 0.63/16, width:BottomWidth/21*9, display:madeleine?'block':'none'}}/>
            </div>
            <div className='Bottom' style={{ width: BottomWidth, height: BottomWidth * 0.63,margin:BottomMargin,marginTop: '100px', position:'absolute' }}>
                <div className='Concorde' onMouseOver={()=>setConcorde(true)} onMouseOut={()=>setConcorde(false)}>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}><p style={{ fontSize: '0.2em', position: 'relative', top:(-BottomWidth*0.63/7)*0.2, left:(-BottomWidth*0.63/13)*0.2  }}>4</p>C</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>O</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>N</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>C</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>O</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>R</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>D</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                </div>
                <div className='Clemenceau' onMouseOver={()=>setClemenceau(true)} onMouseOut={()=>setClemenceau(false)}>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}><p style={{ fontSize: '0.2em', position: 'relative', top:(-BottomWidth*0.63/7)*0.2, left:(-BottomWidth*0.63/13)*0.2 }}>10</p>C</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>L</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>M</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>C</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>A</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>U</div>
                </div>
                <div className='Lorette' onMouseOver={()=>setLorette(true)} onMouseOut={()=>setLorette(false)}>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}><p style={{ fontSize: '0.2em', position: 'relative', top:(-BottomWidth*0.63/7)*0.2, left:(-BottomWidth*0.63/13)*0.2 }}>8</p>L</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>O</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>R</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>T</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>T</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                </div>
                <div className='Nikita' onMouseOver={()=>setNikita(true)} onMouseOut={()=>setNikita(false)}>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}><p style={{ fontSize: '0.2em', position: 'relative', top:(-BottomWidth*0.63/7)*0.2, left:(-BottomWidth*0.63/13)*0.2 }}>12</p>N</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>I</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>K</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>I</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>T</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>A</div>
                </div>
                <div className='Clochette' onMouseOver={()=>setClochette(true)} onMouseOut={()=>setClochette(false)}>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}><p style={{ fontSize: '0.2em', position: 'relative', top:(-BottomWidth*0.63/7)*0.2, left:(-BottomWidth*0.63/13)*0.2}}>7</p>C</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}></div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>O</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>C</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>H</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>T</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>T</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                </div>
                <div className='Elysee' onMouseOver={()=>setElysee(true)} onMouseOut={()=>setElysee(false)}>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}><p style={{ fontSize: '0.2em', position: 'relative', top:(-BottomWidth*0.63/7)*0.2, left:(-BottomWidth*0.63/13)*0.2}}>2</p>É</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>L</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>Y</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>S</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>É</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                </div>
                <div className='Vintage' onMouseOver={()=>setVintage(true)} onMouseOut={()=>setVintage(false)}>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}><p style={{ fontSize: '0.2em', position: 'relative', top:(-BottomWidth*0.63/7)*0.2, left:(-BottomWidth*0.63/13)*0.2}}>1</p>V</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>I</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>N</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>T</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>A</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>G</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                </div>
                <div className='Raya' onMouseOver={()=>setRaya(true)} onMouseOut={()=>setRaya(false)}>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}><p style={{ fontSize: '0.2em', position: 'relative', top:(-BottomWidth*0.63/7)*0.2, left:(-BottomWidth*0.63/13)*0.2}}>6</p>R</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>A</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>Y</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>A</div>
                </div>
                <div className='Mimi' onMouseOver={()=>setMimi(true)} onMouseOut={()=>setMimi(false)}>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}><p style={{ fontSize: '0.2em', position: 'relative', top:(-BottomWidth*0.63/7)*0.2, left:(-BottomWidth*0.63/13)*0.2}}>3</p>M</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>I</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>M</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>I</div>
                </div>
                <div className='Dauphine' onMouseOver={()=>setDauphine(true)} onMouseOut={()=>setDauphine(false)}>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}><p style={{ fontSize: '0.2em', position: 'relative', top:(-BottomWidth*0.63/7)*0.2, left:(-BottomWidth*0.63/13)*0.2}}>5</p>D</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>A</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>U</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>P</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>H</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>I</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>N</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                </div>
                <div className='Rivoli' onMouseOver={()=>setRivoli(true)} onMouseOut={()=>setRivoli(false)}>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}><p style={{ fontSize: '0.2em', position: 'relative', top:(-BottomWidth*0.63/7)*0.2, left:(-BottomWidth*0.63/13)*0.2}}>9</p>R</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>I</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>V</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>O</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>L</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>I</div>
                </div>
                <div className='Madeleine' onMouseOver={()=>setMadeleine(true)} onMouseOut={()=>setMadeleine(false)}>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}><p style={{ fontSize: '0.2em', position: 'relative', top:(-BottomWidth*0.63/7)*0.2, left:(-BottomWidth*0.63/13)*0.2 }}>11</p>M</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>A</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>D</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>L</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>I</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>N</div>
                    <div className='Carre' style={{fontSize:BottomWidth*0.63/21}}>E</div>
                </div>
            </div>
        </div>
    );
}

export default Carel;


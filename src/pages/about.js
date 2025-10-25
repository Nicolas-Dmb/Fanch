import React, { useEffect, useRef, useState } from 'react';
import facefanch from '../static/image/facefanch.png';
import bandeau from '../static/image/Bandeau.png';
import signature from '../static/image/signature.png';
import Background from '../entities/Background.ts';

function About({setAcceuil,setLogoFanch}) {
  const bannerRef = useRef(null);
  const [xPos, setXPos] = useState(0);
  const speed = 2; // Vitesse de défilement

  // Utilisez useEffect pour simuler componentDidMount
  useEffect(() => {
    setAcceuil(Background.White)
    setLogoFanch(true)
    const banner = bannerRef.current;
    const images = banner.children;

    const moveBanner = () => {
      setXPos(prevXPos => {
        let newXPos = prevXPos - speed;
        if (newXPos <= -3500) {
          newXPos = 0;
          banner.appendChild(images[0]); // Déplace la première image à la fin
        }
        banner.style.transform = `translateX(${newXPos}px)`; // Applique la transformation
        return newXPos;
      });

      requestAnimationFrame(moveBanner);
    };

    moveBanner();

    // Cleanup function pour arrêter l'animation si le composant est démonté
    return () => cancelAnimationFrame(moveBanner);
  }, []);
  return (
    <div className="about">
      <img src={facefanch} alt="tête fanch" style={{ width: '50%', height: '50%' }} />
      <div className="banner" ref={bannerRef}>
          <img src={bandeau} alt="Image 1" className="banner-image"/>
          <img src={bandeau} alt="Image 2" className="banner-image"/>
          <img src={bandeau} alt="Image 3" className="banner-image" />
      </div>
      <div className="Paragraphe">
        <p>Originaire du sud de la France, j'ai pris la décision de m'installer à Paris en 2022 pour poursuivre ma passion dans le domaine du design. Spécialisé dans la création de maroquinerie, j'ai également développé mes compétences dans le design graphique et produit. Mon parcours artistique est profondément imprégné par l'architecture, le design d’intérieur et industriel, qui exercent une influence majeure sur ma créativité.</p>
        <p>Mes inspirations sont diverses, mais parmi les designers qui ont laissé une empreinte indélébile sur mon travail figurent des géants tels que Le Corbusier, Eileen Gray et Philippe Starck. Leurs idées novatrices et leur audace m'ont toujours fasciné. Cependant, mon véritable musée d'art se trouve dans les rues, où chaque coin de rue recèle une histoire, chaque bâtiment une âme.</p>
        <p>Mon processus créatif commence parfois par une simple promenade, où je suis captivé par les formes, les textures et les histoires qui m'entourent. Chaque détail, qu'il s'agisse d'une ferronnerie délicate sur une porte ancienne ou des lignes épurées d'un bâtiment moderniste, me parle et nourrit mon imagination.</p>
        <p style={{ marginBottom: 2 }}>C'est ainsi que je crée mes pièces de maroquinerie, comme autant de chapitres d'une histoire visuelle. Chacune est un voyage, un mélange harmonieux entre l'esthétique et la fonctionnalité, où le cuir devient le support de récits et d'aventures à venir. Mon objectif est de créer des pièces qui ne se contentent pas d'être belles, mais qui transportent celui ou celle qui les porte dans un univers où l'art et la vie se confondent, où chaque sac ou accessoire est un fragment d'histoire à part entière.</p>
        <img src={signature} alt="signature" className="signature" />
      </div>
    </div>
  );
}

export default About;

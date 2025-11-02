import corner from '../static/images/corner.svg';
import React, { useEffect, useRef, useState } from 'react';

interface SideBracketsInputProps {
  fonts: string;
}

export default function SideBracketsInput({fonts}:SideBracketsInputProps) {
  return (
    <div className="relative w-[60vw] h-[6vh] md:w-[30vw] md:h-[8vh]">

      <img
        src={corner}
        alt="corner top left"
        className="absolute top-0 left-0 w-[3vw] h-[3vw]  md:w-[1vw] md:h-[1vw] pointer-events-none select-none
                   -translate-x-[2px] -translate-y-[2px] z-20"
      />
      <img
        src={corner}
        alt="corner top right"
        className="absolute top-0 right-0 w-[3vw] h-[3vw]  md:w-[1vw] md:h-[1vw] rotate-90 pointer-events-none select-none
                   translate-x-[2px] -translate-y-[2px] z-20"
      />
      <img
        src={corner}
        alt="corner bottom right"
        className="absolute bottom-0 right-0 w-[3vw] h-[3vw]  md:w-[1vw] md:h-[1vw] rotate-180 pointer-events-none select-none
                   translate-x-[2px] translate-y-[2px] z-20"
      />
      <img
        src={corner}
        alt="corner bottom left"
        className="absolute bottom-0 left-0 w-[3vw] h-[3vw]  md:w-[1vw] md:h-[1vw] -rotate-90 pointer-events-none select-none
                   -translate-x-[2px] translate-y-[2px] z-20"
      />

      <FancyCaretInput wrapperClassName="w-full h-full"
        className={`text-center [&::placeholder]:text-center py-0 leading-[8vh] px-6 ${fonts}`}/>
    </div>
  );
}



type FancyCaretInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;       
  wrapperClassName?: string;   
  caretColor?: string;       
  caretWidthPx?: number;     
  caretHeightRatio?: number;   
};

function FancyCaretInput({
  className = '',
  wrapperClassName = '',
  placeholder = '',
  caretColor = '#d6c13a',
  caretWidthPx = 2,
  caretHeightRatio = 0.55,
  value,
  onChange,
  ...rest
}: FancyCaretInputProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  const [showCaret, setShowCaret] = useState(false);
  const [caretX, setCaretX] = useState(0);

  const updateCaret = () => {
    const input = inputRef.current!;
    const mirror = mirrorRef.current!;
    const cs = getComputedStyle(input);

    const val = (value ?? input.value ?? '') as string;
    const pos = input.selectionStart ?? String(val).length;

    const padL = parseFloat(cs.paddingLeft || '0');
    const padR = parseFloat(cs.paddingRight || '0');
    const contentW = input.clientWidth - padL - padR;

    mirror.style.font = cs.font;          
    mirror.style.fontSize = cs.fontSize;
    mirror.style.fontFamily = cs.fontFamily;
    mirror.style.fontWeight = cs.fontWeight;
    mirror.style.letterSpacing = cs.letterSpacing;
    mirror.style.textTransform = cs.textTransform;
    mirror.style.whiteSpace = 'pre';               
    mirror.style.paddingLeft = '0';               

    const toNbsp = (s: string) => s.replace(/ /g, '\u00A0');

    mirror.textContent = toNbsp(val);
    const fullW = mirror.offsetWidth;

    mirror.textContent = toNbsp(val.slice(0, pos));
    const beforeW = mirror.offsetWidth;

    let startX = padL;
    if (cs.textAlign === 'center') {
        startX = padL + Math.max((contentW - fullW) / 2, 0);
    } else if (cs.textAlign === 'right') {
        startX = padL + Math.max(contentW - fullW, 0);
    }

    setCaretX(startX + beforeW);
  };

  useEffect(() => {
    const input = inputRef.current!;
    const onAny = () => {
      if (document.activeElement === input) {
        setShowCaret(true);
        updateCaret();
      }
    };
    const onBlur = () => setShowCaret(false);

    input.addEventListener('input', onAny);
    input.addEventListener('keyup', onAny);
    input.addEventListener('click', onAny);
    input.addEventListener('focus', onAny);
    input.addEventListener('blur', onBlur);
    window.addEventListener('resize', onAny);

    return () => {
      input.removeEventListener('input', onAny);
      input.removeEventListener('keyup', onAny);
      input.removeEventListener('click', onAny);
      input.removeEventListener('focus', onAny);
      input.removeEventListener('blur', onBlur);
      window.removeEventListener('resize', onAny);
    };
  }, []);

  useEffect(() => {
    if (document.activeElement === inputRef.current) updateCaret();
  }, [value]);

  return (
    <div
      ref={wrapRef}
      className={`relative ${wrapperClassName}`}
      style={{ caretColor: 'transparent' }}
    >
      <input
        ref={inputRef}
        type="text"
        spellCheck={false}
        placeholder={placeholder}
        value={value as string | number | readonly string[] | undefined}
        maxLength={12}
        onChange={onChange}

        className={`w-full h-full bg-transparent outline-none px-6 text-center text-[#fff] text-[8vw] md:text-[4vw] [&::placeholder]:text-center ${className}`}
        {...rest}
      />

        <span
            ref={mirrorRef}
            aria-hidden
            className="absolute pointer-events-none select-none opacity-0 whitespace-pre"
            style={{
                left: 0,
                top: 0,
                font: 'inherit',
                letterSpacing: 'inherit',
                lineHeight: 'inherit',
            }}
        />

        {showCaret && (
        <span
            className="absolute"
            style={{
            left: caretX,
            top: `calc((100% - ${caretHeightRatio * 65}%) / 2)`,
            width: `${caretWidthPx}px`,
            height: `${caretHeightRatio * 100}%`,
            background: ` ${caretColor}`,
            animation: 'fc-fade 1.1s ease-in-out infinite',
            }}
        />
        )}

        <style>{`
        @keyframes fc-fade {
            0%   { opacity: 0; }
            35%  { opacity: 1; }  /* fondu entrant */
            65%  { opacity: 1; }  /* petit temps plein */
            100% { opacity: 0; }  /* fondu sortant */
        }
        /* accessibilité : désactive l’animation si l’utilisateur préfère moins de mouvements */
        @media (prefers-reduced-motion: reduce) {
            * { animation: none !important; }
        }
        `}</style>
    </div>
  );
}

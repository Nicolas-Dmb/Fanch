import { createPortal } from "react-dom";
import Colors from "../../../entities/Background.ts";
import Header from "../../../components/Header.tsx";
import Footer from "../../../components/Footer.tsx";
import React from "react";
import CornerInput from "./CornerInput.tsx"

const Fonts = {
    Nika_Thin: 'font-thin',
    Nika_Regular: 'font-regular',
    Nika_Bold: 'font-bold',
}

export type FontType = typeof Fonts[keyof typeof Fonts];

const styles = 'bg-[#ffffff]'

const selectedStyles = 'bg-[#f6e820] shadow-[3px_3px_0_#ffffff]'

interface FontInputProps {
    ref: React.Ref<HTMLDivElement>;
}

const FontInput = React.forwardRef<HTMLDivElement, FontInputProps>(function FontInput(_props, ref){
    const [selectedFont, setSelectedFont] = React.useState<FontType>(Fonts.Nika_Thin);

    return createPortal(
    <div ref={ref} className="fixed inset-0 bg-[#1D1D1B] flex flex-col justify-between font-perso">
        <Header bgColor={Colors.Grey} textColor={Colors.White} />
        <div className="flex-grow flex flex-col justify-center mt-[20vh] gap-10">
            <div className="w-[30vw] h-[10vh] items-center mx-auto my-30 ">
                <CornerInput fonts={selectedFont}/>
            </div>
            <div className="flex flex-row justify-around items-center h-full mx-8">
                <div onClick={()=>setSelectedFont(Fonts.Nika_Thin)} className={`cursor-pointer font-thin h-[5vh] text-[2vw] px-2 ${selectedFont === Fonts.Nika_Thin ? selectedStyles : styles}`}>
                    <p>Nika_Thin</p>
                </div>
                <div onClick={()=>setSelectedFont(Fonts.Nika_Regular)} className={`cursor-pointer font-regular h-[5vh] text-[2vw] px-2  ${selectedFont === Fonts.Nika_Regular ? selectedStyles : styles}`}>
                    <p>Nika_Regular</p>
                </div>
                <div onClick={()=>setSelectedFont(Fonts.Nika_Bold)} className={`cursor-pointer font-bold h-[5vh] text-[2vw] px-2  ${selectedFont === Fonts.Nika_Bold ? selectedStyles : styles}`}>
                    <p>Nika_Bold</p>
                </div>
            </div>
        </div>
        <Footer bgColor={Colors.Grey} textColor={Colors.White} logoFanch={false} />
    </div>,
    document.body
    )
});

export default FontInput;
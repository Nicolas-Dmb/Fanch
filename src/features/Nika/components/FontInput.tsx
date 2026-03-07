import { createPortal } from "react-dom";
import Colors from "../../../entities/Background.ts";
import Header from "../../../components/Header.tsx";
import Footer from "../../../components/Footer.tsx";
import React from "react";
import CornerInput from "./CornerInput.tsx"

interface FontInputProps {
    ref: React.Ref<HTMLDivElement>;
}

const FontInput = React.forwardRef<HTMLDivElement, FontInputProps>(function FontInput(_props, ref){

    return createPortal(
    <div ref={ref} className="fixed inset-0 z-[9999] bg-[#ffffff] flex flex-col justify-between font-perso h-[100svh]">
        <Header bgColor={Colors.White} textColor={Colors.Black} />
        <div className="flex-grow flex flex-col justify-center gap-10 items-center">
                <CornerInput/>
        </div>
        <Footer bgColor={Colors.White} textColor={Colors.Black} logoFanch={false} displayFooter={true} />
    </div>,
    document.body
    )
});

export default FontInput;
import { createPortal } from "react-dom";
import Colors from "../../../entities/Background.ts";
import Header from "../../../components/Header.tsx";
import Footer from "../../../components/Footer.tsx";

export default function FontInput(){

    return createPortal(
    <div className="fixed inset-0 bg-[#1D1D1B] flex flex-col justify-between">
        <Header bgColor={Colors.Grey} textColor={Colors.White} />
        <Footer bgColor={Colors.Grey} textColor={Colors.White} logoFanch={false} />
    </div>,
    document.body
    )
}
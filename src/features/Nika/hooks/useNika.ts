import {useEffect, useState} from "react";
import Background from "../../../entities/Background.ts";


type BackgroundColor = typeof Background[keyof typeof Background];

export default function useNika(setAcceuil: React.Dispatch<React.SetStateAction<BackgroundColor>>, setLogoFanch: React.Dispatch<React.SetStateAction<boolean>>){

    useEffect(() => {
        if (setAcceuil) {
            setAcceuil(Background.Yellow);
        }
        if (setLogoFanch) {
            setLogoFanch(false);
        }
    }, [setAcceuil, setLogoFanch]);

}
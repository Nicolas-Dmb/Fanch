import { useEffect, useState } from "react";
import Background from "../entities/Background.ts";

export default function Nika({ setAcceuil, setLogoFanch }) {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        setAcceuil(Background.Yellow);
        setLogoFanch(false);
    }, [setAcceuil, setLogoFanch]);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 100) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
      <section className="bg-[#f6e820] font-perso relative flex justify-center min-h-[100vh] overflow-hidden">
            {/* contenu central */}
            <div className="text-center text-4xl md:text-8xl">
                {/* Ton contenu principal */}
            </div>

            {/* bloc lettres */}
            <div
                className={
                    " text-5xl md:text-8xl select-none text-[35vw] md:text-[50vw] " +
                    (hasScrolled
                        ? "right-[-4rem] bottom-[4rem] transition-all duration-300"
                        : "right-6 bottom-6 transition-all duration-300"
                    )
                }
            >
                <FallingLetter char="N" active={hasScrolled} delay={0} />
                <FallingLetter char="i" active={hasScrolled} delay={0.1} />
                <FallingLetter char="k" active={hasScrolled} delay={0.2} />
                <FallingLetter char="a" active={hasScrolled} delay={0.3} />
            </div>
        </section>
    );
}

function FallingLetter({
    char,
    active,
    delay,
}) {
    return (
        <span
            className={
                "inline-block origin-bottom hover:animate-wiggle " +
                (active
                    ? "falling-letter"
                    : "")
            }
            style={{
                transition: "transform 0.6s ease-out",
                transitionDelay: `${delay}s`,
            }}
        >
            {char}
        </span>
    );
}

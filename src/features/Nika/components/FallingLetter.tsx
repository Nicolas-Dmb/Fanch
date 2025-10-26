

interface FallingLetterProps {
    char: string;
    ref?: React.Ref<HTMLSpanElement>;
}

export default function FallingLetter({
    char,
    ref,
}:FallingLetterProps) {
    return (
        <span
            ref={ref}
            className={"inline-block origin-bottom hover:animate-wiggle "}
            style={{
                transition: "transform 0.6s ease-out",
            }}
        >
            {char}
        </span>
    );
}

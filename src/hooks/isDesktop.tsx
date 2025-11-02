import { useEffect, useState } from "react";

export default function useIsDesktop(minWidth = 768) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [minWidth]);

  return isDesktop;
}
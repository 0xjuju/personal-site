import { useEffect, useRef, useState } from "react";


export function usePositions(count: number) {

    const refs = useRef<HTMLElement[]>([]);
    const [centers, setCenters] = useState<{ x: number; y: number }[]>([]);

    // register each card ref
    const register = (idx: number) => (el: HTMLElement | null) => {
        refs.current[idx] = el!;
    };

    useEffect(() => {
        const calc = () =>
            setCenters(
                refs.current
                    .filter((el): el is HTMLElement => el !== null)
                    .map((el) => {
                        const { left, top, width, height } = el.getBoundingClientRect();
                        return { x: left + width / 2, y: top + height / 2 };
                    })
            );

        calc();

        const ro = new ResizeObserver(calc);
        refs.current.forEach((el) => el && ro.observe(el));

        window.addEventListener("scroll", calc);

        return () => {
            ro.disconnect();
            window.removeEventListener("scroll", calc);
        };
    }, [count]);

    return { register, centers };
}

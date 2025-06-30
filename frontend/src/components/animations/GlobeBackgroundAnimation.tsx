"use client";

import { useEffect, useRef, useState } from "react";

import GoldenGlobeAnimation from "@/components/animations/GoldenGlobeAnimation";


interface GlobeBackgroundAnimationProps {
    size?: number | string;
    speed?: number;
    opacity?: number;
}


export default function GlobeBackgroundAnimation({
    size = 192,
    speed = 40,
    opacity = 0.4,
}: GlobeBackgroundAnimationProps) {

    /* ————————— responsive size (half on <640px) ————————— */
    const getEffective = () => {
        const half = typeof window !== "undefined" && window.innerWidth < 640;
        if (typeof size === "number") return half ? size / 2 : size;
        const num = parseFloat(size.toString());
        const unit = size.toString().replace(num.toString(), "");
        return half ? `${num / 2}${unit}` : size;
    };

    const [effectiveSize, setEffectiveSize] = useState(getEffective);

    /* update on resize */
    useEffect(() => {
        const onResize = () => setEffectiveSize(getEffective());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [size]);

    /* animation logic */
    const globeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = globeRef.current;
        if (!el) return;

        const toPx = (v: typeof effectiveSize): number =>
            typeof v === "number" ? v : parseFloat(v.toString());

        const pxSize = toPx(effectiveSize);

        let x = Math.random() * (window.innerWidth - pxSize);
        let y = Math.random() * (window.innerHeight - pxSize);
        let vx = (Math.random() > 0.5 ? 1 : -1) * (speed / 60);
        let vy = (Math.random() > 0.5 ? 1 : -1) * (speed / 60);

        let frameId: number;

        const step = () => {
            x += vx;
            y += vy;

            if (x <= 0 || x >= window.innerWidth - pxSize) {
                vx *= -1;
                x = Math.max(0, Math.min(x, window.innerWidth - pxSize));
            }

            if (y <= 0 || y >= window.innerHeight - pxSize) {
                vy *= -1;
                y = Math.max(0, Math.min(y, window.innerHeight - pxSize));
            }

            el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            frameId = requestAnimationFrame(step);
        };

        frameId = requestAnimationFrame(step);

        return () => cancelAnimationFrame(frameId);
    }, [effectiveSize, speed]);

    const sizeStr =
        typeof effectiveSize === "number" ? `${effectiveSize}px` : effectiveSize;

    return (
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
            <div
                ref={globeRef}
                style={{
                    position: "absolute",
                    width: sizeStr,
                    height: sizeStr,
                    opacity,
                }}
            >
                <GoldenGlobeAnimation width="100%" height="100%" />
            </div>
        </div>
    );
}

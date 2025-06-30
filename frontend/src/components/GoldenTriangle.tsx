import { CSSProperties, FC } from "react";

import clsx from "clsx";


interface GoldenTriangleProps {
    width?: number | string;
    height?: number | string;
    opacity?: number;
    orientation?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}


const GoldenTriangle: FC<GoldenTriangleProps> = ({
    width = 40,
    height = 40,
    opacity = 0.4,
    orientation = "top-right",
}) => {

    const orientationClass = clsx(
        "absolute pointer-events-none aura",

        orientation === "top-left" &&
            "top-0 left-0 [clip-path:polygon(0_0,100%_0,0_100%)]",

        orientation === "top-right" &&
            "top-0 right-0 [clip-path:polygon(100%_0,0_0,100%_100%)]",

        orientation === "bottom-left" &&
            "-bottom-1 left-0 [clip-path:polygon(0_100%,0_0,100%_100%)]",

        orientation === "bottom-right" &&
            "-bottom-1 right-0 [clip-path:polygon(100%_0,100%_100%,0_100%)]"
    );

    const style: CSSProperties = {
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        opacity,
        background: "var(--color-primary-500)",
        boxShadow: "var(--shadow-aura)",
    };

    return <span className={orientationClass} style={style} />;
};


export default GoldenTriangle;

import React from "react";

import Lottie from "lottie-react";

import goldenGlobeData from "@/components/animations/goldenGlobe.json";


interface GoldenGlobeAnimationProps {
    width?: string;
    height?: string;
    loop?: boolean;
    className?: string;
}


/* Moving globe that bounces of walls */
export default function GoldenGlobeAnimation({
    width = "26rem",
    height = "26rem",
    loop = true,
    className = "",
}: GoldenGlobeAnimationProps) {

    return (
        <div
            className={`overflow-hidden ${className}`.trim()}
            style={{ width, height }}
        >
            <Lottie
                animationData={goldenGlobeData}
                loop={loop}
                style={{ width: "100%", height: "100%", opacity: 0.5 }}
                className="inset-0 pointer-events-none"
            />
        </div>
    );
}

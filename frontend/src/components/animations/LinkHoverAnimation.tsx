"use client";

import Link from "next/link";
import { ReactNode } from "react";

import GoldenGlobeAnimation from "@/components/animations/GoldenGlobeAnimation";


interface LinkHoverAnimationProps {
    href: string;
    children: ReactNode;
    width?: string;
    height?: string;
    className?: string;
    loop?: boolean;
}


/* Hover Golden globe animation behind objects */
export default function LinkHoverAnimation({
    href,
    children,
    width = "8rem",
    height = "8rem",
    className = "",
    loop = true,
}: LinkHoverAnimationProps) {

    const isExternal = /^https?:\/\//.test(href);

    return (
        <span className={`relative inline-block group ${className}`.trim()}>
            <Link
                href={href}
                className="hover-target relative z-10"
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {children}
            </Link>

            <span
                className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0
                group-hover:opacity-60 transition-opacity duration-200"
                aria-hidden
            >
                <GoldenGlobeAnimation width={width} height={height} loop={loop} />
            </span>
        </span>
    );
}

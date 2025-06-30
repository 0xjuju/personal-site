"use client";

import { FC, ReactNode } from "react";


interface GalleryFrameProps {
    children: ReactNode;
}


/** Solar-Gold gallery wrapper with corner tabs */
const GalleryFrame: FC<GalleryFrameProps> = ({ children }) => (
    <div className="relative mx-auto max-w-7xl overflow-visible">

        {/* inner box */}
        <div
            className="
                relative w-full border-4 rounded-lg
                border-[var(--color-primary-500)]
                p-8
                shadow-[0_0_16px_rgba(255,209,102,0.4)]  /* gold aura */
            "
        >
            {children}
        </div>

        <span className="absolute -top-[16px] -left-[16px] w-6 h-6 border-t-4 border-l-4 border-[var(--color-primary-500)]" />
        <span className="absolute -top-[16px] -right-[16px] w-6 h-6 border-t-4 border-r-4 border-[var(--color-primary-500)]" />
        <span className="absolute -bottom-[16px] -left-[16px] w-6 h-6 border-b-4 border-l-4 border-[var(--color-primary-500)]" />
        <span className="absolute -bottom-[16px] -right-[16px] w-6 h-6 border-b-4 border-r-4 border-[var(--color-primary-500)]" />
    </div>
);


export default GalleryFrame;

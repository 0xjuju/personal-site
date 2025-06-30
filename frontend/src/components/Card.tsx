import React from "react";


interface CardProps {
    variant?: "light" | "dark";
    className?: string;
    children: React.ReactNode;
}


/**
 * - Light: uses the .card class (glassmorphic background, border, blur, shadow).
 * - Dark: uses the same background token and the .aura glow for separation (no border/shadow).
 */

export default function Card({
    variant = "light",
    className = "",
    children,
}: CardProps) {

    const baseClasses = "p-8 rounded-lg hover-lift";
    const variantClasses = variant === "light" ? "card" : "aura";

    return (
        <div className={`${baseClasses} ${variantClasses} ${className}`.trim()}>
            {children}
        </div>
    );
}

"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode } from "react";


interface CardFadeInProps {
    children: ReactNode;
    index?: number;
    stagger?: number;
    duration?: number;
    className?: string;
}


/**
 * Alternates cards from left/right based on index.
 */
export default function CardFadeIn({
    children,
    index = 0,
    stagger = 0.15,
    duration = 0.6,
    className = "flex-1 min-w-[14rem] max-w-xs",
}: CardFadeInProps) {

    const fromX = index % 2 === 0 ? -100 : 100;

    return (
        <motion.div
            initial={{ opacity: 0, x: fromX }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration, delay: index * stagger, ease: "easeOut" }}
            className={clsx(className)}
        >
            {children}
        </motion.div>
    );
}

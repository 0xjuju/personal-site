"use client";

import React from "react";
import { ReactNode } from "react";

import clsx from "clsx";
import { motion, easeOut } from "framer-motion";


type MotionTagName = keyof typeof motion;

interface TitleFadeInProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    as?: MotionTagName;
}


/* Fade in Titles */
export default function TitleFadeIn({
    children,
    delay = 1,
    className = "",
    as = "h1",
}: TitleFadeInProps) {

    const MotionTag = motion[as] as typeof motion.h1;

    return (
        <MotionTag
            className={clsx("text-center", className)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay, duration: 0.5, ease: easeOut }}
        >
            {children}
        </MotionTag>
    );
}

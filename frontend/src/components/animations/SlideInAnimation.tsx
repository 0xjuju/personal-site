"use client";

import { FC, ReactNode } from "react";

import { easeOut, motion } from "framer-motion";


interface SlideInAnimationProps {
    index: number;
    delay?: number;
    children: ReactNode;
}


const SlideInAnimation: FC<SlideInAnimationProps> = ({
    index,
    children,
    delay = 0.15,
}) => {

    const fromX = index % 2 === 0 ? -100 : 100;

    return (
        <motion.div
            initial={{ opacity: 0, x: fromX }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
                duration: 0.6,
                delay: index * delay,
                ease: easeOut,
            }}
        >
            {children}
        </motion.div>
    );
};


export default SlideInAnimation;

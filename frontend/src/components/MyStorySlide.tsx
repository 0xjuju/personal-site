"use client";

import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Comic_Neue } from "next/font/google";
import Lottie, { LottieRefCurrentProps } from "lottie-react";

import GoldenTriangle from "@/components/GoldenTriangle";

import bookAnimation from "@/components/animations/Book.json";
import pageFlipAnimation from "@/components/animations/PageFlip.json";


const comic = Comic_Neue({ weight: ["400", "700"], subsets: ["latin"] });


interface MyStorySlideProps {
    title: string;
    slides: (string | React.ReactNode)[];
    isVisible?: boolean;
    onClose?: () => void;
    className?: string;
    onNextChapter?: () => void;
}


export default function MyStorySlide({
    slides,
    isVisible,
    onClose,
    onNextChapter,
    className = "",
}: MyStorySlideProps) {

    const controlled = typeof isVisible === "boolean";
    const [internalVisible, setInternalVisible] = useState(false);
    const visible = controlled ? isVisible! : internalVisible;

    const END = slides.length;
    const [[index, dir], setIndex] = useState<[number, number]>([0, 0]);

    const paginate = (step: number) =>
        setIndex(([i]) => [(i + step + END + 1) % (END + 1), step]);

    const isEnd = index === END;

    const closeBox = () => {
        if (controlled) onClose?.();
        else setInternalVisible(false);
        setIndex([0, 0]);
    };

    const bookRef = useRef<LottieRefCurrentProps>(null);
    const flipRef = useRef<LottieRefCurrentProps>(null);

    const [isFlipping, setIsFlipping] = useState(false);
    const [flipDir, setFlipDir] = useState<1 | -1>(1);
    const [flipKey, setFlipKey] = useState(0);

    const startDesktopFlip = (direction: 1 | -1) => {
        setFlipDir(direction);
        setIsFlipping(true);
        setFlipKey((k) => k + 1);
    };

    const handleNext = () => {
        if (window.matchMedia("(min-width: 768px)").matches) startDesktopFlip(1);
        paginate(1);
    };

    const handlePrev = () => {
        if (window.matchMedia("(min-width: 768px)").matches) startDesktopFlip(-1);
        paginate(-1);
    };

    const variants = {
        enter: (d: number) => ({ x: d > 0 ? 100 : -100, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit:  (d: number) => ({ x: d > 0 ? -100 : 100, opacity: 0 }),
    };

    const BOX_HEIGHT = "h-[16rem] md:h-[20rem]";

    useEffect(() => {
        if (visible) {
            setIndex([0, 0]);
        }
    }, [slides, visible]);

    const SlideContent = (
        <AnimatePresence custom={dir} mode="wait">
            <motion.div
                key={index}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className={`${comic.className} relative w-full flex items-center justify-center text-center px-6 py-4 text-2xl md:text-3xl leading-relaxed overflow-y-auto`}
            >
                {isEnd ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="font-semibold">The&nbsp;End</div>
                        {onNextChapter && (
                            <button className="btn-cta-hover hover-lift-aura" onClick={onNextChapter}>
                                Next&nbsp;Chapter&nbsp;→
                            </button>
                        )}
                        <Link href="/resume" className="hover-lift block">
                            <span className="btn-cta-hover hover-lift-aura mt-2">
                                Interactive&nbsp;Resume&nbsp;
                            </span>
                        </Link>
                    </div>
                ) : typeof slides[index] === "string" ? (
                    <p>&ldquo;{slides[index]}&rdquo;</p>
                ) : (
                    slides[index]
                )}

                {!isEnd && (
                    <span className="absolute bottom-2 right-4 text-sm text-neutral-400">
                        {index + 1}/{END}
                    </span>
                )}
            </motion.div>
        </AnimatePresence>
    );

    const LeftControl = index === 0 ? (
        <button aria-label="Close" onClick={closeBox} className="hover-lift p-2">
            <X className="h-6 w-6 text-primary-500" />
        </button>
    ) : (
        <button aria-label="Previous" onClick={handlePrev} className="hover-lift p-2">
            <ArrowLeft className="h-6 w-6 text-primary-500" />
        </button>
    );

    const RightControl = isEnd ? (
        <button aria-label="Close" onClick={closeBox} className="hover-lift p-2">
            <X className="h-6 w-6 text-primary-500" />
        </button>
    ) : (
        <button aria-label="Next" onClick={handleNext} className="hover-lift p-2">
            <ArrowRight className="h-6 w-6 text-primary-500" />
        </button>
    );

    return (
        <div className={`flex flex-col items-center ${className}`}>
            {!controlled && !visible && (
                <button onClick={() => setInternalVisible(true)} className="btn-cta-hover mt-4">
                    Read Story
                </button>
            )}

            {!visible && (
                <div className={`mt-6 w-full flex items-center justify-center ${BOX_HEIGHT}`}>
                    <Lottie
                        lottieRef={bookRef}
                        animationData={bookAnimation}
                        loop={false}
                        autoplay
                        renderer="svg"
                        style={{ width: "100%", height: "100%" }}
                        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
                        onComplete={() => {
                            bookRef.current?.pause();
                            setTimeout(() => bookRef.current?.goToAndPlay(0, true), 3000);
                        }}
                    />
                </div>
            )}

            {visible && (
                <div className="relative mt-6 w-full rounded-md border-2 border-primary-500 p-6">
                    <GoldenTriangle orientation="top-right" opacity={0.5} width={112} height={112} />
                    <GoldenTriangle orientation="bottom-left" opacity={0.5} width={112} height={112} />

                    <div className="md:hidden">
                        <div className="flex justify-between mb-2">
                            {LeftControl}
                            {RightControl}
                        </div>
                        <div className={`relative overflow-hidden ${BOX_HEIGHT} flex items-center justify-center`}>
                            {SlideContent}
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        {LeftControl}
                        <div className={`relative flex-1 overflow-hidden ${BOX_HEIGHT} flex items-center justify-center`}>
                            {SlideContent}
                            {isFlipping && (
                                <div className="absolute inset-0 pointer-events-none z-20 opacity-80">
                                    <Lottie
                                        key={flipKey}
                                        lottieRef={flipRef}
                                        animationData={pageFlipAnimation}
                                        autoplay={false}
                                        loop={false}
                                        renderer="svg"
                                        style={{ width: "100%", height: "100%" }}
                                        onDOMLoaded={() => {
                                            if (!flipRef.current) return;
                                            flipRef.current.setDirection(flipDir);
                                            const frames = flipRef.current.getDuration(true) ?? 120;
                                            const start = flipDir === 1 ? 0 : frames;
                                            flipRef.current.goToAndPlay(start, true);
                                        }}
                                        onComplete={() => setIsFlipping(false)}
                                    />
                                </div>
                            )}
                        </div>
                        {RightControl}
                    </div>
                </div>
            )}
        </div>
    );
}

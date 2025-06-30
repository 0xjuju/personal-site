"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { easeOut, motion } from "framer-motion";

import GalleryFrame from "@/components/GalleryFrame";
import TitleFadeIn from "@/components/animations/TitleFadeIn";
import MyStorySlide from "@/components/MyStorySlide";

import type { About } from "@/types/about";


const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.25, delayChildren: 0.1 },
    },
};

const slideIn = (from: "left" | "right") => ({
    hidden: { opacity: 0, x: from === "left" ? -40 : 40 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: easeOut } },
});

const imageVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: easeOut },
    },
};


export default function AboutMeSection({ about }: { about: About }) {

    const [activeStory, setActiveStory] = useState<number | null>(null);

    /* slides recomputed when user picks a story */
    const slides = useMemo<string[]>(() => {
        if (activeStory === null) return [];
        const story = about.stories[activeStory];
        if (!story) return [];
        return story.slides.map(s => s.text);
    }, [activeStory, about]);

    const currentTitle =
        activeStory !== null && about.stories[activeStory]
            ? about.stories[activeStory].title
            : "";

    return (
        <section>
            <TitleFadeIn as="div">
                <h1>About&nbsp;Me</h1>
            </TitleFadeIn>

            <GalleryFrame>

                {/* Top Section Intro */}
                <motion.section
                    className="max-w-6xl mx-auto px-6 hover-lift"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <div className="relative">
                        <motion.div
                            variants={imageVariant}
                            className="hidden md:block float-right w-[220px] h-[220px] rounded-lg overflow-hidden ml-6 mb-4 shrink-0"
                        >
                            <Image
                                src="/images/me.png"
                                alt="Portrait of Jermol"
                                width={220}
                                height={220}
                                className="object-cover object-center opacity-70 grayscale-[15%]"
                                priority
                            />
                        </motion.div>

                        <motion.h2
                            className="text-4xl font-extrabold tracking-tight text-primary-500"
                            variants={slideIn("left")}
                        >
                            {about.top_header}
                        </motion.h2>

                        <motion.div
                            className="leading-relaxed text-lg"
                            variants={slideIn("right")}
                        >
                            {about.top_description.split("\n").map((para, idx) => (
                                <p key={idx}>{para}</p>
                            ))}
                        </motion.div>
                    </div>
                </motion.section>

                <div className="divider" />

                {/* Story Section */}
                <motion.section
                    className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start hover-lift"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6, ease: easeOut }}
                >
                    {/* Column 1 buttons */}
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-primary-500">
                            {about.bottom_header}
                        </h2>
                        <p className="text-base md:text-lg leading-relaxed text-neutral-50">
                            {about.bottom_description}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                            {about.stories.map((story, idx) => (
                                <button
                                    key={idx}
                                    className="btn-cta-hover hover-lift-aura"
                                    onClick={() => setActiveStory(idx)}
                                >
                                    {story.title || `Story ${idx + 1}`}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 Slide viewer */}
                    <MyStorySlide
                        title={currentTitle}
                        slides={slides}
                        isVisible={activeStory !== null}
                        onClose={() => setActiveStory(null)}
                        onNextChapter={
                            activeStory !== null && activeStory < about.stories.length - 1
                                ? () => setActiveStory(activeStory + 1)
                                : undefined
                        }
                    />
                </motion.section>
            </GalleryFrame>
        </section>
    );
}

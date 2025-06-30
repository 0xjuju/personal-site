"use client";

import { useRef, useState } from "react";

import clsx from "clsx";
import { easeOut, motion } from "framer-motion";

import EventCard from "./EventCard";
import ToolTip from "@/components/ToolTip";
import TitleFadeIn from "@/components/animations/TitleFadeIn";
import { usePositions } from "@/hooks/usePositions";

import type { Timeline as TimelineItem } from "@/types/home";


interface TimelineProps {
    events: TimelineItem[];
}


/* stagger‑in container and item variants */
const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easeOut },
    },
};


export default function Timeline({ events }: TimelineProps) {

    const { register } = usePositions(events.length);
    const railRef = useRef<HTMLLIElement>(null);

    const [showMobileTimeline, setShowMobileTimeline] = useState(false);

    const renderEvent = (ev: TimelineItem, i: number, above: boolean) => (
        <ToolTip
            key={ev.title}
            description={ev.summary}
            trigger={<EventCard title={ev.title} date={ev.year_range} isAbove={above} />}
        />
    );

    return (
        <section className="relative overflow-visible">
            <TitleFadeIn as="div" className="title-line mb-6">
                <h1> 10+ Years of Experience </h1>
            </TitleFadeIn>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.95 }}
            >
                {/* Desktop / Tablet */}
                <ul
                    className="hidden sm:grid timeline grid-timeline gap-x-8 px-16"
                    style={{ gridTemplateColumns: `repeat(${events.length}, minmax(0, 1fr))` }}
                >
                    <li ref={railRef} className="timeline-rail" />
                    {events.map((ev, i) => (
                        <motion.li
                            key={ev.title}
                            ref={register(i)}
                            className={clsx(i % 2 === 0 ? "timeline--top" : "timeline--bottom")}
                            style={{ gridColumn: i + 1 }}
                            variants={itemVariants}
                        >
                            {renderEvent(ev, i, i % 2 === 0)}
                        </motion.li>
                    ))}
                </ul>

                {/* Mobile */}
                <div className="sm:hidden">
                    {!showMobileTimeline ? (
                        <button
                            className="btn-cta-hover hover-lift-aura mx-auto block"
                            onClick={() => setShowMobileTimeline(true)}
                        >
                            View Work Timeline&nbsp;→
                        </button>
                    ) : (
                        <div className="relative pl-8">
                            <span className="absolute left-0 top-0 w-px h-full bg-secondary-600" />
                            <p className="text-sm text-neutral-400 mb-4">
                                Tap a dot to reveal details.
                            </p>
                            <div className="flex flex-col gap-8">
                                {events.map((ev, i) => (
                                    <div key={ev.title}>
                                        {renderEvent(ev, i, false)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    );
}

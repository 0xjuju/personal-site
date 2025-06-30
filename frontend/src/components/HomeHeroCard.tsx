"use client";

import { useEffect, useRef } from "react";

import Link from "next/link";

import TitleFadeIn from "@/components/animations/TitleFadeIn";

import type { CTABox } from "@/types/home";



export default function HomeHeroCard({
    title,
    description,
    href,
    href_text = "Learn more",
}: CTABox) {

    const ref = useRef<HTMLAnchorElement>(null);

    /* shine animation */
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const delay = 5000 + Math.random() * 10000;

        const applyShine = () => {
            el.classList.add("shine-active");
            setTimeout(() => el.classList.remove("shine-active"), 1200);
        };

        const interval = setInterval(applyShine, delay);

        return () => clearInterval(interval);
    }, []);

    return (
        <Link
            href={href}
            ref={ref}
            className="hover-lift-aura block h-full max-w-xl mx-auto shine-card"
        >
            <article className="group relative h-full flex flex-col p-8 border border-secondary-600 rounded-lg overflow-hidden">
                <TitleFadeIn>{title}</TitleFadeIn>
                <p className="flex-grow mb-4">{description}</p>
                <span className="btn-cta-hover self-center mt-auto">{href_text}</span>
            </article>
        </Link>
    );
}

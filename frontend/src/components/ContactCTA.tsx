"use client";

import React from "react";

import Image from "next/image";
import Lottie from "lottie-react";
import { motion, easeOut } from "framer-motion";

import downArrow from "@/components/animations/DownArrow.json";
import ContactSection from "@/components/resume/ContactSection";

import type { Contact } from "@/types/contact";


interface ContactCTAProps {
    title: string;
    subtitle?: string;
    contact: Contact;  // single Info object
}


/* Animation variants  */
const imageVariants = {
    hidden: { y: 128, x: -8 },
    show: {
        y: 18,
        transition: { duration: 1.5, ease: easeOut, delay: 1 },
    },
};

const titleVariants = {
    hidden: { opacity: 0, x: -40 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: easeOut },
    },
};

const subtitleVariants = {
    hidden: { opacity: 0, x: 40 },
    show: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: easeOut, delay: 0.1 },
    },
};


export default function ContactCTA({ title, subtitle, contact }: ContactCTAProps) {

    return (
        <section className="my-16 text-center relative overflow-visible">
            <div className="divider" />

            <motion.h1
                variants={titleVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.9 }}
                className="font-extrabold text-primary-500"
            >
                {title}
            </motion.h1>

            {subtitle && (
                <motion.p
                    variants={subtitleVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.9 }}
                >
                    {subtitle}
                </motion.p>
            )}

            <div className="mx-auto w-12 h-12 mb-8">
                <Lottie animationData={downArrow} loop />
            </div>

            {/* contact‑box wrapper */}
            <div id="contact-box" className="relative mx-auto max-w-3xl text-left aura">

                {/* Pop‑up image behind the box */}
                <motion.div
                    className="absolute -right-6 bottom-full z-[-1]"
                    variants={imageVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.9 }}
                >
                    <Image
                        src="/images/me_thumbs.png"
                        alt="Thumbs up from Jermol"
                        width={160}
                        height={160}
                        className="rounded-full shadow-lg"
                        priority
                    />
                </motion.div>

                {/* bring content above the popped image */}
                <div className="relative z-10">
                    <ContactSection contact={contact} />
                </div>
            </div>
        </section>
    );
}

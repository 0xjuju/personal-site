"use client";

import React from "react";

import {
    Calendar,
    Download,
    Github,
    Globe,
    Linkedin,
    Mail,
    MapPin,
} from "lucide-react";

import { SectionCard } from "./ResumeCard";

import type { Contact } from "@/types/contact";


interface ContactSectionProps {
    contact: Contact;
}


const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {

    const contacts = [
        {
            Icon: Mail,
            label: contact.email,
            href: contact.email ? `mailto:${contact.email}` : undefined,
        },
        {
            Icon: Linkedin,
            label: "LinkedIn",
            href: contact.linked_in || undefined,
        },
        {
            Icon: Calendar,
            label: "Calendly",
            href: contact.calendly || undefined,
        },
        {
            Icon: Github,
            label: "GitHub",
            href: contact.github || undefined,
        },
        {
            Icon: MapPin,
            label: contact.location,
        },
        {
            Icon: Globe,
            label: contact.citizenship,
        },
        {
            Icon: Download,
            label: "Download Resume (PDF)",
            href: contact.resume_download || undefined,
            download: true,
        },
    ];

    return (
        <div className="hover-lift-aura bg-[var(--color-neutral-900)]">
            <SectionCard>
                <h2>Contact &amp; Info</h2>
                <ul className="contact-list">
                    {contacts.map(({ Icon, label, href, download }) => (
                        <li key={label} className="contact-item">
                            <Icon className="icon-accent flex-shrink-0 mt-0.5 sm:mt-0" size={18} />
                            {href ? (
                                <a
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                                    className="text-responsive break-all md:break-normal"
                                    {...(download ? { download: true } : {})}
                                >
                                    {label}
                                </a>
                            ) : (
                                <span className="text-responsive break-all md:break-normal">
                                    {label}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </SectionCard>
        </div>
    );
};


export default ContactSection;

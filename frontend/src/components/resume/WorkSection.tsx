"use client";

import React, { MouseEvent, useState } from "react";

import clsx from "clsx";
import { ExternalLink } from "lucide-react";

import SuperModal from "@/components/SuperModal";

import type { WorkSegment } from "@/types/resume";


interface WorkSectionProps {
    segment: WorkSegment;
}


const WorkSection: React.FC<WorkSectionProps> = ({ segment }) => {

    const {
        company,
        href: website,
        title,
        work_range: years,
        location,
        work_type: type,
        summary,
        bullet_1,
        bullet_2,
        bullet_3,
        more_bullets = [],
        button_text,
    } = segment;

    /* bullets array */
    const bullets = [bullet_1 ?? "", bullet_2 ?? "", bullet_3 ?? ""].filter(Boolean);

    /* modal bullets */
    const modalContent = (
        <>
            <h3>{company} – Skills Used</h3>
            {more_bullets.length ? (
                <ul className="list-disc list-outside pl-5 space-y-1 mt-2">
                    {more_bullets.map((b) => (
                        <li key={b.id}>{b.bullet}</li>
                    ))}
                </ul>
            ) : (
                <p>No additional bullets</p>
            )}
        </>
    );

    /* state */
    const [isOpen, setIsOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleCardClick = (e: MouseEvent<HTMLDivElement>) => {
        if (window.innerWidth >= 640) return; // sm breakpoint
        if ((e.target as HTMLElement).closest("button,a")) return;
        setExpanded((prev) => !prev);
    };

    return (
        <div className="hover-lift group">
            <article onClick={handleCardClick} className="card space-y-4 p-6">

                {/* header */}
                <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="text-primary-500">{company}</h4>
                            {website && (
                                <a
                                    href={website}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-accent-500 hover:text-accent-400"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                        <h4 className="font-semibold">{title}</h4>
                    </div>

                    <div className="work-meta flex flex-wrap gap-x-2 md:block md:mt-0">
                        <p>{years}</p>
                        <p>{location}</p>
                        <p className="italic">{type}</p>
                    </div>
                </header>

                {/* body */}
                <div>
                    <p className={clsx(!expanded && "line-clamp-4 md:line-clamp-none")}>
                        {summary}
                    </p>

                    {!expanded && (
                        <div className="mt-2 sm:hidden">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setExpanded(true);
                                }}
                                className="text-primary-500 text-sm underline hover:text-primary-400"
                            >
                                View More..
                            </button>
                        </div>
                    )}

                    <ul
                        className={clsx(
                            "list-disc list-outside pl-5 space-y-1 mt-2",
                            !expanded && "hidden sm:block"
                        )}
                    >
                        {bullets.map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>

                    {/* skills button */}
                    <div
                        className={clsx(
                            "flex justify-end mt-4",
                            !expanded && "hidden sm:flex"
                        )}
                    >
                        <button onClick={() => setIsOpen(true)} className="btn-cta mr-4">
                            {button_text || "Skills Used"}
                        </button>
                    </div>
                </div>
            </article>

            <SuperModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                {modalContent}
            </SuperModal>
        </div>
    );
};


export default WorkSection;

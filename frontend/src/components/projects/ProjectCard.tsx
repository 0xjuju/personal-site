"use client";

import Link from "next/link";
import { ElementType, FC } from "react";

import clsx from "clsx";
import { ExternalLink } from "lucide-react";


export interface Project {
    id: number;
    title: string;
    href: string;
    href_name: string;
    description: string;
    order: number;
}


interface ProjectCardExtras {
    tech?: string[];
    reversed?: boolean;
}


type ProjectCardProps = Project & ProjectCardExtras;


const ProjectCard: FC<ProjectCardProps> = ({
    title,
    description,
    href,
    href_name,
    tech = [],
    reversed = false,
}) => {

    /* link wrapper */
    const Wrapper: ElementType = href ? Link : "div";

    const wrapperProps = href
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : {};

    /* triangle overlay */
    const bigTriangle = clsx(
        "pointer-events-none absolute w-40 h-40 opacity-50 bg-[var(--color-primary-500)]",
        reversed
            ? "-top-1 -left-1 [clip-path:polygon(0_0,100%_0,0_100%)]"
            : "-top-1 -right-1 [clip-path:polygon(100%_0,0_0,100%_100%)]"
    );

    const smallTriangle = clsx(
        "pointer-events-none absolute w-24 h-24 opacity-50 bg-[var(--color-primary-500)]",
        reversed
            ? "-bottom-1 -right-1 [clip-path:polygon(100%_0,100%_100%,0_100%)]"
            : "-bottom-1 -left-1 [clip-path:polygon(0_100%,0_0,100%_100%)]"
    );

    return (
        <Wrapper {...wrapperProps} className="hover-lift-aura block">
            <article
                className={clsx(
                    "relative overflow-hidden card bg-transparent p-6 flex flex-col gap-3",
                    reversed && "items-end text-right"
                )}
            >
                {/* Golden triangles */}
                <span className={bigTriangle} />
                <span className={smallTriangle} />

                {/* header */}
                <div className="flex flex-col gap-0.5">
                    <h3>{title}</h3>

                    {href && (
                        <span className="flex items-center gap-1 text-accent-500 text-sm underline">
                            <ExternalLink className="w-4 h-4" />
                            {href_name}
                        </span>
                    )}
                </div>

                {/* description */}
                <p className="text-responsive mt-1">{description}</p>

                {/* project list */}
                {tech.length > 0 && (
                    <ul className="skills-list mt-2">
                        {tech.map((t) => (
                            <li key={t} className="skill-item">
                                {t}
                            </li>
                        ))}
                    </ul>
                )}
            </article>
        </Wrapper>
    );
};


export default ProjectCard;

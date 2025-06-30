"use client";

import { FC } from "react";

import TitleFadeIn from "@/components/animations/TitleFadeIn";
import ProjectCard from "@/components/projects/ProjectCard";
import SlideInAnimation from "@/components/animations/SlideInAnimation";
import type { Project } from "@/types/project";


interface ProjectsLayoutProps {
    projects: Project[];
    titleDelay?: number;
}


const ProjectsLayout: FC<ProjectsLayoutProps> = ({
    projects,
    titleDelay = 1,
}) => (
    <section className="max-w-6xl mx-auto px-4 md:px-8">

        <TitleFadeIn delay={titleDelay}>Ongoing Projects</TitleFadeIn>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {projects.map((project, i) => {

                return (
                    <SlideInAnimation key={i} index={i}>
                        <ProjectCard {...project} reversed={i % 2 === 1} />
                    </SlideInAnimation>
                );
            })}
        </div>
    </section>
);


export default ProjectsLayout;

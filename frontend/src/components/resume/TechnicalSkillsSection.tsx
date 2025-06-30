"use client";

import React, { useState } from "react";

import { SectionCard } from "@/components/resume/ResumeCard";
import SuperModal from "@/components/SuperModal";
import ToolTip from "@/components/ToolTip";

import type { Skill } from "@/types/resume";


interface TechnicalSkillsSectionProps {
    skills: Skill[];
}


const TechnicalSkillsSection: React.FC<TechnicalSkillsSectionProps> = ({ skills }) => {


    const topSkills = skills
        .filter((s) => s.featured)
        .map((s) => ({
            name: s.name,
            bullets: s.skills_expanded.map((d) => d.value),
        }));

    const allSkills = skills
        .filter((s) => !s.featured)
        .map((s) => s.name);

    /* UI state  */
    const [isAllOpen, setIsAllOpen] = useState(false);
    const [selected, setSelected] = useState<{
        name: string;
        bullets: string[];
    } | null>(null);


    return (
        <>
            <div className="hover-lift-aura">
                <SectionCard>
                    <h2>Featured Skills</h2>

                    <p className="text-sm text-neutral-400 -mt-2 mb-4">
                        click on a skill to see how I used it
                    </p>

                    <ul className="skills-list mb-6">
                        {topSkills.map(({ name, bullets }) => (
                            <li key={name} className="skill-item">
                                <ToolTip
                                    trigger={
                                        <span
                                            className="hover-target cursor-pointer"
                                            onClick={() => setSelected({ name, bullets })}
                                        >
                                            {name}
                                        </span>
                                    }
                                    description={
                                        <ul className="list-disc list-inside space-y-1 text-left">
                                            {bullets.map((b, i) => (
                                                <li key={i}>{b}</li>
                                            ))}
                                        </ul>
                                    }
                                />
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-end">
                        <button onClick={() => setIsAllOpen(true)} className="btn-cta">
                            All Skills
                        </button>
                    </div>
                </SectionCard>
            </div>

            {/* per‑skill modal */}
            <SuperModal isOpen={!!selected} onClose={() => setSelected(null)}>
                {selected && (
                    <>
                        <h2 className="">{selected.name}</h2>
                        <ul className="list-disc">
                            {selected.bullets.map((b, i) => (
                                <li key={i}>{b}</li>
                            ))}
                        </ul>
                    </>
                )}
            </SuperModal>

            {/* expanded “All Skills” modal */}
            <SuperModal isOpen={isAllOpen} onClose={() => setIsAllOpen(false)}>
                <h2>All Technical Skills</h2>
                <ul className="columns-1 sm:columns-2 md:columns-3 gap-4 list-disc list-inside">
                    {allSkills.map((skill) => (
                        <li key={skill} className="mb-2">
                            {skill}
                        </li>
                    ))}
                </ul>
            </SuperModal>
        </>
    );
};


export default TechnicalSkillsSection;

"use client";

import React from "react";

import { SectionCard } from "@/components/resume/ResumeCard";
import WorkSection from "@/components/resume/WorkSection";

import type { WorkSegment } from "@/types/resume";


interface WorkHistorySectionProps {
    workSegments: WorkSegment[];
}


export default function WorkHistorySection({ workSegments }: WorkHistorySectionProps) {

    return (
        <div className="hover-lift-aura">
            <SectionCard>
                <h2 className="">Work Experience</h2>
                <div className="space-y-6">
                    {workSegments.map((segment, i) => (
                        <WorkSection key={i} segment={segment} />
                    ))}
                </div>
            </SectionCard>
        </div>
    );
}

import React from "react";

import ContactCTA from "@/components/ContactCTA";
import GoldenTriangle from "@/components/GoldenTriangle";
import SlideInAnimation from "@/components/animations/SlideInAnimation";
import TitleFadeIn from "@/components/animations/TitleFadeIn";
import ContactSection from "@/components/resume/ContactSection";
import ProfessionalSummarySection from "@/components/resume/ProfessionalSummarySection";
import TechnicalSkillsSection from "@/components/resume/TechnicalSkillsSection";
import WorkHistorySection from "@/components/resume/WorkHistorySection";
import { getContact, getResume } from "@/lib/apiCall";


export default async function ResumePage() {

    const resume = await getResume();
    const contactInfo = await getContact();

    const blocks = [
        <ContactSection key="contact" contact={contactInfo} />,

        <ProfessionalSummarySection
            key="summary"
            title={resume.summary_header}
            summary={resume.summary}
        />,

        <TechnicalSkillsSection key="skills" skills={resume.skills} />,
        <WorkHistorySection key="work" workSegments={resume.work_segments} />,

        <ContactCTA
            key="cta"
            contact={contactInfo}
            title="Connect With Me"
            subtitle="Let’s explore how I can support your goals—reach out or book a call below."
        />,
    ];

    return (
        <>
            <TitleFadeIn> {resume.title} </TitleFadeIn>
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="relative border-[var(--color-primary-500)] card max-w-4xl w-full space-y-8 p-8">

                    <GoldenTriangle
                        orientation="top-right"
                        opacity={0.50}
                        width={112}
                        height={112}
                    />

                    {blocks.map((block, i) => (
                        <SlideInAnimation key={i} index={i}>
                            {block}
                            <div className="divider" />
                        </SlideInAnimation>
                    ))}
                </div>
            </div>
        </>
    );
}

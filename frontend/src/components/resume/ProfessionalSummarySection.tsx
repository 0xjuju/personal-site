"use client";

import { FC } from "react";
import { SectionCard } from "./ResumeCard";

interface ProfessionalSummarySectionProps {
  title: string;
  summary: string;
}

const ProfessionalSummarySection: FC<ProfessionalSummarySectionProps> = ({
  title,
  summary,
}) => (
    <div className="hover-lift-aura">
        <SectionCard>
            <h2 className="">{title}</h2>
            <p className="">{summary}</p>
        </SectionCard>
    </div>

);

export default ProfessionalSummarySection;


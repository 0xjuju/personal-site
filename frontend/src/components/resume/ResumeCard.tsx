import * as React from "react";
import type { ReactNode } from "react";

import clsx from "clsx";


interface ResumeCardProps {
    title?: string;
    children: React.ReactNode;
    className?: string;
}

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

interface SectionCardProps {
    children: ReactNode;
}


export function CardContent({ children, className }: CardContentProps) {
    return (
        <div className={clsx("px-4 py-2 md:p-4", className)}>
            {children}
        </div>
    );
}


export function SectionCard({ children }: SectionCardProps) {
    return (
        <div className="w-full md:card md:rounded-xl md:p-6 overflow-visible">
            {children}
        </div>
    );
}



export default function ResumeCard({ title, children }: ResumeCardProps) {
    return (
        <SectionCard>
            <h2 className="text-center">{title}</h2>
            <CardContent className="divide-y divide-neutral-700/60 [&>*]:py-5">
                {children}
            </CardContent>
        </SectionCard>
    );
}

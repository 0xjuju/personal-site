"use client";

import { ReactNode, useId } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

import "react-tooltip/dist/react-tooltip.css";


interface TooltipWithPortal extends React.ComponentProps<typeof ReactTooltip> {
    rootId?: string;
}

interface ToolTipProps {
    trigger: ReactNode;
    description: string | ReactNode;
    className?: string;
}


export default function ToolTip({
    trigger,
    description,
    className = "",
}: ToolTipProps) {

    const id = useId();
    const Tooltip = ReactTooltip as React.FC<TooltipWithPortal>;

    return (
        <span className={className} data-tooltip-id={id}>
            {trigger}

            <Tooltip
                id={id}
                rootId="tooltip-root" /* portal target */
                positionStrategy="fixed"
                className="aura !rounded-md !px-3 !py-2 !text-sm max-w-xs
                           !bg-[var(--color-neutral-900)] !z-[99999]"
                render={() =>
                    typeof description === "string" ? (
                        description
                    ) : (
                        <div className="text-left">{description}</div>
                    )
                }
                style={{
                    backgroundColor: "var(--color-neutral-900)",
                    backdropFilter: "none",
                    "--rt-opacity": "1",
                } as React.CSSProperties}
            />
        </span>
    );
}

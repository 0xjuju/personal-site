"use client";

import React, { MouseEvent, ReactNode, useEffect, useState } from "react";

import { createPortal } from "react-dom";
import { X } from "lucide-react";


export interface SuperModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}


export default function SuperModal({
    isOpen,
    onClose,
    children,
}: SuperModalProps) {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !mounted) return null;

    const handleContentClick = (e: MouseEvent) => e.stopPropagation();

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={onClose}
        >
            <div className="aura pulsate p-1 rounded-lg">
                <div
                    className="card relative bg-neutral-900/60 backdrop-blur-xl border-neutral-800 shadow-lg
                               max-w-3xl w-[90vw] max-h-[90vh] overflow-y-auto"
                    onClick={handleContentClick}
                >
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="absolute top-4 right-4 text-neutral-50 hover:text-accent-500"
                    >
                        <X size={24} />
                    </button>

                    <div className="mt-6 px-4 pb-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

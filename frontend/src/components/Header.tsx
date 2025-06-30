"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import LinkHover from "@/components/animations/LinkHoverAnimation";


const Item = ({
    href,
    children,
    className = "",
    onClick,
}: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}) => (
    <Link
        href={href}
        className={`hover-target ${className}`}
        onClick={onClick}
    >
        {children}
    </Link>
);


export default function Navbar() {

    const [mobileOpen, setMobileOpen] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 aura backdrop-blur-md bg-neutral-900/60">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <Link
                    href="/"
                    className="text-primary-500 font-bold text-2xl hover-target"
                >
                    <h4 className="">Jermol Jupiter Jr. – Software Engineer</h4>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-6">
                    <LinkHover href="/home">Home</LinkHover>
                    <LinkHover href="/resume">Resume</LinkHover>
                    <LinkHover href="/projects">Projects</LinkHover>
                    <LinkHover href="/about">About</LinkHover>
                    <LinkHover href="/contact">Contact</LinkHover>
                </div>

                {/* Mobile Burger */}
                <button
                    onClick={() => setMobileOpen((o) => !o)}
                    className="md:hidden hover-target"
                >
                    {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </button>
            </div>

            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="md:hidden mobile-nav">
                    <Item href="/home" className="mobile-nav__item">Home</Item>
                    <Item href="/resume" className="mobile-nav__item">Resume</Item>
                    <Item href="/projects" className="mobile-nav__item">Projects</Item>
                    <Item href="/about" className="mobile-nav__item">About</Item>
                    <Item href="/contact" className="mobile-nav__item">Contact</Item>
                </div>
            )}
        </nav>
    );
}

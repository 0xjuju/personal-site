import "@/styles/globals.css";

import { ReactNode } from "react";
import Script from "next/script";
import type { Metadata } from "next";

import Header from "@/components/Header";
import { fontDisplay, fontSans } from "@/styles/fonts";


export const dynamic = "force-dynamic";


/* SEO / Metadata */
export const viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: {
        default: "Jermol Jupiter",
        template: "%s | Jermol Jupiter",
    },
    description:
        "Portfolio of Jermol Jupiter Jr.—full-stack engineer specializing in AI, distributed systems, and cloud-native solutions.",
    keywords: [
        "Jermol Jupiter",
        "Jermol Jupiter Jr.",
        "Jermol Lamont Jupiter Jr.",
        "software engineer",
        "AI architect",
        "AWS",
        "React",
        "Django",
        "blockchain",
        "FastAPI",
        "Large Language Models",
        "Machine Learning"
    ],
    authors: [{ name: "Jermol Jupiter Jr.", url: "https://jermol.dev" }],
    creator: "Jermol Jupiter Jr.",
    metadataBase: new URL("https://jermol.dev"),
    robots: { index: true, follow: true },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://jermol.dev",
        title: "Jermol Jupiter – Software Engineer & AI Architect",
        description:
            "Explore projects, articles, and insights from Jermol Jupiter Jr., a full-stack engineer focused on AI, cloud, and blockchain.",
        siteName: "Jermol Jupiter",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Jermol Jupiter – Software Engineer & AI Architect",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        creator: "@jermoljupiter",
        title: "Jermol Jupiter – Software Engineer & AI Architect",
        description:
            "Portfolio of Jermol Jupiter Jr.—building AI-powered products on AWS, Django, and React.",
        images: ["/og-image.jpg"],
    },
    icons: {
        icon: "/favicon.ico",
    },
};


/* ROOT */
export default async function RootLayout({ children }: { children: ReactNode }) {

    return (
        <html
            lang="en"
            className={`${fontSans.variable} ${fontDisplay.variable} antialiased overflow-x-hidden`}
        >
            <body className="font-sans min-h-screen flex flex-col overflow-x-hidden text-secondary-50">

                {/* Skip link for accessibility */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only absolute top-0 left-0 m-2 rounded bg-primary-500 px-4 py-2"
                >
                    Skip to content
                </a>

                <Header />

                <main id="main-content" className="flex-1 pt-24">
                    {children}
                </main>

                {/* Portal target for tooltips */}
                <div id="tooltip-root" />

                {/* Structured data for SEO */}
                <Script
                    id="structured-data"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Person",
                            name: "Jermol Jupiter Jr.",
                            url: "https://jermol.dev",
                            sameAs: [
                                "https://github.com/0xjuju",
                                "https://linkedin.com/in/jermol-jupiter-jr-332010178",
                            ],
                            jobTitle: "Software Engineer",
                            worksFor: {
                                "@type": "Organization",
                                name: "Adaptify Talent",
                            },
                        }),
                    }}
                />
            </body>
        </html>
    );
}

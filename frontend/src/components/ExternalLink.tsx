"use client";

import Link, { LinkProps } from "next/link";
import { ComponentPropsWithoutRef } from "react";


export default function ExternalWebLink(
    props: LinkProps & ComponentPropsWithoutRef<"a">
) {

    const { children, ...rest } = props;

    return (
        <Link
            {...rest}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-target"
        >
            {children}
        </Link>
    );
}

import type { MetadataRoute } from "next";


const site = "https://jermol.dev";


export default function sitemap(): MetadataRoute.Sitemap {

    const lastMod = new Date().toISOString();

    return [
        { url: site, lastModified: lastMod },
        { url: `${site}/projects`, lastModified: lastMod },
        { url: `${site}/about`, lastModified: lastMod },
        { url: `${site}/contact`, lastModified: lastMod },
        { url: `${site}/home`, lastModified: lastMod },
        { url: `${site}/resume`, lastModified: lastMod },
    ];
}

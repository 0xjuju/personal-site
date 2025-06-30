export const dynamic = "force-static";


export function GET() {

    const content = `User-agent: *
Allow: /

Sitemap: https://jermol.dev/sitemap.xml
`;

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain",
            "Content-Disposition": 'inline; filename="robots.txt"',
        },
    });
}

import CardFadeIn from "@/components/animations/CardFadeIn";
import ContactCTA from "@/components/ContactCTA";
import GalleryFrame from "@/components/GalleryFrame";
import HomeHeroCard from "@/components/HomeHeroCard";
import Timeline from "@/components/Timeline";
import { getContact, getHome } from "@/lib/apiCall";


export default async function HomePage() {

    const home = await getHome();
    const contactInfo = await getContact();

    return (
        <>
            {/* Row 1 – Hero gallery */}
            <section className="py-12">
                <GalleryFrame>
                    <div className="flex flex-row gap-6 md:gap-8 justify-center flex-wrap md:flex-nowrap text-center
                        divide-y divide-primary-500/30 md:divide-y-0" >

                        {home.cta.map((card, i) => (
                            <CardFadeIn key={card.title} index={i}>
                                <HomeHeroCard {...card} />
                            </CardFadeIn>
                        ))}
                    </div>
                </GalleryFrame>
            </section>

            {/* Row 2 – Timeline */}
            <section className="py-16">
                <Timeline events={home.timeline} />
            </section>

            {/* Row 3 – Contact CTA */}
            <section id="contact" className="py-16">
                <ContactCTA
                    contact={contactInfo}
                    title="Let's Connect"
                    subtitle="Send a message or schedule a meeting. Let's collaborate"
                />
            </section>
        </>
    );
}

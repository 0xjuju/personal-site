import ContactCTA from "@/components/ContactCTA";
import GlobeBackgroundWrapper from "@/components/animations/GlobeBackgroundWrapper";
import GoldenTriangle from "@/components/GoldenTriangle";
import TitleFadeIn from "@/components/animations/TitleFadeIn";
import { getContact } from "@/lib/apiCall";



export default async function ContactPage() {

    const contactInfo = await getContact();

    return (
        <div>
            <GlobeBackgroundWrapper />
            <TitleFadeIn as="div">
                <h1>Contact&nbsp;Info</h1>
            </TitleFadeIn>

            <section className="flex items-center justify-center py-12">
                <div className="relative hover-lift-aura card max-w-3xl w-full p-8 text-center bg-transparent">

                    <GoldenTriangle width={112} height={112} orientation="top-right" opacity={0.50} />
                    <GoldenTriangle width={224} height={224} orientation="bottom-left" opacity={0.50} />

                    <ContactCTA
                        contact={contactInfo}
                        title="Let's Work Together"
                        subtitle="I'd love to connect with you. Schedule a meeting or send me a message!"
                    />

                </div>
            </section>
        </div>
    );
}

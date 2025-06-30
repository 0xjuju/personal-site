import AboutMeSection from "@/components/AboutMeSection";
import ContactCTA from "@/components/ContactCTA";
import { getAbout, getContact } from "@/lib/apiCall";


export default async function AboutMe() {

    const about = await getAbout();
    const contactInfo = await getContact();

    return (
        <>
            <section>
                <AboutMeSection about={about} />
            </section>

            <section className="pt-24">
                <ContactCTA
                    contact={contactInfo}
                    title="Send me a message!"
                    subtitle="I'd love to connect with you"
                />
            </section>
        </>
    );
}

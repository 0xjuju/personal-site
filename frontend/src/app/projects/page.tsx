import ContactCTA from "@/components/ContactCTA";
import ProjectsLayout from "@/components/projects/ProjectsLayout";
import { getContact, getProjects } from "@/lib/apiCall";


export default async function ProjectsPage() {

    const projects = await getProjects();
    const contactInfo = await getContact();

    return (
        <>
            <ProjectsLayout projects={projects} />

            <ContactCTA
                contact={contactInfo}
                title="Let's Connect"
                subtitle="Send me a message to discuss an ongoing project!"
            />
        </>
    );
}

import { apiFetch } from "@/lib/api";
import { API_ENDPOINTS, REVALIDATION } from "@/lib/config";

import type { About } from "@/types/about";
import type { Contact } from "@/types/contact";
import type { Home } from "@/types/home";
import type { Project } from "@/types/project";
import type { Resume } from "@/types/resume";


async function apiCall<T>(path: string): Promise<T> {
    return apiFetch<T>(path, {
        cache: "force-cache",
        nextOpts: { revalidate: REVALIDATION },
    });
}


export const getAbout = ()    => apiCall<About>(API_ENDPOINTS.about);
export const getProjects = () => apiCall<Project[]>(API_ENDPOINTS.projects);
export const getResume = ()   => apiCall<Resume>(API_ENDPOINTS.resume);
export const getHome = ()     => apiCall<Home>(API_ENDPOINTS.home);
export const getContact = ()  => apiCall<Contact>(API_ENDPOINTS.contact);


export interface CTABox {
    id: number;
    title: string;
    description: string;
    href: string;
    href_text: string;
    order: number;
}

export interface Timeline {
    id: number;
    title: string;
    year_range: string;
    summary: string;
    order: number;
}


export interface Home {
  cta: CTABox[];
  timeline: Timeline[];
}

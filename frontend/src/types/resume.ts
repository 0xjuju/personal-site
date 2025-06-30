
export enum WorkType {
  HYBRID = "Hybrid",
  REMOTE = "Remote",
  ONSITE = "Onsite",
}


export interface SkillDescription {
  id?: number;
  value: string;
  order: number;
  skill_id: number;
}

export interface WorkSegmentExpansion {
  id?: number;
  bullet: string;
  order: number;
  work_segment_id: number;
}


export interface Skill {
  id?: number;
  name: string;
  featured: boolean;
  order: number;
  resume_id: number;
  skills_expanded: SkillDescription[];
}

export interface WorkSegment {
  id?: number;
  company: string;
  href: string;
  title: string;
  work_range: string;
  location: string;
  work_type: WorkType;
  summary: string;
  bullet_1: string;
  bullet_2: string;
  bullet_3: string;
  order: number;
  button_text: string;
  resume_id: number;
  more_bullets: WorkSegmentExpansion[];
}

export interface Resume {
  id?: number;
  title: string;
  summary_header: string;
  summary: string;
  skills_header: string;
  work_header: string;
  skills: Skill[];
  work_segments: WorkSegment[];
}





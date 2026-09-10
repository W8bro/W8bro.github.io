// Data loader for the kept design-prototype variant (issue #10). Not part of the Site —
// src/components/cv-page.astro loads its own data. This exists only so
// variant-c9-guard.astro still type-checks and can be mounted for reference.
import { getCollection } from 'astro:content';
import { about, type About } from '../../data/about';
import { skills, type SkillCategory } from '../../data/skills';

export interface CVData {
    about: About;
    skills: SkillCategory[];
    experience: Awaited<ReturnType<typeof getCollection<'experience'>>>;
    projects: Awaited<ReturnType<typeof getCollection<'projects'>>>;
    featured: Awaited<ReturnType<typeof getCollection<'projects'>>>;
    education: Awaited<ReturnType<typeof getCollection<'education'>>>;
    publications: Awaited<ReturnType<typeof getCollection<'publications'>>>;
}

export async function loadCVData(): Promise<CVData> {
    const experience = await getCollection('experience');
    experience.sort((a, b) => b.data.startDate.localeCompare(a.data.startDate));

    const projects = await getCollection('projects');
    projects.sort((a, b) => b.data.startDate.localeCompare(a.data.startDate));

    const education = await getCollection('education');
    education.sort((a, b) => b.data.startDate.localeCompare(a.data.startDate));

    const publications = await getCollection('publications');
    publications.sort((a, b) => b.data.year - a.data.year);

    return {
        about,
        skills,
        experience,
        projects,
        featured: projects.filter((p) => p.data.featured),
        education,
        publications,
    };
}

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const educationCollection = defineCollection({
    loader: glob({ base: './src/content/education', pattern: '**/*.{yaml,yml}'}),
    schema: z.object({
        institution: z.string(),
        degree: z.string(),
        field: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        description: z.string().optional(),
    })
})

const experienceCollection = defineCollection({
    loader: glob({ base: './src/content/experience', pattern: '**/*.{yaml,yml}'}),
    schema: z.object({
        company: z.string(),
        role: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        location: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional()
    })
})

const projectCollection = defineCollection({
    loader: glob({ base: './src/content/projects', pattern: '**/*.{yaml,yml}'}),
    schema: z.object({
        title: z.string(),
        client: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        location: z.string(),
        featured: z.boolean(),
        description: z.string(),
        tags: z.array(z.string()),
    })
})

const publicationCollection = defineCollection({
    loader: glob({ base: './src/content/publications', pattern: '**/*.{yaml,yml}'}),
    schema: z.object({
        title: z.string(),
        venue: z.string(),
        year: z.number(),
        url: z.url(),
    })
})

export const collections = { 
    education: educationCollection, 
    experience: experienceCollection, 
    projects: projectCollection, 
    publications: publicationCollection 
};
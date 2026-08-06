import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const career = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/career' }),
    schema: ({ image }) =>
        z.object({
            image: image(),
            url: z.string(),
            title: z.string(),
            time: z.string(),
            description: z.string(),
            stack: z.array(z.string()),
        }),
});

const projects = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
    schema: ({ image }) =>
        z.object({
            image: image(),
            title: z.string(),
            description: z.string(),
            stack: z.array(z.string()),
            href: z.string(),
            url: z.string(),
        }),
});

export const collections = { career, projects };

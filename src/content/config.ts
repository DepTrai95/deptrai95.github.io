import { defineCollection, z } from 'astro:content';

const careerCollection = defineCollection({
   type: 'content',
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

const projectsCollection = defineCollection({
   type: 'content',
   schema: ({ image }) =>
      z.object({
         image: image(),
         title: z.string(),
         description: z.string(),
         stack: z.array(z.string()),
         href: z.string(),
      }),
});

export const collections = {
   career: careerCollection,
   projects: projectsCollection,
}; 
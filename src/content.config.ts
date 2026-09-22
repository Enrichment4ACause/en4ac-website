import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One markdown file in src/content/blog is one post.
// cover is a site path such as /images/blog/photo.jpg. Leave it blank for a gradient.
// Set draft: true to hide a post.
const cover = z
  .union([z.string(), z.null()])
  .optional()
  .transform((value) => {
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  });

const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: ['**/*.md', '!**/EXAMPLE.md', '!**/_*.md'],
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string().optional(),
    cover,
    draft: z.boolean().optional(),
  }),
});

export const collections = { blog };

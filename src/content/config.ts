import { defineCollection, z } from "astro:content";

const products = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    tagline: z.string().optional(),
    image: z.string().optional(),
    price: z.string().optional(),
    features: z.array(z.string()),
    ctaLabel: z.string().optional(),
    ctaLink: z.string().optional(),
    category: z.enum(["edition", "app", "ai"]),
    downloads: z.object({
      mac: z.string(),
      windows: z.string(),
      linux: z.string(),
    }),
  }),
});

export const collections = {
  products,
};

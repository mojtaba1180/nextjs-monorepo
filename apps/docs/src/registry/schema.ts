import { z } from "zod"

export const registryItemFileSchema = z.object({
  name: z.string(),
  content: z.string(),
  path: z.string().optional(),
  type: z.enum([
    "registry:ui",
    "registry:component", 
    "registry:example",
    "registry:block",
    "registry:page",
    "registry:hook",
    "registry:lib"
  ]).optional(),
  target: z.string().optional(),
})

export const registryItemSchema = z.object({
  name: z.string(),
  type: z.enum([
    "registry:ui",
    "registry:component",
    "registry:example", 
    "registry:block",
    "registry:page",
    "registry:hook",
    "registry:lib"
  ]).optional(),
  files: z.array(registryItemFileSchema),
  dependencies: z.array(z.string()).optional(),
  registryDependencies: z.array(z.string()).optional(),
  component: z.any().optional(),
})

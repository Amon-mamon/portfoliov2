import { z } from 'zod'



export const projectSchema = z.object({
    project_title: z.string(),
    project_description: z.string(),
    project_type: z.string(),
    project_stack:z.string(),
    // project_image: z.string,
    // project_images: z.string,
    // live_url: z.string(),
    // is_active: z.string()
})

export type ProjectFormValues = z.infer<typeof projectSchema>

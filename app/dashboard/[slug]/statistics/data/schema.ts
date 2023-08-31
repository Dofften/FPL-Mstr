import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  Player: z.string(),
  Cost: z.string(),
  selectedBy: z.string(),
  Top15: z.string(),
  Form: z.string(),
  Pts: z.string(),
})

export type Task = z.infer<typeof taskSchema>

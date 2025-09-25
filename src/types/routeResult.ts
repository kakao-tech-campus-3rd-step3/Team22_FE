import { z } from 'zod'

export const walkingResultSchema = z.object({
  distance: z.number().min(0),
  route: z.array(
    z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  ),
  time: z.number().int().min(0),
})

export type WalkingResultState = z.infer<typeof walkingResultSchema>

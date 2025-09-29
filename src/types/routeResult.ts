import { z } from 'zod'

export const walkingResultSchema = z.object({
  totalDistance_m: z.number().min(0),
  path: z.array(
    z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  ),
  walkingTime_sec: z.number().int().min(0),
})

export type WalkingResultState = z.infer<typeof walkingResultSchema>

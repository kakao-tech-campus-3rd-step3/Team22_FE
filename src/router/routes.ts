import { createRouter } from '@tanstack/react-router'
import { Route as rootRoute } from '@/routes/__root'
import { Route as locationSettingRoute } from '@/routes/location-setting'
import { Route as addNewPetRoute } from '@/routes/add-new-pet'
import { Route as walkTimeSettingRoute } from '@/routes/walk-time-setting'

export const routeTree = rootRoute.addChildren([
  locationSettingRoute,
  addNewPetRoute,
  walkTimeSettingRoute,
])

export const router = createRouter({ routeTree })

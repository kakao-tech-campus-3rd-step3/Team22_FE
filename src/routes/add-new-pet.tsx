import { createFileRoute } from '@tanstack/react-router'
import AddNewPetPage from '@/pages/AddNewPetPage'

export const Route = createFileRoute('/add-new-pet')({
  component: AddNewPetPage,
})

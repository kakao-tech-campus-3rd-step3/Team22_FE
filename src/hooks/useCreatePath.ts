import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPath } from '@/api/walks.ts'

export default function useCreatePath() {
  const queryClient = useQueryClient()

  const createPathMutation = useMutation({
    mutationFn: createPath,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["path"] })
    },
    onError: (error) => {
      console.error("에러", error)
    }
  })

  return createPathMutation
}

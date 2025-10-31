import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPath } from '@/api/walks.ts'
import { QUERY_KEYS } from '@/constants/queryKeys.ts'

export default function useCreatePath() {
  const queryClient = useQueryClient()

  const createPathMutation = useMutation({
    mutationFn: createPath,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.walks })
    },
    onError: (error) => {
      console.error('에러', error)
    },
  })

  return createPathMutation
}

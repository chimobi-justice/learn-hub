import { useQuery } from '@tanstack/react-query'

import { getSingleThread } from '@services/threads'

export const useGetSingleThread = (id: string) => {
  return useQuery({
    queryKey: ['thread', id],
    queryFn: () => getSingleThread(id),
  })
}
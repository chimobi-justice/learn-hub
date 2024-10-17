import { useQuery } from '@tanstack/react-query'

import { getThreads } from '@services/threads'

export const useGetThreads = (limit: number) => {
  return useQuery({
    queryKey: ['threads', limit],
    queryFn: () => getThreads(limit),
  })
}
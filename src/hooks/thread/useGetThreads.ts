import { useQuery } from '@tanstack/react-query'

import { getAllThreads } from '@services/threads'

export const useGetThreads = (limit: number) => {
  return useQuery({
    queryKey: ['threads', limit],
    queryFn: () => getAllThreads(limit),
  })
}
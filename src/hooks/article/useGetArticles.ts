import { useQuery } from '@tanstack/react-query'

import { getAllArticles } from '@services/articles'

export const useGetArticles = (limit: number) => {
  return useQuery({
    queryKey: ['articles', limit],
    queryFn: () => getAllArticles(limit),
  })
}
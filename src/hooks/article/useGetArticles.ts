import { useQuery } from '@tanstack/react-query'

import { getArticles } from '@services/articles'

export const useGetArticles = (limit: number) => {
  return useQuery({
    queryKey: ['articles', limit],
    queryFn: () => getArticles(limit),
  })
}
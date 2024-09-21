import { useQuery } from '@tanstack/react-query'

import { getSingleArticle } from '@services/articles'

export const useGetSingleArticle = (id: string) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => getSingleArticle(id),
  })
}
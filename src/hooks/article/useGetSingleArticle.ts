import { useQuery } from '@tanstack/react-query'

import { getSingleArticle } from '@services/articles'

export const useGetSingleArticle = (id: any) => {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => getSingleArticle(id),
  })
}
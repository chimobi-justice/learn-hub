import { useQuery } from '@tanstack/react-query'

import { getRelatedArticlesArticles } from '@services/articles'

export const useGetRelatedArticles = (id: string) => {
  return useQuery({
    queryKey: ['related-articles', id],
    queryFn: () => getRelatedArticlesArticles(id),
  })
}
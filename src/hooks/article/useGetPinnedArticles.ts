import { useQuery } from '@tanstack/react-query'

import { getPinnedArticles } from '@services/articles'

export const useGetPinnedArticles = () => {
  return useQuery({
    queryKey: ['pinned-articles'],
    queryFn: getPinnedArticles,
  })
}
import { useQuery } from '@tanstack/react-query'

import { getSavedArticles } from '@services/articles'

export const useSavedArticles = () => {
  return useQuery({
    queryKey: ['saved-articles'],
    queryFn: getSavedArticles,
  })
}
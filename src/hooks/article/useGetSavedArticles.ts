import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { getSavedArticles } from '@services/articles'

export const useSavedArticles = (limit: number = 0) => {
  const {
    data: saveArticlesResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['saved-articles', limit],
    queryFn: ({ pageParam = 0 }) => getSavedArticles(limit, pageParam),
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.pagination?.next_page_url) {
        return undefined;
      }
      return lastPage?.data?.pagination?.current_page + 1
    }
  })

  const articles = saveArticlesResponse?.pages ?? null;

  return { articles, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage }
}
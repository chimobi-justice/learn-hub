import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { getAllArticles } from '@services/articles'

export const useGetPaginatedArticles = (limit: number = 0) => {
  const {
    data: articlesResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['articles', limit],
    queryFn: ({ pageParam = 0 }) => getAllArticles(limit, pageParam),
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.pagination?.next_page_url) {
        return undefined;
      }
      return lastPage?.data?.pagination?.current_page + 1
    }
  })

  const articles = articlesResponse?.pages ?? null;

  return { articles, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage }
}
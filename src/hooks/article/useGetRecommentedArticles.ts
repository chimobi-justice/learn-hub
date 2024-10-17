import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { getRecommentedArticles } from '@services/articles';

export const useGetRecommentedArticles = (limit: number = 0) => {
  const {
    data: recommentedArticlesResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['recommented-articles', limit],
    queryFn: ({ pageParam = 0 }) => getRecommentedArticles(limit, pageParam),
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.pagination?.next_page_url) {
        return undefined;
      }
      return lastPage?.data?.pagination?.current_page + 1
    }
  })

  const articles = recommentedArticlesResponse?.pages ?? null;

  return { articles, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage }
}
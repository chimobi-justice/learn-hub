import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { getAllThreads } from '@services/threads'

export const useGetPaginatedThreads = (limit: number = 0) => {
  const {
    data: threadsResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['threads', limit],
    queryFn: ({ pageParam = 0 }) => getAllThreads(limit, pageParam),
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.pagination.next_page_url) {
        return undefined;
      }
      return lastPage.data.pagination.current_page + 1
    }
  })

  const threads = threadsResponse?.pages ?? null;

  return { threads, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage }
}
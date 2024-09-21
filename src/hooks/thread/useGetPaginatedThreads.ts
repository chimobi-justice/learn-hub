import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { axiosInstance } from '@api/axiosInstance'
import { GET_PAGINATED_THREADS_ENDPOINT } from '@api/index'

export const useGetPaginatedThreads = (limit: number = 0) => {
  const fetchPaginatedThreads = async ({ pageParam = 0 }) => {
    const res = await axiosInstance.get(`${GET_PAGINATED_THREADS_ENDPOINT}?limit=${limit}&page=${pageParam}`)

    const dataResponse = await res.data;
    return { ...dataResponse, prevOffset: pageParam };
  };

  const {
    data: threadsResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['threads', limit],
    queryFn: fetchPaginatedThreads,
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
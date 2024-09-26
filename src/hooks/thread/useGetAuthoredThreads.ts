import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { axiosInstance } from '@api/axiosInstance'
import { GET_ARTHORED_THREADS_ENDPOINT } from '@api/index'

export const useGetAuthoredThreads = (limit: number = 0, username: string) => {
  const fetchPaginatedArticles = async ({ pageParam = 0 }) => {
    try {
      const res = await axiosInstance
          .get(`${GET_ARTHORED_THREADS_ENDPOINT}/${username}?limit=${limit}&page=${pageParam}`);
      const dataStatus = res.status;
      const dataResponse = await res.data;
      return { ...dataResponse, dataStatus, prevOffset: pageParam };
    } catch (error: any) {
      if (error.response?.status === 404) {
        return { dataStatus: 404 }; // Handle 404 by returning a custom response
      }
      throw error; // Rethrow any other error to be handled by React Query
    }
  };

  const {
    data: threadsResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['threads', limit, username],
    queryFn: fetchPaginatedArticles,
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.pagination?.next_page_url) {
        return undefined;
      }
      return lastPage?.data?.pagination?.current_page + 1
    }
  })

  const threads = threadsResponse?.pages ?? null;
  const dataStatus = threadsResponse?.pages?.[0]?.dataStatus ?? null;

  return { 
    threads, 
    isLoading, 
    isSuccess, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    dataStatus 
  }
}
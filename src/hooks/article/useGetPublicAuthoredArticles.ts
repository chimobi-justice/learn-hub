import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { axiosInstance } from '@api/axiosInstance'

export const useGetPublicAuthoredArticles = (limit: number = 0, username: string) => {
  const fetchPublicAuthoredArticles = async ({ pageParam = 0 }) => {
    try {
      const res = await axiosInstance
          .get(`/articles/authored/${username}/public?limit=${limit}&page=${pageParam}`);
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
    data: articlesResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['public-author-articles', limit, username],
    queryFn: fetchPublicAuthoredArticles,
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
  const dataStatus = articlesResponse?.pages?.[0]?.dataStatus ?? null;

  return { 
    articles, 
    isLoading, 
    isSuccess, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    dataStatus 
  }
}
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { axiosInstance } from '@api/axiosInstance'
import { GET_RECOMMENDED_ARTICLES_ENDPOINT } from '@api/index'

export const useGetRecommentedArticles = (limit: number = 0) => {
  const fetchRecommentedArticles = async ({ pageParam = 0 }) => {
    const res = await axiosInstance.get(`${GET_RECOMMENDED_ARTICLES_ENDPOINT}?limit=${limit}&page=${pageParam}`)

    const dataResponse = await res.data;
    return { ...dataResponse, prevOffset: pageParam };
  };

  const {
    data: recommentedArticlesResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['recommented-articles', limit],
    queryFn: fetchRecommentedArticles,
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
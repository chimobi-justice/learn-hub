import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { axiosInstance } from '@api/axiosInstance'
import { Get_FOLLOWING_USERS_ARTICLES_ENDPOINT } from '@api/index'

export const useGetFollowUsersArticles = (limit: number = 0) => {
  const fetchPaginatedArticles = async ({ pageParam = 0 }) => {
    const res = await axiosInstance.get(`${Get_FOLLOWING_USERS_ARTICLES_ENDPOINT}?limit=${limit}&page=${pageParam}`)

    const dataResponse = await res.data;
    return { ...dataResponse, prevOffset: pageParam };
  };

  const {
    data: followingUsersArticlesResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['get-followed-users-articles', limit],
    queryFn: fetchPaginatedArticles,
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.pagination?.next_page_url) {
        return undefined;
      }
      return lastPage?.data?.pagination?.current_page + 1
    }
  })

  const articles = followingUsersArticlesResponse?.pages ?? null;

  return { articles, isLoading, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage }
}
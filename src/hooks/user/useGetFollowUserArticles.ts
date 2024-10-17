import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { getFollowedUsersArticles } from '@services/user';

export const useGetFollowUsersArticles = (limit: number = 0) => {
  const {
    data: followingUsersArticlesResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['get-followed-users-articles', limit],
    queryFn: ({ pageParam = 0 }) => getFollowedUsersArticles(limit, pageParam),
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
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { getAllFollowUsers, getThreeUsersOnCard } from '@services/user'

export const useGetThreeCardUsers = () => {
  return useQuery({
    queryKey: ['limit-follow-users'],
    queryFn: getThreeUsersOnCard,
  })
}

export const useGetAllFollowUsers = (limit: number = 0) => {
  const {
    data: peopleResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['follow-users'],
    queryFn: ({ pageParam = 0 }) => getAllFollowUsers(limit, pageParam),
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.pagination?.next_page_url) {
        return undefined
      }
      return lastPage?.data?.pagination?.current_page + 1
    }
  })

  const people = peopleResponse?.pages ?? null;

  return { people, isLoading, isSuccess, fetchNextPage, isFetchingNextPage, hasNextPage }
}
import { getFollowersUsers, getFollowingUsers } from "@services/user";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

export const useGetUsersFollowings = (limit: number = 0) => {
  const {
    data: peopleResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['user-followings'],
    queryFn: ({ pageParam = 0 }) => getFollowingUsers(limit, pageParam),
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

export const useGetUsersFollowers = (limit: number = 0) => {
  const {
    data: peopleResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess
  } = useInfiniteQuery({
    queryKey: ['user-followers'],
    queryFn: ({ pageParam = 0 }) => getFollowersUsers(limit, pageParam),
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
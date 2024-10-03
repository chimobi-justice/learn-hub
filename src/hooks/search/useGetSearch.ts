import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'

import { fetchSearchResults } from '@services/search'

export const useGetSearch = (query: any, resource: any) => {
  const {
    data: dataResponse,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isSuccess,
    isError
  } = useInfiniteQuery({
    queryKey: ['search', query, resource],
    queryFn: ({ pageParam = 1 }) => fetchSearchResults({ query, page: pageParam, resource }),
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.[resource]?.pagination?.next_page_url) {
        return undefined;
      }
      return lastPage?.data?.[resource]?.pagination?.current_page + 1
    },
    placeholderData: keepPreviousData,
    initialPageParam: 1,
    enabled: !!query
  });


  const data = dataResponse?.pages ?? null;

  return { data, isLoading, isSuccess, isError, fetchNextPage, hasNextPage, isFetchingNextPage }

}
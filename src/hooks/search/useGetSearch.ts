import { useQuery } from '@tanstack/react-query'

import { getSearch } from '@services/search'

export const useGetSearch = (search: string) => {
  return useQuery({
    queryKey: ['search', search],
    queryFn: () => getSearch(search),
    enabled: search?.length > 0,
  })
}
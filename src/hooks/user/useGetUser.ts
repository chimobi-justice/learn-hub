import { useQuery } from '@tanstack/react-query'

import { getUser } from '@services/user'

export const useGetUser = (isAuthenticated: boolean) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: isAuthenticated
  })
}
import { useQuery } from '@tanstack/react-query'

import { getUser } from '@services/user'

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  })
}
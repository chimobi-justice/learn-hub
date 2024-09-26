import { useQuery } from '@tanstack/react-query'

import { getPublicUser } from '@services/user'

export const useGetPublicUser = (username: string) => {
  return useQuery({
    queryKey: ['user', username],
    queryFn: () => getPublicUser(username),
  })
}
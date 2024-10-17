import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { createFollowUser } from '@services/user'

export const useCreateFollowUser = () => {
  const queryClient = useQueryClient();

  const createFollowUserMutation = useMutation({
    mutationFn: createFollowUser,
    onSuccess: (data) => {
      successNotification(data.message);
      queryClient.invalidateQueries({ queryKey: ['follow-users'] });
      queryClient.invalidateQueries({ queryKey: ['limit-follow-users'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['article'] });
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['public-author-articles'] });
      queryClient.invalidateQueries({ queryKey: ['recommented-articles'] });
      queryClient.invalidateQueries({ queryKey: ['saved-articles'] });
      queryClient.invalidateQueries({ queryKey: ['get-followed-users-articles'] });
      queryClient.invalidateQueries({ queryKey: ['user-followers'] });
      queryClient.invalidateQueries({ queryKey: ['user-followings'] });
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { createFollowUserMutation }
}
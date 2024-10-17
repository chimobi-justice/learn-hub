import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { createOnFollowUser } from '@services/user'

export const useCreateOnFollowUser = () => {
  const queryClient = useQueryClient();

  const createOnFollowUserMutation = useMutation({
    mutationFn: createOnFollowUser,
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

  return { createOnFollowUserMutation }
}
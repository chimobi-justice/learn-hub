import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateProfile } from '@services/user'
import { errorNotification, successNotification } from '@helpers/notification'

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      });

      successNotification(data?.message);
    },
    onError: (error) => {
      errorNotification(error?.message)
    }
  })

  return { updateProfileMutation }
}
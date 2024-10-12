import { useMutation, useQueryClient } from '@tanstack/react-query'

import { uploadProfileAvatar } from '@services/user'
import { errorNotification, successNotification } from '@helpers/notification'

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();

  const updateProfileAvatarMutation = useMutation({
    mutationFn: uploadProfileAvatar,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user'] });

      successNotification(data?.message)
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { updateProfileAvatarMutation }
}
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { signoutUser } from '@services/auth'
import { errorNotification, successNotification } from '@helpers/notification'

export const useSignOut = () => {
  const queryClient = useQueryClient();

  const signOutMutation = useMutation({
    mutationFn: signoutUser,
    onSuccess: (data) => {
      successNotification(data.message);
      queryClient.invalidateQueries({
        queryKey: ['user']
      })

      localStorage.removeItem('ucType_');

      location.href = "/auth/login?auth&session=signout";
    },
    onError: (error) => {
      errorNotification(error.message)
    }
  })

  return { signOutMutation }
}
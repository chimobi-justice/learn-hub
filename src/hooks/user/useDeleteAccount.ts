import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteAccount } from '@services/user'
import { errorNotification } from '@helpers/notification'

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      })

      localStorage.removeItem('ucType_');

      location.href = "/auth/login";
    },
    onError: (error) => {
      errorNotification(error.message)
    }
  })

  return { deleteAccountMutation }
}
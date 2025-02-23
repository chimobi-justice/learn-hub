import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteAccount } from '@services/user'
import { errorNotification } from '@helpers/notification'
import { LOCAL_STORAGE_VALUES } from '@constant/Localstorage'

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })

      localStorage.removeItem(LOCAL_STORAGE_VALUES.ucType_);

      location.href = "/auth/login";
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { deleteAccountMutation }
}
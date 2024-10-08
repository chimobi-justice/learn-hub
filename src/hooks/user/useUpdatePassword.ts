import { useMutation } from '@tanstack/react-query'

import { updatePassword } from '@services/user'
import { errorNotification, successNotification } from '@helpers/notification'

export const useUpdatePassword = () => {
  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: (data) => {
      successNotification(data?.message)
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { updatePasswordMutation }
}
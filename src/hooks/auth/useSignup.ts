import { useMutation } from '@tanstack/react-query'

import { signupUser } from '@services/auth'
import { errorNotification, successNotification } from '@helpers/notification'

export const useSignup = () => {
  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      successNotification(`${data.message}, Please signin to your account`);
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { signupMutation }
}
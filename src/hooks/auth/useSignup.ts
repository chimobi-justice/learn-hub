import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { signupUser } from '@services/auth'
import { errorNotification, successNotification } from '@helpers/notification'

export const useSignup = () => {
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      successNotification(`${data.message}, Please signin to your account`);

      navigate('/auth/login');
    },
    onError: (error) => {
      errorNotification(error?.message)
    }
  })

  return { signupMutation }
}
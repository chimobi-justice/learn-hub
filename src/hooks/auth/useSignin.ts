import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { signinUser } from '@services/auth'
import { errorNotification, successNotification } from '@helpers/notification'

export const useSignin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signinMutation = useMutation({
    mutationFn: signinUser,
    onSuccess: (data) => {
      successNotification(data.message);
      queryClient.invalidateQueries({
        queryKey: ['user']
      })

      localStorage.setItem('ucType_', data?.access_token);

      navigate(`/me/${data?.username}`);
    },
    onError: (error) => {
      errorNotification(error.message)
    }
  })

  return { signinMutation }
}
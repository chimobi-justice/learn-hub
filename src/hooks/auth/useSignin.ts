import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { signinUser } from '@services/auth'
import { errorNotification, successNotification } from '@helpers/notification'
import { createRandomString } from '@helpers/getRandom'

export const useSignin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const rand = createRandomString();

  const signinMutation = useMutation({
    mutationFn: signinUser,
    onSuccess: (data) => {
      successNotification(data.message);
      queryClient.invalidateQueries({
        queryKey: ['user']
      })


      localStorage.setItem('ucType_', data?.access_token);

      navigate(`/articles?auth&views=${rand}`);
    },
    onError: (error) => {
      errorNotification(error.message)
    }
  })

  return { signinMutation }
}
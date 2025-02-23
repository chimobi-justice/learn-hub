import { useLocation } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { signinUser } from '@services/auth'
import { errorNotification, successNotification } from '@helpers/notification'
import { LOCAL_STORAGE_VALUES } from '@constant/Localstorage'

export const useSignin = () => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const signinMutation = useMutation({
    mutationFn: signinUser,
    onSuccess: (data) => {
      successNotification(data.message);
      queryClient.invalidateQueries({ queryKey: ['user'] })

      localStorage.setItem(LOCAL_STORAGE_VALUES.ucType_, data?.access_token);
      localStorage.setItem(LOCAL_STORAGE_VALUES.clu, JSON.stringify(true));

      if (location.pathname === '/auth/login') {
        window.location.href = '/'
      } else {
        window.location.reload();
      }
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { signinMutation }
}
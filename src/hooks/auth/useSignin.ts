import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { signinUser } from '@services/auth'
import { errorNotification, successNotification } from '@helpers/notification'

export const useSignin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const signinMutation = useMutation({
    mutationFn: signinUser,
    onSuccess: (data) => {
      successNotification(data.message);
      queryClient.invalidateQueries({ queryKey: ['user'] })

      localStorage.setItem('ucType_', data?.access_token);

      if (location.pathname === '/auth/login') {
        navigate('/');
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
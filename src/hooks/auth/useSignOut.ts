// import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { signoutUser } from '@services/auth'
import { errorNotification, successNotification } from '@helpers/notification'

export const useSignOut = () => {
  // const navigate = useNavigate();

  const queryClient = useQueryClient();

  const signOutMutation = useMutation({
    mutationFn: signoutUser,
    onSuccess: (data) => {
      successNotification(data.message);
      queryClient.invalidateQueries({
        queryKey: ['user']
      })

      localStorage.removeItem('ucType_');

      // navigate('/auth/login?auth&session=signout');
      location.href = "/auth/login?auth&session=signout";
    },
    onError: (error) => {
      errorNotification(error.message)
    }
  })

  return { signOutMutation }
}
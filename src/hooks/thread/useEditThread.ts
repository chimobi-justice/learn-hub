import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { editThread } from '@services/threads'

export const useEditThread = () => {
  const queryClient = useQueryClient();

  const editThreadMutation = useMutation({
    mutationFn: editThread,
    onSuccess: (data) => {
      successNotification(data.message);

      queryClient.invalidateQueries({ queryKey: ['threads'] })
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { editThreadMutation }
}
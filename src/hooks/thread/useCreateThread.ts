import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { createThread } from '@services/threads'

export const useCreateThread = () => {
  const queryClient = useQueryClient();

  const createThreadMutation = useMutation({
    mutationFn: createThread,
    onSuccess: (data) => {
      successNotification(data.message);

      queryClient.invalidateQueries({ queryKey: ['threads'] })
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { createThreadMutation }
}
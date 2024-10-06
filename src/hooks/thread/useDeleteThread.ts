import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { deleteThread } from '@services/threads'

export const useDeleteThread = () => {
  const queryClient = useQueryClient();

  const deleteThreadMutation = useMutation({
    mutationFn: deleteThread,
    onSuccess: (data) => {
      successNotification(data.message);

      queryClient.invalidateQueries({ queryKey: ['threads'] })

      queryClient.invalidateQueries({ queryKey: ['thread'] })

      queryClient.invalidateQueries({ queryKey: ['public-author-threads'] });
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { deleteThreadMutation }
}
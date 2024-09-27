import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { createThreadComment } from '@services/threads'

export const useCreateThreadComment = () => {
  const queryClient = useQueryClient();

  const createThreadCommentMutation = useMutation({
    mutationFn: createThreadComment,
    onSuccess: (data) => {
      successNotification(data.message);

      queryClient.invalidateQueries({
        queryKey: ['threads']
      });

      queryClient.invalidateQueries({
        queryKey: ['thread']
      })
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { createThreadCommentMutation }
}
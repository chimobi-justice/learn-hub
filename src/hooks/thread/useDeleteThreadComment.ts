import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { deleteThreadComment } from '@services/threads'

export const useDeleteThreadComment = () => {
  const queryClient = useQueryClient();

  const deleteThreadCommentMutation = useMutation({
    mutationFn: deleteThreadComment,
    onSuccess: (data) => {
      successNotification(data.message);

      queryClient.invalidateQueries({ queryKey: ['threads'] })
      queryClient.invalidateQueries({ queryKey: ['thread'] })
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message);
    }
  })

  return { deleteThreadCommentMutation }
}
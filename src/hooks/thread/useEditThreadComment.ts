import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { editThreadComment } from '@services/threads'

export const useEditThreadComment = () => {
  const queryClient = useQueryClient();

  const editThreadCommentMutation = useMutation({
    mutationFn: editThreadComment,
    onSuccess: (data) => {
      successNotification(data.message);

      queryClient.invalidateQueries({ queryKey: ['threads'] });
      queryClient.invalidateQueries({ queryKey: ['thread'] })
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { editThreadCommentMutation }
}
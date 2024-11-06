import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { deleteArticleComment } from '@services/articles';

export const useDeleteArticleComment = () => {
  const queryClient = useQueryClient();

  const deleteArticleCommentMutation = useMutation({
    mutationFn: deleteArticleComment,
    onSuccess: (data) => {
      successNotification(data.message);

      queryClient.invalidateQueries({ queryKey: ['articles'] })
      queryClient.invalidateQueries({ queryKey: ['article'] })
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message);
    }
  })

  return { deleteArticleCommentMutation }
}
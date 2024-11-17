import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { editArticleComment } from '@services/articles'

export const useEditArticleComment = () => {
  const queryClient = useQueryClient();

  const editArticlCommentMutation = useMutation({
    mutationFn: editArticleComment,
    onSuccess: (data) => {
      successNotification(data.message);

      queryClient.invalidateQueries({ queryKey: ['articles']});
      queryClient.invalidateQueries({ queryKey: ['article']});
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { editArticlCommentMutation }
}
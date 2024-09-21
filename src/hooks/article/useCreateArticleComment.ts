import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { createArticleComment } from '@services/articles'

export const useCreateArticleComment = () => {
  const queryClient = useQueryClient();

  const createArticlCommentMutation = useMutation({
    mutationFn: createArticleComment,
    onSuccess: (data) => {
      successNotification(data.message);

      queryClient.invalidateQueries({
        queryKey: ['articles']
      });

      queryClient.invalidateQueries({
        queryKey: ['article']
      });
    },
    onError: (error) => {
      errorNotification(error?.message)
    }
  })

  return { createArticlCommentMutation }
}
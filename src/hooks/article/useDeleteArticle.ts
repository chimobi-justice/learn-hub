import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { deleteArticle } from '@services/articles'

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  const deleteArticleMutation = useMutation({
    mutationFn: deleteArticle,
    onSuccess: (data) => {
      successNotification(data.message);

      queryClient.invalidateQueries({
        queryKey: ['articles']
      })
    },
    onError: (error) => {
      errorNotification(error?.message)
    }
  })

  return { deleteArticleMutation }
}
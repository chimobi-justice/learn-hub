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
      });

      queryClient.invalidateQueries({
        queryKey: ['article']
      });
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { deleteArticleMutation }
}
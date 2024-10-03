import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { createSaveArticle } from '@services/articles'

export const useCreateSaveArticle = () => {
  const queryClient = useQueryClient();

  const createSaveArticleMutation = useMutation({
    mutationFn: createSaveArticle,
    onSuccess: (data) => {
      successNotification(data?.message)

      queryClient.invalidateQueries({
        queryKey: ['articles']
      });

      queryClient.invalidateQueries({
        queryKey: ['saved-articles']
      });

      queryClient.invalidateQueries({
        queryKey: ['recommented-articles']
      });
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { createSaveArticleMutation }
}
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { createArticle } from '@services/articles'

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  const createArticleMutation = useMutation({
    mutationFn: createArticle,
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

  return { createArticleMutation }
}
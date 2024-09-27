import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { editArticle } from '@services/articles'

export const useEditArticle = () => {
  const queryClient = useQueryClient();

  const editArticleMutation = useMutation({
    mutationFn: editArticle,
    onSuccess: (data) => {
      successNotification(data.message);

      queryClient.invalidateQueries({
        queryKey: ['articles']
      })
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { editArticleMutation }
}
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification, successNotification } from '@helpers/notification'
import { deleteSaveArticle } from '@services/articles'

export const useDeleteSaveArticle = () => {
  const queryClient = useQueryClient();

  const deleteSaveArticleMutation = useMutation({
    mutationFn: deleteSaveArticle,
    onSuccess: (data) => {
      successNotification(data?.message)

      queryClient.invalidateQueries({ queryKey: ['articles'] });

      queryClient.invalidateQueries({ queryKey: ['saved-articles'] });

      queryClient.invalidateQueries({ queryKey: ['recommented-articles'] });
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { deleteSaveArticleMutation }
}
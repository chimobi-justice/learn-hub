import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification } from '@helpers/notification'
import { createArticleLike } from '@services/articles'

export const useCreateArticleLike = () => {
  const queryClient = useQueryClient();

  const createArticleLikeMutation = useMutation({
    mutationFn: createArticleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articles']
      });

      queryClient.invalidateQueries({
        queryKey: ['article']
      });

      queryClient.invalidateQueries({
        queryKey: ['public-author-article']
      });
    },
    onError: (error) => {
      errorNotification(error?.message)
    }
  })

  return { createArticleLikeMutation }
}
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification } from '@helpers/notification'
import { createArticleDisLike } from '@services/articles'

export const useCreateArticleDisLike = () => {
  const queryClient = useQueryClient();

  const createArticleDisLikeMutation = useMutation({
    mutationFn: createArticleDisLike,
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
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { createArticleDisLikeMutation }
}
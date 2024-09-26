import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification } from '@helpers/notification'
import { createThreadLike } from '@services/threads'

export const useCreateThreadLike = () => {
  const queryClient = useQueryClient();

  const createThreadLikeMutation = useMutation({
    mutationFn: createThreadLike,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['threads']
      });

      queryClient.invalidateQueries({
        queryKey: ['thread']
      });

      queryClient.invalidateQueries({
        queryKey: ['public-author-threads']
      });
    },
    onError: (error) => {
      errorNotification(error?.message)
    }
  })

  return { createThreadLikeMutation }
}
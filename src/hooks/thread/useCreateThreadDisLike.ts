import { useMutation, useQueryClient } from '@tanstack/react-query'

import { errorNotification } from '@helpers/notification'
import { createThreadDisLike } from '@services/threads'

export const useCreateThreadDisLike = () => {
  const queryClient = useQueryClient();

  const createThreadDisLikeMutation = useMutation({
    mutationFn: createThreadDisLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threads'] });
      queryClient.invalidateQueries({ queryKey: ['thread'] });
      queryClient.invalidateQueries({ queryKey: ['public-author-threads'] });
    },
    onError: (error: any) => {
      errorNotification(error?.response?.data?.message)
    }
  })

  return { createThreadDisLikeMutation }
}
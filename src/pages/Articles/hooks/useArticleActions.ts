import { FormEvent, useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'

import { useCreateArticleComment } from '@hooks/article/useCreateArticleComment'
import { useCreateArticleDisLike } from '@hooks/article/useCreateArticleDisLike'
import { useCreateArticleLike } from '@hooks/article/useCreateArticleLike'

export const useArticleActions = (articleId: string) => {
  const { createArticlCommentMutation } = useCreateArticleComment();
  const { createArticleLikeMutation } = useCreateArticleLike();
  const { createArticleDisLikeMutation } = useCreateArticleDisLike();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [comment, setComment] = useState<string>("");
  const [showId, setShowId] = useState<string>("");

  const handleShowComment = (articleId: string) => {
    setShowId(articleId)
    onOpen()
  }

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!showId) return;

    const commmentValue = { comment }
    createArticlCommentMutation.mutate({ data: commmentValue, id: showId })
    setComment("");
  }

  const handleLikeArticle = () => {
    createArticleLikeMutation.mutate({ id: articleId });
  }

  const handleDisLikeArticle = () => {
    createArticleDisLikeMutation.mutate({ id: articleId });
  }

  return {
    comment,
    setComment,
    isOpen,
    onClose,
    onOpen,
    handleShowComment,
    handleCommentSubmit,
    handleLikeArticle,
    handleDisLikeArticle,
    isSubmittingArticleComment: createArticlCommentMutation.isPending
  }
}


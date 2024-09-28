import { FormEvent, Fragment, FunctionComponent, useState } from 'react'
import { Flex, useDisclosure } from '@chakra-ui/react'

import {
  ThreadCardActions,
  ThreadCardContent,
  ThreadCardHeader,
  ThreadCardInteractions,
  DeleteConfirmation,
  ThreadCommentForm
} from '@components/ThreadCard/components'
import { errorNotification } from '@helpers/notification'
import { useUser } from '@context/userContext'
import { useCreateThreadComment } from '@hooks/thread/useCreateThreadComment'
import { useCreateThreadLike } from '@hooks/thread/useCreateThreadLike'
import { useCreateThreadDisLike } from '@hooks/thread/useCreateThreadDisLike'
import { useDeleteThread } from '@hooks/thread/useDeleteThread'

interface ThreadCardProps {
  thread: any;
  isSingleView?: boolean;
}

const ThreadCard: FunctionComponent<ThreadCardProps> = ({ thread, isSingleView = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();
  const { createThreadCommentMutation } = useCreateThreadComment();
  const { createThreadLikeMutation } = useCreateThreadLike();
  const { createThreadDisLikeMutation } = useCreateThreadDisLike();
  const { deleteThreadMutation } = useDeleteThread()

  const [showCommentInput, setShowCommentInput] = useState<string | null>("");
  const [comment, setComment] = useState<string>("");
  const [deleteThreadId, setDeleteThreadId] = useState(null);

  const handleShowCommentInput = (threadId: any) => {
    if (showCommentInput === threadId) {

      setShowCommentInput(null);
    } else {
      setShowCommentInput(threadId);
    }
  }

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!comment) {
      errorNotification('The comment field is Required*');
      return;
    }

    const commmentValue = { comment }
    createThreadCommentMutation.mutate({ data: commmentValue, id: thread?.id })
    setComment("");
  }

  const handleThreadLike = (threadId: string) => {
    createThreadLikeMutation.mutate({
      id: threadId
    })
  }

  const handleThreadDisLike = (threadId: string) => {
    createThreadDisLikeMutation.mutate({
      id: threadId
    })
  }

  const handleDelete = (threadId: any) => {
    setDeleteThreadId(threadId)
    onOpen()
  }

  const handleDeleteThread = () => {
    if (!deleteThreadId) return;
    deleteThreadMutation.mutate(deleteThreadId)
    onClose()
  }

  return (
    <Fragment>
      <Flex flex="1" gap={2} alignItems="center" flexWrap="wrap">
        <ThreadCardHeader
          author={thread?.author}
          createdAt={thread?.created_at?.human_short}
        />

        {thread?.isOwner && (
          <ThreadCardActions
            threadId={thread?.id}
            handleDelete={handleDelete}
          />
        )}
      </Flex>

      <ThreadCardContent
        title={thread?.title}
        content={thread?.content}
        slug={thread?.slug}
        threadId={thread?.id}
        isSingleView={isSingleView}
      />

      <ThreadCardInteractions
        userLikedThread={thread?.user_liked_thread}
        threadLikeCounts={thread?.thread_like_counts}
        threadCommentCounts={thread?.thread_comment_counts}
        handleShowCommentInput={() => handleShowCommentInput(thread?.id)}
        handleThreadLike={() => handleThreadLike(thread?.id)}
        handleThreadDisLike={() => handleThreadDisLike(thread?.id)}
        user={!!user}
      />

      {user && showCommentInput === thread.id && (
        <ThreadCommentForm
          comment={comment}
          setComment={setComment}
          handleSubmit={handleCommentSubmit}
          isSubmitting={createThreadCommentMutation.isPending}
        />
      )}

      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        handleDeleteThread={handleDeleteThread}
        isLoading={deleteThreadMutation.isPending}
      />
    </Fragment>
  );
}

export default ThreadCard;

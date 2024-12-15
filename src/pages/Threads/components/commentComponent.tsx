import { FormEvent, Fragment, FunctionComponent, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { Avatar, Box, Flex, Text, useDisclosure } from '@chakra-ui/react'

import { IThreadComments } from 'src/types'
import { useUser } from '@context/userContext';
import { Button, ContentBlockContent, Editor, ShowLoginModal } from '@components/index'
import { useCreateThreadComment } from '@hooks/thread/useCreateThreadComment'
import { useDeleteThreadComment } from '@hooks/thread/useDeleteThreadComment'
import { useEditThreadComment } from '@hooks/thread/useEditThreadComment'

const CommentComponent: FunctionComponent<{ comment: IThreadComments, level: number }> = ({ comment, level }) => {
  const { user } = useUser();
  const { createThreadCommentMutation } = useCreateThreadComment();
  const { deleteThreadCommentMutation } = useDeleteThreadComment();
  const { editThreadCommentMutation } = useEditThreadComment();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showCommentInput, setShowCommentInput] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleShowCommentInput = (threadId: string, isEditingMode: boolean = false, commentText: string) => {
    if (showCommentInput === threadId) {
      setShowCommentInput(null);
      setReplyContent("");
      setIsEditing(false);
    } else {
      setShowCommentInput(threadId);
      setIsEditing(isEditingMode);
      setReplyContent(isEditingMode ? commentText : "");
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!replyContent.trim()) return;

    if (isEditing) {
      editThreadCommentMutation.mutate(
        { data: { comment: replyContent }, id: comment.id },
        {
          onSuccess: () => {
            setIsEditing(false)
            setShowCommentInput(null);
          }
        }
      );
    } else {
      createThreadCommentMutation.mutate(
        { data: { comment: replyContent, parent_id: comment.id }, id: id! },
        {
          onSuccess: () => {
            setReplyContent("");
            setShowCommentInput(null);
          }
        }
      )
    }
  }

  const handleToggleReplies = () => setShowAllReplies(prev => !prev);

  const handleIsEditing = (threadId: string, commentText: string) => {
    handleShowCommentInput(threadId, true, commentText)
  };

  return (
    <Fragment>
      <Box mb={"5px"}>
        <Flex flex="1" gap={2} alignItems="flex-start" flexWrap="wrap">
          <Link to={`/user/${comment?.user?.username}`}>
            <Avatar size={"xs"} name={comment?.user?.fullname} src={comment?.user?.avatar} />
          </Link>
          <Box>
            <Text fontSize={"13px"} color={"#000"} _hover={{ textDecoration: "underline" }}>
              <Link to={`/user/${comment?.user?.username}`}>{comment?.user?.fullname}</Link>
            </Text>
            <Text fontSize={"12px"} color={"#0009"}>
              <Text as={"span"} mr={"3px"}>Replied</Text> {comment?.created_at?.human}
            </Text>
          </Box>
        </Flex>

        <ContentBlockContent content={comment.comment} />

        {user && (
          <Flex alignItems={"center"} gap={2} mb={"10px"}>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize="13px" cursor="pointer">
                {comment.replies_count && comment.replies_count > 1 ? (
                  <span onClick={handleToggleReplies}>
                    replies {comment.replies_count} &bull;
                  </span>
                ) : (
                  <></>
                )}
              </Text>

              <Text fontSize="13px" cursor="pointer" onClick={() => {
                  handleShowCommentInput(comment.id, false, "")
                }
              }
                as={"span"}>
                Reply
              </Text>
            </Flex>

            {comment.isOwner && (
              <Text fontSize={"13px"} color={"red.500"} cursor={"pointer"} onClick={() => {
                deleteThreadCommentMutation.mutate(comment.id)
              }}>
                Delete
              </Text>
            )}

            {comment.isOwner && (
              <Text fontSize={"13px"} color={"blue.500"} cursor={"pointer"} onClick={() => {
                handleIsEditing(comment.id, comment.comment);
              }}>
                Edit
              </Text>
            )}
          </Flex>
        )}

        {!user && (
          <Flex alignItems={"center"} gap={2} mb={"10px"}>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize="13px" cursor="pointer">
                {comment.replies_count && comment.replies_count > 1 ? (
                  <span onClick={handleToggleReplies}>
                    replies {comment.replies_count} &bull;
                  </span>
                ) : (
                  <></>
                )}
              </Text>

              <Text fontSize="13px" cursor="pointer" onClick={onOpen} as={"span"}>
                Reply
              </Text>
            </Flex>
          </Flex>
        )}

        {showCommentInput === comment.id && (
          <form onSubmit={handleSubmit}>
            <Box height={"160px"} mb={"25px"}>
              <Editor
                content={replyContent}
                setContent={setReplyContent}
                placeholder={isEditing ? 'Edit your reply...' : 'Write your reply...'}
              />
            </Box>

            <Box textAlign={"right"} py={"25px"}>
              <Button
                variant="solid"
                size={"md"}
                width={{ base: "100%", lg: "auto" }}
                type="submit"
                fontWeight={"semibold"}
                rounded="sm"
                isDisabled={!replyContent}
                isloading={isEditing ? editThreadCommentMutation.isPending : createThreadCommentMutation.isPending}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}

        {/* Render nested replies */}
        {comment.replies && comment.replies.length > 0 && (
          <Box ml={`${level * 20}px`}>
            {showAllReplies
              ? comment.replies.map(reply => (
                <CommentComponent key={reply.id} comment={reply} level={level + 1} />
              ))
              : comment.replies.slice(0, 1).map(reply => (
                <CommentComponent key={reply.id} comment={reply} level={level + 1} />
              ))}
          </Box>
        )}
      </Box>

      <ShowLoginModal isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
};

export default CommentComponent;
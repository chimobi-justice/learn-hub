import { FormEvent, Fragment, FunctionComponent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar, Box, Divider, Flex, Text, useDisclosure } from '@chakra-ui/react'

import { IArticleComments } from 'src/types'
import { useUser } from '@context/userContext'
import { Button, ContentBlockContent, Editor, ShowLoginModal } from '@components/index'
import { useCreateArticleComment } from '@hooks/article/useCreateArticleComment'
import { useDeleteArticleComment } from '@hooks/article/useDeleteArticleComment'
import { useEditArticleComment } from '@hooks/article/useEditArticleComment'

const CommentComponent: FunctionComponent<{ comment: IArticleComments, level: number }> = ({ comment, level }) => {
  const { user } = useUser();
  const { createArticlCommentMutation } = useCreateArticleComment();
  const { deleteArticleCommentMutation } = useDeleteArticleComment();
  const { editArticlCommentMutation } = useEditArticleComment();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams();

  const [showCommentInput, setShowCommentInput] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleShowCommentInput = (articleId: string, isEditingMode: boolean = false, commentText: string) => {
    if (showCommentInput === articleId) {
      setShowCommentInput(null);
      setReplyContent("");
      setIsEditing(false);
    } else {
      setShowCommentInput(articleId);
      setIsEditing(isEditingMode);
      setReplyContent(isEditingMode ? commentText : "");
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!replyContent.trim()) return;

    if (isEditing) {
      editArticlCommentMutation.mutate(
        { data: { comment: replyContent }, id: comment.id },
        {
          onSuccess: () => {
            setIsEditing(false)
            setShowCommentInput(null);
          }
        }
      );
    } else {
      createArticlCommentMutation.mutate(
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
      <Box mb={"5px"}> {/* Indent based on level */}
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          gap={3}
          mb={"5px"}
        >
          <Box>
            <Link to={`/user/${comment?.user?.username}`}>
              <Avatar
                src={comment?.user?.avatar}
                name={comment?.user?.fullname}
                size={"sm"}
              />
            </Link>
          </Box>

          <Box>
            <Text
              color={"#000"}
              fontSize={"16px"}
              mb={"2px"}
              _hover={{ textDecoration: "underline" }}
            >
              <Link to={`/user/${comment?.user?.username}`}>
                {comment?.user?.fullname}
              </Link>
            </Text>
            <Text
              color={"#0009"}
              fontSize={"14px"}
            >
              about {comment?.created_at?.human}
            </Text>
          </Box>
        </Box>

        <ContentBlockContent fontSize='12.5px' content={comment?.comment} />

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

              {comment.isOwner && (
                <Text fontSize={"13px"} color={"red.500"} cursor={"pointer"} onClick={() => {
                  deleteArticleCommentMutation.mutate(comment.id)
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
            <Box height={"160px"} mb={"40px"}>
              <Editor
                content={replyContent}
                setContent={setReplyContent}
                placeholder="Write your reply..."
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
                isloading={isEditing ? editArticlCommentMutation.isPending : createArticlCommentMutation.isPending}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}

      </Box>

      <Divider />

      {/* Render nested replies */}
      {comment.replies && comment.replies.length > 0 && (
        <Box ml={`${level * 10}px`}>
          {showAllReplies
            ? comment.replies.map(reply => (
              <CommentComponent key={reply.id} comment={reply} level={level + 1} />
            ))
            : comment.replies.slice(0, 1).map(reply => (
              <CommentComponent key={reply.id} comment={reply} level={level + 1} />
            ))}
        </Box>
      )}

      <ShowLoginModal isOpen={isOpen} onClose={onClose} />

    </Fragment>
  );
};


export default CommentComponent;
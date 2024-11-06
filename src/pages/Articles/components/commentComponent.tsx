import { FormEvent, Fragment, FunctionComponent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar, Box, Divider, Flex, Text, useDisclosure } from '@chakra-ui/react'

import { IArticleComments } from 'src/types'
import { useUser } from '@context/userContext'
import { useCreateArticleComment } from '@hooks/article/useCreateArticleComment'
import { Button, ContentBlockContent, Editor, ShowLoginModal } from '@components/index'
import { useDeleteArticleComment } from '@hooks/article/useDeleteArticleComment'

const CommentComponent: FunctionComponent<{ comment: IArticleComments, level: number }> = ({ comment, level }) => {
  const { user } = useUser();
  const { createArticlCommentMutation } = useCreateArticleComment();
  const { deleteArticleCommentMutation } = useDeleteArticleComment();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams();

  const [showCommentInput, setShowCommentInput] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);

  const handleShowCommentInput = (articleId: any) => {
    if (showCommentInput === articleId) {
      setShowCommentInput(null);
    } else {
      setShowCommentInput(articleId);
    }
  }

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      comment: replyContent,
      parent_id: comment.id
    }

    if (replyContent.trim()) {
      createArticlCommentMutation.mutate({ data: payload, id: id! })
      setReplyContent("");
    }
  }

  const handleToggleReplies = () => {
    setShowAllReplies(prev => !prev);
  }

  return (
    <Fragment>
      <Box mb={"5px"} ml={`${level * 10}px`}> {/* Indent based on level */}
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

              <Text fontSize="13px" cursor="pointer" onClick={() => handleShowCommentInput(comment.id)} as={"span"}>
                Reply
              </Text>

              {comment.isOwner && (
                <Text fontSize={"13px"} color={"red.500"} cursor={"pointer"} onClick={() => {
                  deleteArticleCommentMutation.mutate(comment.id)
                }}>
                  Delete
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
          <form onSubmit={handleCommentSubmit}>
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
                isloading={createArticlCommentMutation.isPending}
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
        <>
          {showAllReplies
            ? comment.replies.map(reply => (
              <CommentComponent key={reply.id} comment={reply} level={level + 1} />
            ))
            : comment.replies.slice(0, 1).map(reply => (
              <CommentComponent key={reply.id} comment={reply} level={level + 1} />
            ))}
        </>
      )}

      <ShowLoginModal isOpen={isOpen} onClose={onClose} />

    </Fragment>
  );
};


export default CommentComponent;
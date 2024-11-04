import { FormEvent, Fragment, FunctionComponent, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react'

import { IThreadComments } from 'src/types'
import { useUser } from '@context/userContext';
import { Button, ContentBlockContent, Editor } from '@components/index';
import { useCreateThreadComment } from '@hooks/thread/useCreateThreadComment';

const CommentComponent: FunctionComponent<{ comment: IThreadComments, level: number }> = ({ comment, level }) => {
  const { user } = useUser();
  const { createThreadCommentMutation } = useCreateThreadComment();
  const { id } = useParams();

  const [showCommentInput, setShowCommentInput] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState<string>('');
  const [showAllReplies, setShowAllReplies] = useState<boolean>(false);

  const handleShowCommentInput = (threadId: any) => {
    if (showCommentInput === threadId) {
      setShowCommentInput(null);
    } else {
      setShowCommentInput(threadId);
    }
  }

  const handleCommentSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      comment: replyContent,
      parent_id: comment.id
    };

    if (replyContent.trim()) {
      createThreadCommentMutation.mutate({ data: payload, id: id! });
      setReplyContent("");
    }
  }

  const handleToggleReplies = () => {
    setShowAllReplies(prev => !prev);
  }

  return (
    <Fragment>
      <Box mb={"5px"} ml={`${level * 20}px`}>
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
                ): (
                  <></>
                )}
              </Text>

              <Text fontSize="13px" cursor="pointer" onClick={() => handleShowCommentInput(comment.id)} as={"span"}>
                 Reply
              </Text>
            </Flex>

            <Spacer />
            
            <Flex gap={2}>
              {/* <Text fontSize={"13px"} color={"red.500"}>Delete</Text> */}

  
            </Flex>
          </Flex>
        )}

        {showCommentInput === comment.id && (
          <form onSubmit={handleCommentSubmit}>
            <Box height={"160px"} mb={"25px"}>
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
                isloading={createThreadCommentMutation.isPending}
              >
                Submit
              </Button>
            </Box>
          </form>
        )}

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
      </Box>
    </Fragment>
  );
};



export default CommentComponent;
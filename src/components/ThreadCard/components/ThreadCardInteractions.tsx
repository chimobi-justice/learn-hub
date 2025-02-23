import { FunctionComponent } from 'react'
import { HStack, Text, useDisclosure } from '@chakra-ui/react'
import { MdOutlineQuickreply, MdOutlineThumbUp, MdOutlineThumbDown } from 'react-icons/md'
import { ShowAuthModal } from '@components/index'

interface ThreadCardInteractionsProps {
  userLikedThread: boolean;
  threadCommentCounts: number;
  threadLikeCounts: number;
  handleShowCommentInput: () => void;
  handleThreadLike: () => void;
  handleThreadDisLike: () => void;
  user: boolean;
}

const ThreadCardInteractions: FunctionComponent<ThreadCardInteractionsProps> = ({
  userLikedThread,
  threadCommentCounts,
  threadLikeCounts,
  handleShowCommentInput,
  handleThreadLike,
  handleThreadDisLike,
  user
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <HStack borderBottom="1px solid #f1f1f1" py="10px" gap={3}>
        {user ? (
          <>
            <Text fontSize="14px" display="flex" gap={1} alignItems="center">
              <MdOutlineQuickreply
                size="23px"
                cursor="pointer"
                onClick={handleShowCommentInput}
              />
              {threadCommentCounts}
            </Text>

            <Text
              fontSize={{ base: "15px", md: "18px" }}
              display={"flex"}
              gap={3}
              alignItems={"center"}
            >
              {!userLikedThread && (
                <MdOutlineThumbUp
                  size={"23px"}
                  cursor={"pointer"}
                  onClick={handleThreadLike}
                />
              )}

              {userLikedThread && (
                <MdOutlineThumbDown
                  size={"23px"}
                  cursor={"pointer"}
                  onClick={handleThreadDisLike}
                />
              )}
              {threadLikeCounts}
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="14px" display="flex" gap={1} alignItems="center">
              <MdOutlineQuickreply
                size="23px"
                onClick={onOpen}
              />
              {threadCommentCounts}
            </Text>

            <Text
              fontSize={{ base: "15px", md: "18px" }}
              display={"flex"}
              gap={3}
              alignItems={"center"}
            >
              <MdOutlineThumbUp
                size={"24px"}
                style={{ marginBottom: "5px" }}
                onClick={onOpen}
              />
              {threadLikeCounts}
            </Text>
          </>
        )}
      </HStack>

      <ShowAuthModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </>

  )
}

export default ThreadCardInteractions;

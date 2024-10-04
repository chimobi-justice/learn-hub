import { FunctionComponent } from 'react'
import { Stack, Text, useDisclosure } from '@chakra-ui/react'
import { MdOutlineQuickreply, MdOutlineThumbDown, MdOutlineThumbUp } from 'react-icons/md'

import { useUser } from '@context/userContext'
import { Popover } from '@components/index'
import { ArticleActionButtonsProps } from 'src/types'

const ArticleActionButtons: FunctionComponent<ArticleActionButtonsProps> = ({
  article,
  onLike,
  onDisLike,
  onShowComment
}) => {
  const { user } = useUser();
  const { onClose, onToggle, isOpen} = useDisclosure();
  
  return (
    <>
      <Stack
        spacing={5}
        direction={{ base: "row", md: "column" }}
        justifyContent={"center"}
      >
        <Text
          fontSize={{ base: "15px", md: "18px" }}
          display={"flex"}
          flexDir={{ base: "row", md: "column" }}
          gap={3}
          alignItems={"center"}
          textAlign={"center"}
        >
          <MdOutlineQuickreply
            size={"24px"}
            style={{ marginBottom: "5px" }}
            cursor={"pointer"}
            onClick={onShowComment}
          />
          {article?.article_comment_counts}
        </Text>
        
        {user ? (
          <>
            <Text
              fontSize={{ base: "15px", md: "18px" }}
              display={"flex"}
              flexDir={{ base: "row", md: "column" }}
              gap={3}
              alignItems={"center"}
            >
              {!article?.user_liked_article && (
                <MdOutlineThumbUp
                  size={"23px"}
                  cursor={"pointer"}
                  onClick={onLike}
                />
              )}

              {article?.user_liked_article && (
                <MdOutlineThumbDown
                  size={"23px"}
                  cursor={"pointer"}
                  onClick={onDisLike}
                />
              )}
              {article?.article_like_counts}
            </Text>
          </>
        ) : (
          <>
            <Text
              fontSize={{ base: "15px", md: "18px" }}
              display={"flex"}
              flexDir={{ base: "row", md: "column" }}
              gap={3}
              alignItems={"center"}
            >
              <MdOutlineThumbUp
                size={"24px"}
                style={{ marginBottom: "5px" }}
                onClick={onToggle}
              />
              {article?.article_like_counts}
            </Text>
          </>
        )}
      </Stack>
    
      <Popover
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}

export default ArticleActionButtons;
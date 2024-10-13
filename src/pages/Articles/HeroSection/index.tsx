import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react'

import { IArticleHeroProps } from 'src/types'
import { useUser } from '@context/userContext'

const ArticleHeroSection: FunctionComponent<IArticleHeroProps> = ({
  title,
  authorAvatar,
  authorName,
  authorUsername,
  is_following,
  followUser,
  isOwner,
  read_time,
  date
}) => {
  const { user } = useUser();

  return (
    <Box
      width={"100%"}
      maxWidth={{ base: "90%", md: "90%", lg: "60%" }}
      m={"2em auto"}
      py={"30px"}
      px={"10px"}
    >
      <Heading size={"2xl"} fontWeight={"bolder"} lineHeight={"1.5em"} mb={"15px"}>{title}</Heading>

      <Flex flex="1" gap={5} alignItems="center" flexWrap="wrap" mt={"30px"}>
        <Box display={"flex"}>
          <Link to={`/user/${authorUsername}`}>
            <Avatar size={"md"} name={authorName} src={authorAvatar} />
          </Link>
        </Box>

        <Box>
          <Flex gap={3} alignItems={"center"}>
            <Link to={`/user/${authorUsername}`}>
              <Heading size="sm">{authorName}</Heading>
            </Link>

            {user && !isOwner && (
              <Text
                fontSize={"14px"}
                color={"blue"}
                cursor={"pointer"}
                _hover={{ textDecoration: "underline" }}
                onClick={followUser}
              >
                {is_following ? "unfollow" : "follow"}
              </Text>
            )}
          </Flex>

          <Text fontSize={"14px"} mt={"5px"}>
            {read_time}  &bull; {date}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}

export default ArticleHeroSection;
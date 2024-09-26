import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa6'

interface IProps {
  title: string;
  authorAvatar: string;
  authorName: string;
  authorUsername: string;
  read_time: string;
  date: string;
}

const ArticleHeroSection: FunctionComponent<IProps> = ({
  title,
  authorAvatar,
  authorName,
  authorUsername,
  read_time,
  date
}) => {
  return (
    <Box
      bg={"#3a3b3b"}
      color={"#fff"}
      height={"auto"}
      display={"flex"}
      alignItems={"flex-start"}
    >
      <Box
        width={"100%"}
        maxWidth={{ base: "90%", md: "80%", lg: "70%" }}
        mx={"auto"}
        py={"30px"}
      >
        <Link to="/articles">
          <Text
            mb={"10px"}
            display={"flex"}
            alignItems={"center"}
            fontSize={"15px"}
            fontWeight={"400"}
            gap={2}
            _hover={{
              textDecoration: "underline"
            }}
          >
            <FaArrowLeft /> back to all articles
          </Text>
        </Link>
        <Heading my={"35px"} lineHeight={"1.6em"}>
            {title}
        </Heading>

        <Flex flex="1" gap={3} alignItems="center" flexWrap="wrap">
          <Link to={`/user/${authorUsername}`}>
            <Avatar size={"sm"} name={authorName} src={authorAvatar} />
          </Link>

          <Link to={`/user/${authorUsername}`}>
            <Heading size="xs">{authorName}</Heading>
          </Link>

          <Text fontSize={"13px"}>{read_time}</Text>

          <Text> &bull; </Text>

          <Text fontSize={"13px"}>{date}</Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default ArticleHeroSection;
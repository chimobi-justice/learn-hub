import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Text
} from '@chakra-ui/react'

import truncate from '@helpers/truncate'

interface IProps {
  articleImg: string;
  title: string;
  slug: string;
  description: string;
  authorUsername: string;
  authorAvatar: string;
  authorOccupation: string;
}

const ArticlesCard: FunctionComponent<IProps> = ({
  articleImg,
  title,
  slug,
  description,
  authorUsername,
  authorAvatar,
  authorOccupation,
}) => {
  return (
    <Card mb={"15px"}>
      <CardBody p={"0px"}>
        <Box
          display={"flex"}
          flexDir={{base: "column", md: "row"}}
          alignItems={"center"}
          gap={2}
        >
          <Box width={{ base: "100%", md: "35%"}}>
            <Image
              src={articleImg}
              alt='Just'
            />
          </Box>

          <Box width={{ base: "100%", md: "65%"}} p={"5px"}>
            <Heading
              size="lg"
              lineHeight={"1.6em"}
              fontSize={"24px"}
              mb={"10px"}
              _hover={{
                textDecoration: "underline"
              }}
            >
              <Link to={`/articles/${slug}`}>
                {truncate(title, 80)}
              </Link>
            </Heading>
            <Text
              fontSize={"14px"}
              lineHeight={"1.7em"}
              color={"#0009"}
            >
              {truncate(`${description}`, 250)}
            </Text>

            <Flex flex="1" gap={2} alignItems="center" flexWrap="wrap" mt={"12px"}>
              <Link to="/user/nelson-dev">
                <Avatar size={"xs"} name="Nelson Dev" src={authorAvatar} />
              </Link>

              <Box>
                <Heading size="xs" fontSize={"13px"}>
                  <Link to="/user/nelson-dev">
                    {authorUsername}
                  </Link>
                </Heading>
                <Text fontSize={"12px"} color={"#0009"}>{authorOccupation}</Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </CardBody>
    </Card>
  )
}

export default ArticlesCard;
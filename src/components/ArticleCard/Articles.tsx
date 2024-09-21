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
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'

import truncate from '@helpers/truncate'
import { stripTags } from '@helpers/stripTags';

interface IProps {
  articleImg: string;
  title: string;
  description: string;
  read_time?: string;
  authorUsername?: string;
  authorFullname?: string;
  authorAvatar?: string;
  authorProfileHeadlines?: string;
  CTA?: string;
  isOwner?: boolean;
  onDelete?: () => void;
  id?: any;
}

const ArticlesCard: FunctionComponent<IProps> = ({
  articleImg,
  title,
  description,
  read_time,
  authorUsername,
  authorFullname,
  authorAvatar,
  authorProfileHeadlines,
  CTA = '#',
  isOwner,
  onDelete,
  id
}) => {
  return (
    <Card mb={"20px"}>
      <CardBody p={"0px"}>
        <Box
          display={"flex"}
          flexDir={{ base: "column", md: "row" }}
          alignItems={"center"}
          gap={2}
        >
          <Box width={{ base: "100%", md: "35%" }}>
            <Image
              src={articleImg}
              alt={articleImg}
              width={"100%"}
              height={"250px"}
            />
          </Box>

          <Box 
            width={{ base: "100%", md: "65%" }} 
            p={"5px"} 
            display={"flex"}
            gap={2}
            justifyContent={"space-between"}
          >
            <Box>
              <Heading
                size="lg"
                lineHeight={"1.6em"}
                fontSize={"24px"}
                mb={"10px"}
                _hover={{
                  textDecoration: "underline"
                }}
              >
                <Link to={CTA}>
                  {truncate(title, 80)}
                </Link>
              </Heading>
              <Text
                fontSize={"14px"}
                lineHeight={"1.7em"}
                color={"#0009"}
                dangerouslySetInnerHTML={stripTags(truncate(description, 250))}
              />

              <Flex flex="1" gap={2} alignItems="center" flexWrap="wrap" my={"12px"}>
                {authorUsername && authorAvatar && (
                  <Link to={`/user/${authorUsername}`}>
                    <Avatar size={"xs"} name={authorFullname} src={authorAvatar} />
                  </Link>
                )}

                <Box>
                  {authorUsername && (

                    <Heading size="xs" fontSize={"13px"}>
                      <Link to={`/user/${authorUsername}`}>
                        {authorUsername}
                      </Link>
                    </Heading>
                  )}

                  <Box display={"flex"} gap={3}>
                    {authorProfileHeadlines && (
                      <Text fontSize={"12px"} color={"#0009"}>{truncate(authorProfileHeadlines, 60)}</Text>
                    )}

                    <Text fontSize={"12px"} color={"#0009"}>{read_time}</Text>
                  </Box>
                </Box>

              </Flex>
            </Box>
            
            {isOwner && (
              <Flex p={"5px"} gap={2}>
                <Box>
                  <Link to={`/articles/edit/${id}`}>
                    <CiEdit size={"25px"} cursor={"pointer"} />
                  </Link>
                </Box>

                <Box>
                  <MdDeleteOutline size={"25px"} color="red" cursor={"pointer"} onClick={onDelete} />
                </Box>
              </Flex>
            )}
          </Box>
        </Box>
      </CardBody>
    </Card>
  )
}

export default ArticlesCard;
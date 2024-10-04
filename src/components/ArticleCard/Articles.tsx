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
  Text,
  Tooltip
} from '@chakra-ui/react'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'
import { BsSave } from 'react-icons/bs'
import { IoSaveSharp } from 'react-icons/io5'

import truncate from '@helpers/truncate'
import { stripTags } from '@helpers/stripTags'

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
  isLoggedIn?: any;
  is_saved?: boolean;
  saveUnsavedArticle?: () => void;
}

const ArticlesCard: FunctionComponent<IProps> = ({
  articleImg,
  title,
  description,
  read_time,
  authorUsername,
  authorFullname,
  authorAvatar,
  CTA = '#',
  isOwner,
  onDelete,
  id,
  isLoggedIn,
  is_saved,
  saveUnsavedArticle
}) => {
  return (
    <Card mb={"20px"} size={"md"}>
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
              width={{ base: "100%", md: "50%" }}
              height={{ base: "200px", md: "150px" }}
              mx={{ base: "", md: "auto" }}
            />
          </Box>

          <Box
            width={{ base: "100%", md: "65%" }}
            p={"10px"}
            display={"flex"}
            gap={2}
            justifyContent={"space-between"}
          >
            <Box width={"100%"}>
              <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
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
                </Box>

                <Box>
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

              <Box>
                <Text
                  fontSize={"14px"}
                  lineHeight={"1.7em"}
                  color={"#0009"}
                  dangerouslySetInnerHTML={stripTags(truncate(description, 200))}
                />

                <Flex
                  flex="1"
                  gap={2}
                  my={"12px"}
                  justifyContent={"space-between"}
                  flexDirection={{ base: "column", md: "row" }}
                  alignItems={"center"}
                >
                  <Box display={"flex"} gap={3} alignItems={"center"}>
                    {authorUsername && (
                      <Link to={`/user/${authorUsername}`}>
                        <Avatar size={"xs"} name={authorFullname} src={authorAvatar} />
                      </Link>
                    )}

                    {authorFullname && (
                      <Heading size="xs" fontSize={"13px"}>
                        <Link to={`/user/${authorUsername}`}>
                          {authorFullname}
                        </Link>
                      </Heading>
                    )}

                    {!isOwner && isLoggedIn && (
                      <Text fontSize={"14px"} color={"blue"} cursor={"pointer"} _hover={{ textDecoration: "underline" }}>follow</Text>
                    )}

                  </Box>

                  <Box gap={3} alignItems={"center"} display={"flex"}>
                    {!isOwner && isLoggedIn && !is_saved && (
                      <Tooltip label='Save' placement='top'>
                        <Text as={"span"}>
                          <BsSave onClick={saveUnsavedArticle} cursor={"pointer"} />
                        </Text>
                      </Tooltip>
                    )}

                    {!isOwner && isLoggedIn && is_saved &&
                      <Tooltip label='Article Saved' placement='top'>
                        <Text as={"span"}>
                          <IoSaveSharp onClick={saveUnsavedArticle} cursor={"pointer"} />
                        </Text>
                      </Tooltip>
                    }

                    <Text fontSize={"12px"} color={"#0009"}>{read_time}</Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardBody>
    </Card>
  )
}

export default ArticlesCard;
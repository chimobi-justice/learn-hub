import { Fragment, FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  HStack,
  Spacer,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'
import { MdOutlineQuickreply, MdOutlineThumbUp } from 'react-icons/md'

import { colors } from '../../colors'
import truncate from '@helpers/truncate'
import { Button, Search, FollowCard, RecommendTopicCard } from '@components/index'
import DiscussionCard from '@pages/Forum/components/discussionCard'
import AvatarPic from '@assets/images/avatar.jpg'

const Forum: FunctionComponent = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Box
      width={"90%"}
      m={"4rem auto"}
    >
      <Heading pb={"15px"} size={"xl"}>Forum</Heading>

      <Box mb={"15px"}>
        <Link to="/forum/new">
          <Button
            variant="solid"
            size={{ base: "md", lg: "lg" }}
            width={{ base: "100%", lg: "auto" }}
            type="button"
            fontWeight={"semibold"}
            rounded="sm"
          >
            Create Forum
          </Button>
        </Link>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row" }}
        gap={5}
      >
        <Box width={{ base: "100%", md: "70%" }}>
          <Card>
            <CardHeader borderBottom={"1px solid #f1f1f1"}>
              <Stack
                direction={"row"}
                alignItems={"center"}
              >
                <Heading size={"md"}>
                  Thr<Text as="span" color={colors.primary}>ea</Text>ds
                </Heading>

                <Spacer />

                <Search />
              </Stack>
            </CardHeader>

            <CardBody>
              <Stack
                divider={<StackDivider />}
                spacing={4}
                lineHeight={"1.5em"}
              >
                {data.map((index) => (
                  <Fragment key={index}>
                    <Flex mb={"8px"}>
                      <Flex flex="1" gap="2" alignItems="center" flexWrap="wrap">
                        <Link to="/user/justice-chimobi">
                          <Avatar size={"xs"} name="Justice Chimobi" src={AvatarPic} />
                        </Link>
                        <Box>
                          <Text
                            fontSize={"12px"}
                            color={"#0009"}
                            _hover={{
                              textDecoration: "underline"
                            }}
                          >
                            <Link to="/user/justice-chimobi"> By: Justice Chimobi</Link>
                          </Text>
                        </Box>
                      </Flex>

                      <Text fontSize={"12px"} fontWeight={"300"} color={"#0009"}>2d ago</Text>
                    </Flex>

                    <Box my={"14px"}>
                      <Heading as="h6" size="xs">
                        <Link to="/forum/title-of-the-thread-here">Title of the thread here</Link>
                      </Heading>
                      <Text fontSize={"13px"} mb={"10px"} color={"#0009"}>
                        <Link to="/forum/title-of-the-thread-here">
                          {truncate(`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed 
                            doloremque excepturi fugit odio quibusdam provident iure fugiat placeat 
                            culpa iusto quos tempora illo recusandae, consequuntur, temporibus dolore 
                            tempore suscipit quae aspernatur amet hic. Sapiente magnam dolores fuga 
                            autem exercitationem quasi laborum assumenda corporis similique in cumque 
                            delectus, necessitatibus quaerat. Ducimus.`, 250)}
                        </Link>
                      </Text>

                      <HStack
                        borderTop={"1px solid #f1f1f1"}
                        pt={"7px"}
                        gap={3}
                      >
                        <Text
                          fontSize={"12px"}
                          display={"flex"}
                          gap={1}
                          alignItems={"center"}
                        >
                          <MdOutlineQuickreply /> 30 Replies
                        </Text>
                        <Text
                          fontSize={"12px"}
                          display={"flex"}
                          gap={1}
                          alignItems={"center"}
                        >
                          <MdOutlineThumbUp /> 60
                        </Text>
                      </HStack>
                    </Box>
                  </Fragment>
                ))}
              </Stack>
            </CardBody>
          </Card>

          <Box textAlign={"center"} mt={"25px"}>
            <Button
              size="lg"
              rounded="md"
              type="button"
              variant="solid"

            >
              see more
            </Button>
          </Box>
        </Box>

        <Box width={{ base: "100%", md: "30%" }}>
          <Box>
            <DiscussionCard />
          </Box>

          <Box my={"25px"}>
            <RecommendTopicCard />
          </Box>

          <Box>
            <FollowCard />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Forum;
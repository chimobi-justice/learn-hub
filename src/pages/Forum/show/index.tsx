import { Fragment } from 'react'
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
  Text
} from '@chakra-ui/react'
import { MdOutlineThumbUp } from 'react-icons/md'

import { colors } from '../../../colors'
import DiscussionCard from '@pages/Forum/components/discussionCard'
import RecommendTopicCard from '@pages/Forum/components/recommendTopicCard'
import FollowCard from '@pages/Forum/components/followCard'
import RepliesCard from '@pages/Forum/components/repliesCard'

import AvatarPic from '@assets/images/avatar.jpg'

const ShowSingleForum = () => {
  return (
    <Box
      width={"90%"}
      m={"4rem auto"}
    >
      <Heading pb={"15px"} size={"xl"}>Forum</Heading>

      <Box
        display={"flex"}
        justifyContent={"space-between"}
        gap={5}
      >
        <Box width={"70%"}>
          <Card>
            <CardHeader borderBottom={"1px solid #f1f1f1"}>
              <Box
                display={"flex"}
                alignItems={"center"}
                gap={4}
              >
                <Heading as={"h3"} size={"md"}>
                  Thr<Text as="span" color={colors.primary}>ea</Text>ds
                </Heading>

                <Heading as={"h5"} size={"sm"} fontWeight={"400"}>Title of the thread here</Heading>
              </Box>
            </CardHeader>

            <CardBody>
              <Fragment>
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
                  <Heading as="h6" size="xs" mb={"7px"}>
                    Title of the thread here
                  </Heading>
                  <Text fontSize={"13px"} mb={"10px"} color={"#0009"} lineHeight={"1.8em"}>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
                      doloremque excepturi fugit odio quibusdam provident iure fugiat placeat
                      culpa iusto quos tempora illo recusandae, consequuntur, temporibus dolore
                      tempore suscipit quae aspernatur amet hic. Sapiente magnam dolores fuga
                      autem exercitationem quasi laborum assumenda corporis similique in cumque
                      delectus, necessitatibus quaerat. Ducimus.
                      
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
                      doloremque excepturi fugit odio quibusdam provident iure fugiat placeat
                      culpa iusto quos tempora illo recusandae, consequuntur, temporibus dolore
                      tempore suscipit quae aspernatur amet hic. Sapiente magnam dolores fuga
                      autem exercitationem quasi laborum assumenda corporis similique in cumque
                      delectus, necessitatibus quaerat. Ducimus.
                      
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
                      doloremque excepturi fugit odio quibusdam provident iure fugiat placeat
                      culpa iusto quos tempora illo recusandae, consequuntur, temporibus dolore
                      tempore suscipit quae aspernatur amet hic. Sapiente magnam dolores fuga
                      autem exercitationem quasi laborum assumenda corporis similique in cumque
                      delectus, necessitatibus quaerat. Ducimus.
                  </Text>

                  <HStack borderTop={"1px solid #f1f1f1"} pt={"7px"}>
                    <Text
                      fontSize={"12px"}
                      display={"flex"}
                      gap={2}
                      alignItems={"center"}
                    >

                      <MdOutlineThumbUp /> 60
                    </Text>
                  </HStack>
                </Box>
              </Fragment>
            </CardBody>
          </Card>

          <RepliesCard />
        </Box>

        <Box width={"30%"}>
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

export default ShowSingleForum;
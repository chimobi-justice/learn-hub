import { FunctionComponent } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { colors } from '../../../colors'
import { FollowCard, NotFound, ShowLoginModal, Skeleton } from '@components/index'
// import DiscussionCard from '@pages/Threads/components/discussionCard'
import RepliesCard from '@pages/Threads/components/repliesCard'
import { useGetSingleThread } from '@hooks/thread/useGetSingleThread'
import ThreadCard from '@components/ThreadCard'
import truncate from '@helpers/truncate'
import { useUser } from '@context/userContext'

const ShowThread: FunctionComponent = () => {
  const { id } = useParams();
  const { user } = useUser();

  const { data, isLoading, isSuccess, error } = useGetSingleThread(id!);
  const { onClose, onOpen, isOpen } = useDisclosure();

  const truncateLenght = useBreakpointValue({ base: 45, md: 30, lg: 70 });

  if (error) return <NotFound />;

  return (
    <>
      {isLoading && <Skeleton />}

      {data && isSuccess && (
        <>
          <Helmet>
            <title>{`${data?.data?.title} | learn-hub`}</title>
          </Helmet>

          <Box
            width={"90%"}
            m={"4rem auto"}
          >
            <Heading
              pb={"25px"}
              size={"md"}
              alignItems={"center"}
            >
              <Text as={"span"} color={"#0009"}><Link to="/threads">Discussions</Link></Text>
              {" > "}
              <Text as={"span"}>{truncate(data?.data?.title, truncateLenght)}</Text>
            </Heading>

            <Box
              display={"flex"}
              justifyContent={"space-between"}
              flexDir={{ base: "column", md: "row" }}
              gap={5}
            >
              <Box width={{ base: "100%", md: "70%" }}>
                <>
                  <Card>
                    <CardHeader borderBottom={"1px solid #f1f1f1"}>
                      <Heading as={"h3"} size={"md"}>
                        Thr<Text as="span" color={colors.primary}>ea</Text>ds
                      </Heading>
                    </CardHeader>

                    <CardBody>
                      <ThreadCard thread={data?.data} isSingleView={true} />
                    </CardBody>
                  </Card>

                  {data?.data?.thread_comments &&
                    data?.data?.thread_comments?.length > 0
                    && (
                      <RepliesCard data={data?.data?.thread_comments || []} />
                    )
                  }
                </>

                <Box textAlign={"center"} p={"20px"} my={"15px"}>
                  {!user && (
                    <Box>
                      <Text fontSize={"18px"}>
                        Sign in to participate!
                        <Text
                          as={"span"}
                          fontSize={"16px"}
                          ml={"5px"}
                          color={colors.primary}
                          cursor={"pointer"}
                          _hover={{
                            color: colors.primaryDark
                          }}
                          onClick={onOpen}
                        >
                          Sign in here
                        </Text>
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>

              <Box
                width={{ base: "100%", md: "30%" }}
                position={{ base: "unset", md: "sticky" }}
                top="10px"
                height={{ base: "auto", md: "700px" }}
              >
                {/* <Box>
                  <DiscussionCard />
                </Box> */}

                {/* <Box my={"25px"}>
                <RecommendTopicCard />
              </Box> */}

                <Box mt={"15px"}>
                  <FollowCard />
                </Box>
              </Box>
            </Box>
          </Box>
        </>
      )}

      <ShowLoginModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ShowThread;
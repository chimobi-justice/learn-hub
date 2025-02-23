import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'
import { MdOutlineChevronRight } from 'react-icons/md'

import { colors } from '../../../colors'
import { FollowCard, NotFound, ShowAuthModal, Skeleton, ThreadCard } from '@components/index'
// import DiscussionCard from '@pages/Threads/components/discussionCard'
import RepliesCard from '@pages/Threads/components/repliesCard'
import { useGetSingleThread } from '@hooks/thread/useGetSingleThread'
import { useUser } from '@context/userContext'
import useScrollToTop from '@hooks/useScrollToTop'

const ShowThread: FunctionComponent = () => {
  const { id } = useParams();
  const { user } = useUser();
  const { data, isLoading, isSuccess, error } = useGetSingleThread(id!);

  const { onClose, onOpen, isOpen } = useDisclosure();

  // scroll to top when URL changes on the UI 
  useScrollToTop()

  if (error) return <NotFound />;

  return (
    <>
      {isLoading && <Skeleton count={3} />}

      {data && isSuccess && (
        <>
          <Helmet>
            <title>{`${data?.data?.title} | learn-hub`}</title>
          </Helmet>

          <Box
            width={"90%"}
            m={"4rem auto"}
          >
            <Box
              pb={"20px"}
            >
              <Breadcrumb separator={<MdOutlineChevronRight color='gray.500' />}>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/threads">Discussions</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink isCurrentPage color={"gray.600"}>Threads</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>

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

      <ShowAuthModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ShowThread;
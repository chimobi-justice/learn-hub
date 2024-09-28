import { Fragment, FunctionComponent, useState } from 'react'
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import { FollowCard, Button, Alert, Skeleton, EmptyState, NotFound, ContentBlockContent } from '@components/index'
import { useGetAuthoredThreads } from '@hooks/thread/useGetAuthoredThreads'
import { Link, useParams } from 'react-router-dom'
import { MdDeleteOutline, MdOutlineThumbUp } from 'react-icons/md'
import truncate from '@helpers/truncate'
import { CiEdit } from 'react-icons/ci'
import { useDeleteThread } from '@hooks/thread/useDeleteThread'

const ArthoredThreads: FunctionComponent = () => {
  const { username } = useParams();

  const {
    threads,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    dataStatus
  } = useGetAuthoredThreads(10, username!)
  const { deleteThreadMutation } = useDeleteThread();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deletingThreadId, setDeletingThreadId] = useState(null);

  const handleDelete = (articleId: any) => {
    setDeletingThreadId(articleId)
    onOpen()
  }

  const handleDeleteThread = () => {
    if (!deletingThreadId) return;
    deleteThreadMutation.mutate(deletingThreadId)
    onClose()
  }

  if (dataStatus === 404) return <NotFound />;

  return (
    <>
      <Box
        m={"3rem auto"}
        width={"90%"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", md: "row" }}
          alignItems={"center"}
          mb={"10px"}
        >
          <Heading as="h4" size="lg" py={"20px"}>My Threads</Heading>

          <Stack
            spacing={4}
            direction={{ base: "column", md: "row" }}
            width={{ base: "100%", lg: "auto" }}
          >
            <Link to="/threads/new">
              <Button
                variant="outline"
                size={{ base: "md", lg: "lg" }}
                width={{ base: "100%", lg: "auto" }}
                type="button"
                fontWeight={"semibold"}
                rounded="lg"
              >
                Create Threads
              </Button>
            </Link>

            <Link to="/articles/new">
              <Button
                variant="solid"
                size={{ base: "md", lg: "lg" }}
                width={{ base: "100%", lg: "auto" }}
                type="button"
                fontWeight={"semibold"}
                rounded="lg"
              >
                Write Articles
              </Button>
            </Link>
          </Stack>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          flexDirection={{ base: "column", md: "row" }}
          gap={5}
        >
          <Box width={{ base: "100%", md: "70%" }}>
            <Box>
              {isLoading && <Skeleton />}

              {threads && isSuccess && threads?.map((page: any, pageIndex: number) => (
                <Fragment key={pageIndex}>
                  {page?.data?.threads.map((thread: any, index: number) => (
                    <Card key={index} mb={"15px"}>
                      <CardBody>
                        <Fragment>
                          <Flex mb={"8px"}>
                            <Flex flex="1" gap="2" alignItems="center">
                              <Heading as="h6" size="xs">
                                {truncate(thread?.title, 100)}
                              </Heading>

                              <Text fontSize={"12px"} fontWeight={"300"} color={"#0009"}>{thread?.created_at?.human_short}</Text>
                            </Flex>

                            <Flex p={"5px"} gap={2}>
                              <Box>
                                <Link to={`/threads/edit/${thread?.id}`}>
                                  <CiEdit size={"25px"} cursor={"pointer"} />
                                </Link>
                              </Box>

                              <Box>
                                <MdDeleteOutline size={"25px"} color="red" cursor={"pointer"} onClick={() => handleDelete(thread?.id)} />
                              </Box>
                            </Flex>
                          </Flex>

                          <Box my={"14px"}>
                            <Box height={"130px"} overflow={"hidden"} p="5px">
                              <ContentBlockContent content={truncate(thread?.content, 250)} />
                            </Box>

                            <HStack borderTop={"1px solid #f1f1f1"} pt={"7px"}>
                              <Text
                                fontSize={"15px"}
                                display={"flex"}
                                gap={2}
                                alignItems={"center"}
                              >
                                <MdOutlineThumbUp size={"22px"} /> {thread?.thread_like_counts}
                              </Text>
                            </HStack>
                          </Box>
                        </Fragment>
                      </CardBody>
                    </Card>
                  ))}

                  {!isLoading && isSuccess && page?.data?.threads?.length === 0 && (
                    <EmptyState />
                  )}
                </Fragment>
              ))}


              {hasNextPage && (
                <Box textAlign={"center"} mt={"25px"}>
                  <Button
                    size="lg"
                    rounded="md"
                    type="button"
                    variant="solid"
                    onClick={fetchNextPage}
                    isDisabled={!hasNextPage && isFetchingNextPage}
                  >
                    {isFetchingNextPage
                      ? "Loading more.."
                      : hasNextPage
                        ? "Load More"
                        : "Nothing more to load"
                    }
                  </Button>
                </Box>
              )}
            </Box>
          </Box>

          <Box width={{ base: "100%", md: "30%" }}>
            {/* <Box>
              <RecommendTopicCard />
            </Box> */}

            <Box mt={"15px"}>
              <FollowCard />
            </Box>
          </Box>

          <Alert
            isOpen={isOpen}
            onClose={onClose}
            alertHeader="Delete Thread"
            alertBody="Are you sure? You can't undo this action afterwards."
            handleDelete={handleDeleteThread}
            isLoading={deleteThreadMutation.isPending}
          />
        </Box>
      </Box>
    </>
  )
}

export default ArthoredThreads;
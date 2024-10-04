import { Fragment, FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { colors } from '../../colors'
import { Button, FollowCard, Skeleton, ThreadCard } from '@components/index'
import DiscussionCard from '@pages/Threads/components/discussionCard'
import { useUser } from '@context/userContext'
import { useGetPaginatedThreads } from '@hooks/thread/useGetPaginatedThreads'

const Threads: FunctionComponent = () => {
  const { user } = useUser();
  const {
    threads,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useGetPaginatedThreads(10)

  return (
    <>
      <Helmet>
        <title>Threads | learn-hub</title>
        <meta name="description" content="Get Lists of Threads." />
      </Helmet>

      <Box
        width={"90%"}
        m={"4rem auto"}
      >
        <Heading pb={"25px"} size={"lg"}>Forum</Heading>

        {user && (
          <Box mb={"15px"}>
            <Link to="/threads/new">
              <Button
                variant="solid"
                size={{ base: "md", lg: "lg" }}
                width={{ base: "100%", lg: "auto" }}
                type="button"
                fontWeight={"semibold"}
                rounded="sm"
              >
                Create Thead
              </Button>
            </Link>
          </Box>
        )}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          flexDir={{ base: "column", md: "row" }}
          gap={5}
        >
          <Box width={{ base: "100%", md: "70%" }}>
            {isLoading && <Skeleton />}

            {threads && isSuccess && (
              <>
                <Card>
                  <CardHeader borderBottom={"1px solid #f1f1f1"}>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Heading size={"md"}>
                        Thr<Text as="span" color={colors.primary}>ea</Text>ds
                      </Heading>
                    </Stack>
                  </CardHeader>

                  <CardBody>
                    <Stack
                      divider={<StackDivider />}
                      spacing={4}
                      lineHeight={"1.5em"}
                    >
                      {threads && isSuccess && threads?.map((page: any, pageIndex: number) => (
                        <Fragment key={pageIndex}>
                          {page?.data?.threads.map((thread: any, index: number) => (
                            <ThreadCard thread={thread} key={index} />
                          ))}
                        </Fragment>
                      ))}
                    </Stack>
                  </CardBody>
                </Card>

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
              </>
            )}

          </Box>

          <Box width={{ base: "100%", md: "30%" }}>
            <Box>
              <DiscussionCard />
            </Box>

            {/* <Box my={"25px"}>
            <RecommendTopicCard />
          </Box> */}

            <Box>
              <FollowCard />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Threads;
import { FunctionComponent } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text
} from '@chakra-ui/react'

import { colors } from '../../../colors'
import { FollowCard, NotFound, Skeleton } from '@components/index'
import DiscussionCard from '@pages/Threads/components/discussionCard'
import RepliesCard from '@pages/Threads/components/repliesCard'
import { useGetSingleThread } from '@hooks/thread/useGetSingleThread'
import ThreadCard from '@components/ThreadCard'

const ShowThread: FunctionComponent = () => {
  const { id } = useParams();

  const { data, isLoading, isSuccess, error } = useGetSingleThread(id!);

  if (error) return <NotFound />;

  return (
    <>
      {isLoading && <Skeleton />}

      {data && isSuccess && (
        <Box
          width={"90%"}
          m={"4rem auto"}
        >
          <Heading
            pb={"25px"}
            size={"lg"}
            alignItems={"center"}
          >
            <Text as={"span"} color={"#0009"}><Link to="/threads">Forum</Link></Text>
            {" > "}
            <Text as={"span"}>{data?.data?.title}</Text>
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
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      gap={4}
                    >
                      <Heading as={"h3"} size={"md"}>
                        Thr<Text as="span" color={colors.primary}>ea</Text>ds
                      </Heading>

                      <Heading as={"h5"} size={"sm"} fontWeight={"400"}>{data?.data?.title}</Heading>
                    </Box>
                  </CardHeader>

                  <CardBody>
                    <ThreadCard thread={data?.data} isSingleView={true} />
                  </CardBody>
                </Card>

                {data?.data?.thread_comments &&
                  data?.data?.thread_comments?.length > 0
                  && (
                    <RepliesCard data={data?.data?.thread_comments} />
                  )
                }
              </>
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
      )}
    </>
  )
}

export default ShowThread;
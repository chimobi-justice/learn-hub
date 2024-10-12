import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'

import { Button, Card, Skeleton } from '@components/index'
import { colors } from '../../../../colors'
import { useGetThreads } from '@hooks/thread/useGetThreads'

const HomeThreads: FunctionComponent = () => {
  const { data: threads, isLoading, isSuccess } = useGetThreads(8)

  return (
    <Box width={"90%"} m={"4rem auto"}>
      <Heading
        pt={"4rem"}
        pb={"2rem"}
      >
        Thr<Text as="span" color={colors.primary}>ea</Text>ds
      </Heading>
      {isLoading && <Skeleton />}

      {threads && isSuccess && (
        <>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={{ base: "10px", md: "15px", lg: "20px" }}
            px={{ base: "6px", md: "10px", lg: "15px" }}
            py="40px"
          >
            {threads?.map((thread: any, index: any) => (
              <GridItem key={index} w="100%" h="100%">
                <Card
                  key={index}
                  authorAvatar={thread?.author?.avatar}
                  authorName={thread?.author?.fullname}
                  userName={thread?.author?.username}
                  date={thread?.created_at?.human_short}
                  title={thread?.title}
                  description={thread?.content}
                  CTA={`/threads/${thread?.slug}/${thread?.id}`}
                  CTAText='open thread'
                />
              </GridItem>
            ))}
          </Grid>

          <Box my={"3.5rem"} textAlign={"center"}>
            <Link to="/threads">
              <Button
                variant="solid"
                size="lg"
                type="button"
                fontWeight={"semibold"}
                rounded="sm"
                rightIcon={<FaArrowRight />}
              >
                View all threads
              </Button>
            </Link>
          </Box>
        </>
      )}
    </Box>
  )
}

export default HomeThreads;
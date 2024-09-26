import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa6'

import { Button, Card, Skeleton } from '@components/index'
import { colors } from '../../../colors'
import { useGetThreads } from '@hooks/thread/useGetThreads'

const HomeThreads: FunctionComponent = () => {
  const { data: threads, isLoading, isSuccess } = useGetThreads(12)

  return (
    <Box width={"90%"} m={"4rem auto"}>
      <Heading
        pt={"4rem"}
        pb={"2rem"}
      >
        Thr<Text as="span" color={colors.primary}>ea</Text>ds
      </Heading>
      {threads && isSuccess && (
        <>
          <SimpleGrid minChildWidth="300px" spacing={5}>
            {threads?.map((thread: any, index: number) => (
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
            ))}
          </SimpleGrid>

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

      {isLoading && <Skeleton />}

    </Box>
  )
}

export default HomeThreads;
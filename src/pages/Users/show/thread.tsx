import { FunctionComponent, Fragment } from 'react'
import { useParams } from 'react-router-dom'

import { Button, Skeleton, ThreadCard } from '@components/index'
import { useGetPublicAuthoredThreads } from '@hooks/thread/useGetPublicAuthoredThreads'
import { Box, Heading } from '@chakra-ui/react'

const PublicUserThreads: FunctionComponent = () => {
  const { username } = useParams();

  const {
    threads,
    isLoading,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useGetPublicAuthoredThreads(25, username!);

  return (
    <>
      {isLoading && <Skeleton />}

      {threads && isSuccess && threads?.map((page: any, pageIndex: number) => (
        <Fragment key={pageIndex}>
          {page?.data?.threads?.map((thread: any, index: number) => (
            <ThreadCard thread={thread} key={index} />
          ))}

          {page?.data?.threads?.length === 0 && (
            <Box textAlign="center" mt="20px">
              <Heading as="h5" size="md">This author don't have any threads yet</Heading>
            </Box>
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
    </>
  )
}

export default PublicUserThreads;
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardBody, Stack, StackDivider, Text } from '@chakra-ui/react'

import truncate from '@helpers/truncate'
import LoadButton from '@pages/Search/components/loadButton'
import { ISearchThreads } from 'src/types'

const SearchThreads: FunctionComponent<ISearchThreads> = ({
  threads,
  hasMore,
  fetchNext,
  isFetching
}) => {
  return (
    <Box mt={5}>
      {threads?.length > 0 && (
        <>
          <Text fontWeight="bold" mb={2}>Threads</Text>

          <Box border={"1px solid #f1f1f1"} borderRadius={"9px"} my={"10px"} bg={"gray.50"}>
            <Card>
              <CardBody p={"0px"}>
                <Stack divider={<StackDivider />} spacing='4'>
                  {threads?.map((thread: any, index: number) => (
                    <Link to={thread?.url} style={{ display: "block" }}>
                      <Text
                        key={index}
                        fontSize={"14px"}
                        p={"15px"}
                        cursor={"pointer"}
                        _hover={{
                          bg: "#f1f1f1"
                        }}
                      >
                        {truncate(thread?.title, 200)}
                      </Text>
                    </Link>
                  ))}
                </Stack>

                {hasMore && (
                  <LoadButton
                    isFetching={isFetching}
                    hasMore={hasMore}
                    fetchNext={fetchNext}
                  />
                )}
              </CardBody>
            </Card>
          </Box>
        </>
      )}
    </Box>
  )
}

export default SearchThreads;

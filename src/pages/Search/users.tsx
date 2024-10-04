import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Box, Card, CardBody, Flex, Heading, Stack, StackDivider, Text } from '@chakra-ui/react'

import truncate from '@helpers/truncate'
import LoadButton from '@pages/Search/components/loadButton'
import { ISearchUsers } from 'src/types'

const SearchUsers: FunctionComponent<ISearchUsers> = ({ 
  users,
  hasMore,
  fetchNext,
  isFetching
}) => {
  return (
    <Box>
      {users?.length > 0 && (
        <>
          <Text fontWeight="bold" mb={2}>Users</Text>

          <Box border={"1px solid #f1f1f1"} borderRadius={"9px"} my={"10px"} bg={"gray.50"}>
            <Card>
              <CardBody p={"0px"}>
                <Stack divider={<StackDivider />} spacing='4'>
                  {users?.map((user: any, index: number) => (
                    <Box
                      key={index}
                      fontSize={"14px"}
                      p={"15px"}
                      cursor={"pointer"}
                      _hover={{
                        bg: "#f1f1f1"
                      }}
                    >
                      <Link to={user?.url} style={{ display: "block" }}>
                        <Flex alignItems={"center"} gap={2}>
                          <Avatar size={"xs"} name={user?.fullname} src={user?.avatar} />

                          <Heading size='xs' textTransform='uppercase'>
                            {user?.fullname}
                          </Heading>
                        </Flex>
                        <Text pt='2' fontSize='sm'>
                          {truncate(user?.bio, 190)}
                        </Text>
                      </Link>
                    </Box>
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

export default SearchUsers;

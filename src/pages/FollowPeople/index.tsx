import { Box, Card, CardBody, CardHeader, Heading, Spinner } from '@chakra-ui/react'
import { Helmet } from 'react-helmet-async'

import { useGetAllFollowUsers } from '@hooks/user/useGetAllUsersToFollow'
import { colors } from '../../colors'
import { FollowSection } from '@components/index'

const FollowPeople = () => {
  const { people, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetAllFollowUsers(15);
  
  return (
    <>
      <Helmet>
        <title>People to follow | learn-hub</title>
        <meta name="description" content="People to follow" />
      </Helmet>

      <Box width={{ base: "100%", md: "60%" }} margin={"3rem auto"}>
        <Card>
          <CardHeader pb={"4px"}>
            <Heading size={"sm"}>People to follow</Heading>
          </CardHeader>

          <CardBody>
            {isLoading && (
              <Box textAlign={"center"}>
                <Spinner size={"xl"} thickness={"4px"} color={colors.primary} />
              </Box>
            )}

            <FollowSection
              people={people}
              hasMore={hasNextPage}
              fetchNext={fetchNextPage}
              isFetching={isFetchingNextPage}
            />
          </CardBody>
        </Card>
      </Box>
    </>
  )
}

export default FollowPeople;
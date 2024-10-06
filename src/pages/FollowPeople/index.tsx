import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, Spacer, Spinner, Text } from '@chakra-ui/react'

import { Button } from '@components/index'
import { useUser } from '@context/userContext'
import truncate from '@helpers/truncate'
import { useCreateFollowUser } from '@hooks/user/useCreateFollowUser'
import { useCreateOnFollowUser } from '@hooks/user/useCreateUnFollowUser'
import { useGetAllFollowUsers } from '@hooks/user/useGetFollowUsers'
import { colors } from '../../colors'
import { Helmet } from 'react-helmet-async'

const FollowPeople = () => {
  const { user } = useUser()
  const { people, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetAllFollowUsers(15);
  const { createFollowUserMutation } = useCreateFollowUser()
  const { createOnFollowUserMutation } = useCreateOnFollowUser();

  const handleFollowUnfollow = (userId: string, following: boolean) => {
    if (following) {
      createOnFollowUserMutation.mutate(userId)
    } else {
      createFollowUserMutation.mutate(userId)
    }
  }

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
            {people && people?.map((page: any, index: number) => (
              <Fragment key={index}>
                {page?.data?.users?.map((person: any, index: number) => (
                  <Box key={index} mb={"25px"}>
                    <Flex flex="1" gap={4} alignItems="center" flexWrap="wrap" mb={"8px"}>
                      <Flex align={"center"} gap={2}>
                        <Link to={`/user/${person?.username}`}>
                          <Avatar size={"sm"} name={person?.fullname} src={person?.avatar} />
                        </Link>

                        <Link to={`/user/${person?.username}`}>
                          <Heading size="xs">{person?.fullname}</Heading>
                        </Link>
                      </Flex>

                      <Spacer />

                      {user && (
                        <Button
                          size="sm"
                          rounded="lg"
                          type="button"
                          variant={person?.is_following ? "solid" : "outline"}
                          onClick={() => handleFollowUnfollow(person?.id, person?.is_following)}
                        >
                          {person?.is_following ? "following" : "follow"}
                        </Button>
                      )}

                      {!user && (
                        <Link to={"/auth/login"}>
                          <Button
                            size="sm"
                            rounded="lg"
                            type="button"
                            variant="outline"
                          >
                            follow
                          </Button>
                        </Link>
                      )}
                    </Flex>


                    <Box>
                      <Text fontSize={"13px"} color={"#0009"}>{truncate(person?.bio, 150)}</Text>
                    </Box>
                  </Box>
                ))}
              </Fragment>
            ))}

            {hasNextPage && (
              <Box textAlign={"center"} mt={"25px"}>
                <Button
                  size="md"
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
          </CardBody>
        </Card>
      </Box>
    </>
  )
}

export default FollowPeople
import { FunctionComponent, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react'

import { Button } from '@components/index'
import truncate from '@helpers/truncate'
import { useCreateFollowUser } from '@hooks/user/useCreateFollowUser'
import { useCreateOnFollowUser } from '@hooks/user/useCreateUnFollowUser'
import { useUser } from '@context/userContext'
import { Person } from 'src/types'

interface IProps {
  people: any;
  hasMore: boolean;
  fetchNext: () => void;
  isFetching: boolean;
}

const FollowSection: FunctionComponent<IProps> = ({ 
  people, 
  hasMore, 
  fetchNext, 
  isFetching 
}) => {
  const { user } = useUser();
  const { createFollowUserMutation } = useCreateFollowUser()
  const { createOnFollowUserMutation } = useCreateOnFollowUser();

  const handleFollowUnfollow = (userId: string, following: boolean) => {
    following 
    ? createOnFollowUserMutation.mutate(userId) // Unfollow the user
    : createFollowUserMutation.mutate(userId); // Follow the user
  }

  return (
    <>
      {people && people?.map((page: any, index: number) => (
        <Fragment key={index}>
          {(page?.data?.users || page?.data?.followings || page?.data?.followers)?.map((person: Person, index: number) => (
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

      {hasMore && (
        <Box textAlign={"center"} mt={"25px"}>
          <Button
            size="md"
            rounded="md"
            type="button"
            variant="solid"
            onClick={fetchNext}
            isDisabled={!hasMore && isFetching}
          >
            {isFetching
              ? "Loading more.."
              : hasMore
                ? "Load More"
                : "Nothing more to load"
            }
          </Button>
        </Box>
      )}
    </>
  )
}

export default FollowSection;
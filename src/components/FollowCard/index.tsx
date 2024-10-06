import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react'

import { colors } from '../../colors'
import { Button } from '@components/index'
import truncate from '@helpers/truncate'
import { useGetThreeCardUsers } from '@hooks/user/useGetFollowUsers'
import { useUser } from '@context/userContext'
import { useCreateFollowUser } from '@hooks/user/useCreateFollowUser'
import { useCreateOnFollowUser } from '@hooks/user/useCreateUnFollowUser'

const FollowCard: FunctionComponent = () => {
  const { user } = useUser()
  const { data: people, isLoading } = useGetThreeCardUsers();
  const { createFollowUserMutation } = useCreateFollowUser()
  const { createOnFollowUserMutation } = useCreateOnFollowUser();

  const handleFollowUnfollow = (userId: string, following: boolean) =>  {
    if (following) {
      createOnFollowUserMutation.mutate(userId)
    } else {
      createFollowUserMutation.mutate(userId)
    }
  }

  return (
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
        {people && people?.map((person: any, index: number) => (
          <Flex key={index} mb={"8px"}>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Link to={`/user/${person?.username}`}>
                <Avatar size={"sm"} name={person?.fullname} src={person?.avatar} />
              </Link>

              <Box>
                <Link to={`/user/${person?.username}`}>
                  <Heading size="xs">{person?.fullname}</Heading>
                </Link>
                <Text fontSize={"13px"} color={"#0009"}>{truncate(person?.bio, 25)}</Text>
              </Box>
            </Flex>

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
        ))}

        <Link to="/follow/people/suggestions">
          <Text
            fontSize={"13px"}
            color={colors.primary}
            mt={"20px"}
            _hover={{
              color: "#101828",
              textDecoration: "underline"
            }}
          >
            See more suggestions
          </Text>
        </Link>
      </CardBody>
    </Card>
  )
}

export default FollowCard;
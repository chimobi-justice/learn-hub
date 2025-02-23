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
  useDisclosure,
} from '@chakra-ui/react'

import { colors } from '../../colors'
import { Button, ShowAuthModal } from '@components/index'
import truncate from '@helpers/truncate'
import { useGetThreeCardUsers } from '@hooks/user/useGetAllUsersToFollow'
import { useUser } from '@context/userContext'
import { useCreateFollowUser } from '@hooks/user/useCreateFollowUser'
import { useCreateOnFollowUser } from '@hooks/user/useCreateUnFollowUser'

const FollowCard: FunctionComponent = () => {
  const { user } = useUser()
  const { data: people, isLoading } = useGetThreeCardUsers();
  const { createFollowUserMutation } = useCreateFollowUser()
  const { createOnFollowUserMutation } = useCreateOnFollowUser();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFollowUnfollow = (userId: string, following: boolean) => {
    following ?
      createOnFollowUserMutation.mutate(userId)
      : createFollowUserMutation.mutate(userId)
  }

  return (
    <>
      <Card>
        {isLoading && (
          <Box
            textAlign={"center"}
            height={"200px"}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size={"xl"} thickness={"4px"} color={colors.primary} />
          </Box>
        )}

        {people && (
          <>
            <CardHeader pb={"4px"}>
              <Heading size={"sm"}>People to follow</Heading>
            </CardHeader>

            <CardBody>
              {people?.data?.map((person, index: number) => (
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
                    <Button
                      size="sm"
                      rounded="lg"
                      type="button"
                      variant="outline"
                      onClick={onOpen}
                    >
                      follow
                    </Button>
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
          </>
        )}
      </Card>

      <ShowAuthModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default FollowCard;
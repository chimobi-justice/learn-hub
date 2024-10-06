import { FunctionComponent } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Avatar,
  Box,
  Container,
  Heading,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react'

import { colors } from '../../../colors'
import PublicUserArticles from '@pages/Users/show/articles'
import PublicUserThreads from '@pages/Users/show/thread'
import { useGetPublicUser } from '@hooks/user/useGetPublicUser'
import PublicUserAboutDetails from '@pages/Users/show/about'
import { Button, FollowCard, NotFound, Skeleton } from '@components/index'
import { Helmet } from 'react-helmet-async'
import { useCreateFollowUser } from '@hooks/user/useCreateFollowUser'
import { useCreateOnFollowUser } from '@hooks/user/useCreateUnFollowUser'
import { useUser } from '@context/userContext'

const ShowUserPublicPosts: FunctionComponent = () => {
  const { username } = useParams();

  const { user } = useUser()
  const { data, isLoading } = useGetPublicUser(username!)
  const { createFollowUserMutation } = useCreateFollowUser()
  const { createOnFollowUserMutation } = useCreateOnFollowUser();

  const handleFollowUnfollow = (userId: string, is_following: boolean|undefined) => {
    if (is_following) {
      createOnFollowUserMutation.mutate(userId)
    } else {
      createFollowUserMutation.mutate(userId)
    }
  }

  if (isLoading) return <Skeleton />

  if (!data) return <NotFound />;

  const userData = data?.data;

  const isOwner = user?.data?.username === userData?.username;

  return (
    <>
      <Helmet>
        <title>{`${username} | learn-hub`}</title>
      </Helmet>

      <Container maxW={"container.xl"}>
        <Box
          display={"flex"}
          my={"15px"}
          flexDirection={{ base: "column-reverse", md: "row" }}
        >
          <Box width={{ base: "100", md: "70%" }}>
            <Box mt={"15px"} mb={"25px"}>
              <Heading>{userData?.fullname}</Heading>
            </Box>
            <Tabs position='relative' variant='unstyled'>
              <TabList>
                <Tab>Articles</Tab>
                <Tab>Threads</Tab>
                <Tab>About</Tab>
              </TabList>
              <TabIndicator mt='-1.5px' height='2px' bg={colors.primary} borderRadius='1px' />
              <TabPanels>
                <TabPanel>
                  <PublicUserArticles />
                </TabPanel>
                <TabPanel>
                  <PublicUserThreads />
                </TabPanel>
                <TabPanel>
                  {userData && (
                    <PublicUserAboutDetails data={userData} />
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>

          <Box
            width={{ base: "100", md: "30%" }}
            borderLeft={"2px solid #f1f1f1"}
            p={"10px"}
            position={{ base: "unset", md: "sticky" }}
            top="10px"
            height={{ base: "auto", md: "800px" }}
          >
            <Box p={"5px"}>
              <Avatar
                src={userData?.avatar}
                name={userData?.fullname}
                size={"2xl"}
              />

              <Text my={"15px"} fontWeight={"bold"}>{userData?.fullname}</Text>
              <Text my={"10px"} fontSize={"14px"}>
                {userData?.followers} {userData?.followers === 1 ? 'Follower' : 'Followers'}
              </Text>


              <Text fontSize={"14px"} color={"#0009"} lineHeight={"1.6em"}>{userData?.profile_headlines}</Text>
            </Box>

            {!isOwner && (
              <Box mt={"25px"}>
                {user && (
                  <Button
                    size="sm"
                    rounded="md"
                    type="button"
                    variant={userData?.is_following ? "solid" : "outline"}
                    onClick={() => handleFollowUnfollow(userData?.id, userData?.is_following)}
                  >
                    {userData?.is_following ? "following" : "follow"}
                  </Button>
                )}

                {!user && (
                  <Link to={"/auth/login"}>
                    <Button
                      size="sm"
                      rounded="md"
                      type="button"
                      variant="outline"
                    >
                      follow
                    </Button>
                  </Link>
                )}
              </Box>
            )}

            <Box mt={"20px"}>
              <FollowCard />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}

export default ShowUserPublicPosts;
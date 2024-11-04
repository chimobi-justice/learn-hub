import { FunctionComponent, useEffect, useState } from 'react'
import { 
  Box, 
  Card, 
  CardBody, 
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
import FollowSection from '@components/FollowSection'
import { useGetUsersFollowers, useGetUsersFollowings } from '@hooks/user/useGetFollowingUsers'
import Loading from '@components/Loading'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '@context/userContext'

const FollowingUsers: FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState<number>(0);

  useEffect(() => {
    if (location.pathname.includes("/me/users/followings")) {
      setTabIndex(1);
    } else if (location.pathname.includes("/me/users/followers")) {
      setTabIndex(0);
    }
  }, [location]);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
    navigate(index === 1 ? "/me/users/followings" : "/me/users/followers");
  }

  const { user } = useUser();
  const {
    people: followings,
    isLoading: isFollowingLoading,
    isSuccess: isFollowingSuccess,
    hasNextPage: hasNextPageFollowings,
    isFetchingNextPage: isFetchingNextPageFollowings,
    fetchNextPage: fetchNextPageFollowings
  } = useGetUsersFollowings(15);

  const {
    people: followers,
    isLoading: isFollowersLoading,
    isSuccess: isFollowersSuccess,
    hasNextPage: hasNextPageFollowers,
    isFetchingNextPage: isFetchingNextPageFollowers,
    fetchNextPage: fetchNextPageFollowers
  } = useGetUsersFollowers(15);

  const isFollowersEmpty = !followers || followers.every((page: any) => !page?.data?.followers?.length);
  const isFollowingsEmpty = !followings || followings.every((page: any) => !page?.data?.followings?.length);

  return (
    <Container maxW={"container.xl"}>
      <Box width={{ base: "100%", md: "60%" }} margin={"2rem auto"}>
        <Heading
          as="h4"
          size="lg"
          py={"10px"}
          color={"#0009"}
          _hover={{ textDecoration: "underline" }}
        >
          <Link to={`/${user?.data?.username}`}>Back</Link>
        </Heading>
        <Card height={"auto"} overflowY={"auto"}>
          <CardBody>
            {isFollowingLoading && isFollowersLoading && <Loading />}

            {followers && followings && (
              <Tabs
                position="relative"
                variant="unstyled"
                index={tabIndex}
                onChange={(index) => handleTabsChange(index)}
              >
                <TabList>
                  <Tab>followers</Tab>
                  <Tab>followings</Tab>
                </TabList>
                <TabIndicator mt='-1.5px' height='2px' bg={colors.primary} borderRadius='1px' />
                <TabPanels>
                  <TabPanel>
                    {isFollowersEmpty && isFollowersSuccess && (
                      <Box textAlign="center" my="20px">
                        <Text fontSize="lg" color="gray.600">No followers found</Text>
                      </Box>
                    )}
                    {followers && isFollowersSuccess && (
                      <FollowSection
                        people={followers}
                        hasMore={hasNextPageFollowers}
                        fetchNext={fetchNextPageFollowers}
                        isFetching={isFetchingNextPageFollowers}
                      />
                    )}
                  </TabPanel>

                  <TabPanel>
                    {isFollowingsEmpty && isFollowingSuccess && (
                      <Box textAlign="center" my="20px">
                        <Text fontSize="lg" color="gray.600">You're not following any users yet!</Text>
                      </Box>
                    )}

                    {followings && isFollowingSuccess && (
                      <FollowSection
                        people={followings}
                        hasMore={hasNextPageFollowings}
                        fetchNext={fetchNextPageFollowings}
                        isFetching={isFetchingNextPageFollowings}
                      />
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </CardBody>
        </Card>
      </Box>
    </Container>
  )
}

export default FollowingUsers;
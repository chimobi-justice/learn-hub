import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
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
import { NotFound, Skeleton } from '@components/index'
// import FollowCard from '@components/FollowCard'

const ShowUserPublicPosts: FunctionComponent = () => {
  const { username } = useParams();

  const { data, isLoading } = useGetPublicUser(username!)

  
  if (isLoading) return <Skeleton />

  if (!data) return <NotFound />;

  const userData = data?.data;

  return (
    <Container maxW={"container.xl"}>
      <Box 
        display={"flex"} 
        my={"15px"}
        flexDirection={{base: "column-reverse", md: "row"}}
      >
        <Box width={{ base: "100", md: "70%"}}>
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
          width={{ base: "100", md: "30%"}}
          borderLeft={"2px solid #f1f1f1"} 
          p={"10px"}
          position={{ base: "unset", md: "sticky"}}
          top="10px"
          height={{base: "auto", md: "800px"}}
        >
          <Box p={"5px"}>
            <Avatar
              src={userData?.avatar}
              name={userData?.fullname}
              size={"2xl"}
            />

            <Text my={"15px"} fontWeight={"bold"}>{userData?.fullname}</Text>
            {/* <Text my={"10px"}>0 Follower</Text> */}

            <Text fontSize={"14px"} color={"#0009"} lineHeight={"1.6em"}>{userData?.profile_headlines}</Text>
          </Box>

          {/* <Box mt={"25px"}>
            <Button
              size="md"
              rounded="lg"
              type="button"
              variant="solid"
            >
              follow
            </Button>
          </Box> */}

          {/* <Box mt={"20px"}>
            <FollowCard />
          </Box> */}
        </Box>
      </Box>
    </Container>
  )
}

export default ShowUserPublicPosts;
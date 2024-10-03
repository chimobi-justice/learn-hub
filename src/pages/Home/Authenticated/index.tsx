import { FunctionComponent, useState } from 'react'
import {
  Box,
  Container,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react'

import { colors } from '../../../colors'
import { FollowCard, RecommendTopicCard } from '@components/index'
import Following from '@pages/Home/Authenticated/Following'
import ForYou from '@pages/Home/Authenticated/ForYou'

const HomeAuthUserPage: FunctionComponent = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Container maxW={"container.xl"}>
      <Box 
        display={"flex"} 
        my={"15px"}
        flexDirection={{base: "column", md: "row"}}
      >
        <Box width={{ base: "100", md: "70%"}}>
          <Tabs 
            position='relative' 
            variant='unstyled'
            index={tabIndex}
            onChange={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab>For you</Tab>
              <Tab>Following</Tab>
            </TabList>
            <TabIndicator mt='-1.5px' height='2px' bg={colors.primary} borderRadius='1px' />
            <TabPanels>
              <TabPanel>
                <ForYou />
              </TabPanel>
              <TabPanel>
                <Following setTabIndex={setTabIndex} />
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
          <Box mt={"20px"}>
            <RecommendTopicCard />
          </Box>

          <Box mt={"20px"}>
            <FollowCard />
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default HomeAuthUserPage;
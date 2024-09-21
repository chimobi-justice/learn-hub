import { FunctionComponent } from 'react'
import { Box, Heading } from '@chakra-ui/react'

import {
  // RecommendTopicCard,
  FollowCard
} from '@components/index'
import UpdatePassword from '@pages/Users/Settings/UpdatePassword'
import UpdateProfile from '@pages/Users/Settings/UpdateProfile'
import DeleteAccount from '@pages/Users/Settings/DeleteAccount'

const ProfileEdit: FunctionComponent = () => {
  return (
    <Box
      m={"3rem auto"}
      width={"90%"}
    >
      <Heading as="h4" size="lg" py={"10px"}>Settings</Heading>

      <Box
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row" }}
        gap={5}
      >
        <Box width={{ base: "100%", md: "70%" }}>
          <Box>
            <UpdateProfile />
          </Box>

          <Box>
            <UpdatePassword />
          </Box>

          <Box mt={"15px"}>
            <DeleteAccount />
          </Box>
        </Box>

        <Box width={{ base: "100%", md: "30%" }}>
          {/* <Box>
            <RecommendTopicCard />
          </Box> */}

          <Box mt={"15px"}>
            <FollowCard />
          </Box>
        </Box>
      </Box>
    </Box>

  )
}

export default ProfileEdit;
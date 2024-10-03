import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, Text } from '@chakra-ui/react'

import {
  // RecommendTopicCard,
  FollowCard
} from '@components/index'
import UpdatePassword from '@pages/Users/Settings/UpdatePassword'
import UpdateProfile from '@pages/Users/Settings/UpdateProfile'
import DeleteAccount from '@pages/Users/Settings/DeleteAccount'
import { useUser } from '@context/userContext'

const ProfileEdit: FunctionComponent = () => {
  const { user } = useUser();

  return (
    <Box
      m={"3rem auto"}
      width={"90%"}
    >
      <Text 
        mb={"5px"} 
        fontSize={"18px"} 
        cursor={"pointer"}
        _hover={{textDecoration: "underline"}}
      >
        <Link to={`/me/${user?.data?.username}`}>
          Back
        </Link>
      </Text>

      <Heading as="h4" size="lg" py={"10px"}>
        <Text color={"gray.400"} as={"span"}>profile</Text> \ <Text as={"span"}>Settings</Text>
      </Heading>

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
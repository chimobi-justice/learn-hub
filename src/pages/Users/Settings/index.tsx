import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Heading, Text } from '@chakra-ui/react'

import { FollowCard } from '@components/index'
import UpdatePassword from '@pages/Users/Settings/UpdatePassword'
import UpdateProfile from '@pages/Users/Settings/UpdateProfile'
import DeleteAccount from '@pages/Users/Settings/DeleteAccount'
import { useUser } from '@context/userContext'
import { Helmet } from 'react-helmet-async'

const ProfileEdit: FunctionComponent = () => {
  const { user } = useUser();

  return (
    <>
      <Helmet>
        <title>{`${user?.data?.fullname} - settings | learn-hub`}</title>
      </Helmet>

      <Box
        m={"3rem auto"}
        width={"90%"}
      >
        <Heading as="h4" size="lg" py={"10px"}>
          <Text color={"gray.400"} as={"span"} _hover={{ textDecoration: "underline"}}><Link to={`/${user?.data?.username}`}>profile</Link></Text> \ <Text as={"span"}>Settings</Text>
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
            <Box>
              <FollowCard />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ProfileEdit;
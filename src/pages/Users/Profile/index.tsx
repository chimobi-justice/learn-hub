import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Image,
  Text
} from '@chakra-ui/react'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import { GiWorld } from 'react-icons/gi'

import { FollowCard, Button } from '@components/index'
import CoverPic from '@assets/images/cover.jpg'
import { useUser } from '@context/userContext'
import { colors } from '../../../colors'

const Profile: FunctionComponent = () => {
  const { user } = useUser();

  return (
    <Box
      m={"3rem auto"}
      width={"90%"}
    >
      <Heading as="h4" size="lg" py={"10px"}>Profile</Heading>

      <Box
        display={"flex"}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", md: "row" }}
        gap={5}
      >
        <Box width={{ base: "100%", md: "70%" }}>
          <Card p={"0px"}>
            <CardHeader p={"0px"} position={"relative"}>
              <Image
                objectFit='cover'
                src={CoverPic}
                alt='cover photo'
                height={"200px"}
                width={"100%"}
                borderRadius="md"
              />

              <Box
                position={"absolute"}
                bottom={"-10%"}
                left={"0%"}
                transform={"translateX(15%)"}
                border={"4px solid white"}
                borderRadius={"full"}
                boxShadow={"md"}
              >
                <Avatar size='2xl' name={user?.data?.fullname} src={user?.data?.avatar} />
              </Box>
            </CardHeader>
            <CardBody
              mt={"15px"}
              display={"flex"}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              flexDir={{ base: "column", md: "row" }}

            >
              <Box>
                <Heading as={"h6"} size={"md"}>{user?.data?.fullname}</Heading>
                <Text fontSize={"17px"} my={"7px"} lineHeight={"1.7em"}>{user?.data?.profile_headlines}</Text>
                <Text fontSize={"14px"} my={"7px"}>{user?.data?.state}, {user?.data?.country}</Text>
                <Text fontSize={"14px"}>20 followers - 2 following</Text>

                <HStack
                  spacing={3}
                  my={"10px"}
                >
                  {user?.data?.gitHub && (
                    <Link
                      to={`https://www.github.com/${user?.data?.gitHub}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Text
                        fontSize={{ base: "15px", md: "18px" }}
                      >
                        <FaGithub style={{ fontSize: "24px", marginBottom: "5px" }} />
                      </Text>
                    </Link>
                  )}

                  {user?.data?.twitter && (
                    <Link
                      to={`https://x.com/${user?.data?.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Text
                        fontSize={{ base: "15px", md: "18px" }}
                      >
                        <FaXTwitter style={{ fontSize: "24px", marginBottom: "5px" }} />
                      </Text>
                    </Link>
                  )}

                  {user?.data?.website && (
                    <Link 
                      to={user?.data?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Text
                        fontSize={{ base: "15px", md: "18px" }}
                      >
                        <GiWorld style={{ fontSize: "24px", marginBottom: "5px" }} />
                      </Text>
                    </Link>
                  )}
                </HStack>
              </Box>

              <Box>
                <Link to="/me/settings/account/edit">
                  <Button
                    variant="solid"
                    size={{ base: "sm", lg: "md" }}
                    width={{ base: "100%", lg: "auto" }}
                    type="button"
                    fontWeight={"semibold"}
                    rounded="sm"
                  >
                    Edit Profile
                  </Button>
                </Link>
              </Box>
            </CardBody>
          </Card>

          <Card mt={"15px"}>
            <CardHeader>
              <Heading as={"h6"} size={"md"}>About</Heading>
            </CardHeader>
            <CardBody mt={"15px"}>
              <Box>
                {user?.data?.bio && (
                  <Text fontSize={"15px"} lineHeight={"1.7em"}>
                    {user?.data?.bio}
                  </Text>
                )}

                {!user?.data?.bio && (
                  <Heading fontSize={"15px"} lineHeight={"1.7em"}>
                    Please edit your profile to see your bio! {" "}
                    <Text as="span" color={colors.primary} textDecoration={"underline"}>
                      <Link to="/me/settings/account/edit">
                        Edit Profile
                      </Link>
                    </Text>
                  </Heading>
                )}
              </Box>
            </CardBody>
          </Card>
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

export default Profile;
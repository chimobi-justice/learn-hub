import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Text
} from '@chakra-ui/react'

import { RecommendTopicCard, FollowCard } from '@components/index'
import AvatarPic from '@assets/images/avatar.jpg'

const Profile = () => {
  return (
    <Box
      display={"flex"}
      alignItems={"flex-start"}
      justifyContent={"space-between"}
      flexDir={{ base: "column", md: "row" }}
      gap={5}
      m={"3rem auto"}
      width={"90%"}
    >
      <Box width={{ base: "100%", md: "70%" }}>
        <Card p={"0px"}>
          <CardHeader p={"0px"} position={"relative"}>
            <Image
              objectFit='cover'
              src='https://bit.ly/dan-abramov'
              alt='Dan Abramov'
              height={"200px"}
              width={"100%"}
              borderRadius="md"
            />

            <Box
              position={"absolute"}
              bottom={"-5%"}
              left={"50%"}
              transform={"translateX(-50%)"}
              border={"4px solid white"}
              borderRadius={"full"}
              boxShadow={"md"}
            >
              <Avatar size='2xl' name='Segun Adebayo' src={AvatarPic} />
            </Box>
          </CardHeader>
          <CardBody mt={"15px"}>
            <Box>
              <Heading as={"h6"} size={"md"}>Justice Chimobi</Heading>
              <Text fontSize={"17px"} lineHeight={"1.7em"}>Frontend Developer || Full stack || TypeScript || Reactjs || Laravel</Text>
              <Text fontSize={"14px"} my={"5px"}>Lagos state, Nigeria</Text>
              <Text fontSize={"14px"}>20 followers - 2 following</Text>
            </Box>
          </CardBody>
        </Card>

        <Card mt={"15px"}>
          <CardHeader>
            <Heading as={"h6"} size={"md"}>About</Heading>
          </CardHeader>
          <CardBody mt={"15px"}>
            <Box>
              <Text fontSize={"15px"} lineHeight={"1.7em"}>
                👋 Hi, I'm Justice, a multifaceted Software Developer based in Lagos, Nigeria. I'm passionate about crafting innovative web and mobile applications that make a difference. By day, I tackle complex technical challenges, and by night, I transform into a technical writer, sharing my knowledge with the community.

                As a skilled Software Developer, my expertise includes:

                - Reactjs
                - Nextjs
                - Typescript
                - React-Query
                - Redux
                - Laravel
                - Sass
                - Styled-Component
                - Ant-Design
                - Chakra-ui
                - Mui
                - Tailwind CSS
                - MySQL

                I'm a continuous learner, always seeking to improve my skills and stay up-to-date with the latest technologies. Let's connect and create something amazing together!
              </Text>
            </Box>
          </CardBody>
        </Card>
      </Box>

      <Box width={{ base: "100%", md: "30%" }}>
        <Box>
          <RecommendTopicCard />
        </Box>

        <Box mt={"15px"}>
          <FollowCard />
        </Box>
      </Box>
    </Box>
  )
}

export default Profile;
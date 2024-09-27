import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  Image,
  Stack,
  Text
} from '@chakra-ui/react'

import HeroImg from '@assets/images/hero.jpg'
import Button from '@components/Button'
import { colors } from '../../colors'

const HeroSection: FunctionComponent = () => {
  return (
    <Box
      as="section"
      bg={"#fff"}
      height={"auto"}
    >
      <Container maxW={"container.xl"}>
        <Box
          alignItems="center"
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent={{ base: "space-between", md: "normal" }}
          py={"30px"}
        >
          <Box width={{ base: "100%", md: "50%" }}>
            <Heading
              as="h2"
              size={{ base: "xl", md: "2xl" }}
            >
              Embark on a <Text as="span" color={colors.primary}>Delightful</Text>
            </Heading>
            <Heading
              as="h2"
              size={{ base: "xl", md: "2xl" }}
              my={"20px"}
            >
              Journey of <Text as="span" color={colors.primary}>Growth</Text> With
            </Heading>
            <Heading
              as="h2"
              size={{ base: "xl", md: "2xl" }}
            >
              Community <Text as="span" color={colors.primary}>Experts</Text>
            </Heading>

            <Text
              my={"25px"}
              fontSize={"18px"}
              width={{ base: "100%", md: "80%" }}
              lineHeight={"1.8em"}
            >
              A portal for problem solving, knowledge sharing and community builders, join others for sharing knowledge.
            </Text>

            <Stack
              spacing={4}
              my={"15px"}
              direction={{ base: "column", lg: "row" }}
            >
              <Link to="/auth/register">
                <Button
                  variant="solid"
                  size={{ base: "md", lg: "lg" }}
                  width={{ base: "100%", lg: "auto" }}
                  type="button"
                  fontWeight={"semibold"}
                  rounded="sm"
                >
                  Join the community
                </Button>
              </Link>

              <Link to="/threads">
                <Button
                  variant="outline"
                  size={{ base: "md", lg: "lg" }}
                  width={{ base: "100%", lg: "auto" }}
                  type="button"
                  fontWeight={"semibold"}
                  rounded="sm"
                >
                  Visit Threads
                </Button>
              </Link>
            </Stack>
          </Box>

          <Box
            width={{ base: "100%", lg: "50%" }}
            mt={{ base: "25px", lg: "2px" }}
            display={{ base: "none", md: "block" }}
          >
            <Image
              src={HeroImg}
              width={"100%"}
              height={"100%"}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default HeroSection;
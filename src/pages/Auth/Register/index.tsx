import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  FormControl,
  FormLabel,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from '@chakra-ui/react'

import { Button, Input } from '@components/index'
import { colors } from '../../../colors'

const Register: FunctionComponent = () => {
  return (
    <Box
      width={{ base: "100%", md: "35%" }}
      margin={"4rem auto"}
    >
      <Card>
        <CardHeader>
          <Heading as={"h3"} size={"lg"} color={"#0009"}>Sign Up</Heading>
        </CardHeader>
        <CardBody>
          <Box mb={"15px"}>
            <FormControl>
              <FormLabel fontSize={"14px"} fontWeight={"bold"}>Full Name</FormLabel>
              <Input
                type="text"
                name="fullname"
                placeholder="Enter Full Name"
              />
            </FormControl>
          </Box>
          <Box my={"15px"}>
            <FormControl>
              <FormLabel fontSize={"14px"} fontWeight={"bold"}>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter Email Address"
              />
            </FormControl>
          </Box>

          <Box my={"15px"}>
            <FormControl>
              <FormLabel fontSize={"14px"} fontWeight={"bold"}>Password</FormLabel>
              <Input
                type="password"
                name='password'
                placeholder="Enter Password"
              />
            </FormControl>
          </Box>

          <Box my={"20px"}>
            <Button
              variant="solid"
              size={{ base: "md", lg: "lg" }}
              width={"100%"}
              type="button"
              fontWeight={"semibold"}
              rounded="sm"
            >
              Sign Up
            </Button>
          </Box>
          <Text
            fontSize={"14px"}
            fontWeight={"300"}
            textAlign={{ base: "center", md: "right" }}
            color={"#0009"}
          >
            Already have an account? {" "}
            <Link to="/auth/login">
              <Text
                as={"span"}
                color={colors.primary}
                _hover={{ textDecoration: "underline" }}
              >
                Sign In
              </Text>
            </Link>
          </Text>
        </CardBody>
      </Card>
    </Box>
  )
}

export default Register;
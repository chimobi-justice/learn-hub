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
  FormErrorMessage,
} from '@chakra-ui/react'
import { useFormik } from 'formik'

import { Button, Input } from '@components/index'
import { colors } from '../../../colors'
import { useSignup } from '@hooks/auth/useSignup'
import { signUpvalidateSchema } from '@validations/signup'
import { SignupRequest } from '@api/index'

const Register: FunctionComponent = () => {
  const { signupMutation } = useSignup();

  const _handleSignup = (values: SignupRequest) => {
    signupMutation.mutate({
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    })
  }

  const formilk = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
    },
    onSubmit: _handleSignup,
    validationSchema: signUpvalidateSchema,
  });

  const { handleChange, handleBlur, handleSubmit, errors, values } = formilk;

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
          <form onSubmit={handleSubmit}>
            <Box mb={"15px"}>
              <FormControl>
                <FormLabel fontSize={"14px"} fontWeight={"bold"}>Full Name</FormLabel>
                <Input
                  type="text"
                  name="fullname"
                  placeholder="Enter Full Name"
                  value={values.fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.fullname && (
                  <FormErrorMessage>{errors.fullname}</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box my={"15px"}>
              <FormControl>
                <FormLabel fontSize={"14px"} fontWeight={"bold"}>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                )}
              </FormControl>
            </Box>

            <Box my={"15px"}>
              <FormControl>
                <FormLabel fontSize={"14px"} fontWeight={"bold"}>Password</FormLabel>
                <Input
                  type="password"
                  name='password'
                  placeholder="Enter Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                )}
              </FormControl>
            </Box>

            <Box my={"20px"}>
              <Button
                variant="solid"
                size={{ base: "md", lg: "lg" }}
                width={"100%"}
                type="submit"
                fontWeight={"semibold"}
                rounded="sm"
                isloading={signupMutation.isPending}
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
          </form>
        </CardBody>
      </Card>
    </Box>
  )
}

export default Register;
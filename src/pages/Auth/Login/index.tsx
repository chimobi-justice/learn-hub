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
  FormErrorMessage
} from '@chakra-ui/react'

import { Button, Input } from '@components/index'
import { colors } from '../../../colors'
import { useSignin } from '@hooks/auth/useSignin'
import { SigninRequest } from '@api/index'
import { useFormik } from 'formik'
import { signInvalidateSchema } from '@validations/signin'

const Login: FunctionComponent = () => {
  const { signinMutation } = useSignin();

  const _handleSignin = (values: SigninRequest) => {
    signinMutation.mutate({
      email: values.email,
      password: values.password,
    })
  }

  const formilk = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: _handleSignin,
    validationSchema: signInvalidateSchema,
  });

  const { handleChange, handleBlur, handleSubmit, errors, values } = formilk;

  return (
    <Box
      width={{ base: "100%", md: "35%" }}
      margin={"4rem auto"}
    >
      <Card>
        <CardHeader>
          <Heading as={"h3"} size={"lg"} color={"#0009"}>Welcome back</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Box my={"15px"}>
              <FormControl>
                <FormLabel fontSize={"14px"} fontWeight={"bold"}>Email address</FormLabel>
                <Input
                  type='email'
                  name='email'
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

            <Box my={"15px"}>
              <Button
                variant="solid"
                size={{ base: "md", lg: "lg" }}
                width={"100%"}
                type="submit"
                fontWeight={"semibold"}
                rounded="sm"
                isloading={signinMutation.isPending}
              >
                Sign In
              </Button>
            </Box>

            <Text
              fontSize={"14px"}
              fontWeight={"300"}
              textAlign={{ base: "center", md: "right" }}
              color={"#0009"}
            >
              Don't have an account? {" "}
              <Link to="/auth/register">
                <Text
                  as={"span"}
                  color={colors.primary}
                  _hover={{ textDecoration: "underline" }}
                >
                  Sign Up
                </Text>
              </Link>
            </Text>
          </form>
        </CardBody>
      </Card>
    </Box>
  )
}

export default Login;
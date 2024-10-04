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
import { Formik, Field } from 'formik'
import { Helmet } from 'react-helmet-async'

import { Button, Input } from '@components/index'
import { colors } from '../../../colors'
import { useSignin } from '@hooks/auth/useSignin'
import { signInValidataionSchema } from '@validations/signin'
import { ISignin } from 'src/types'

const Login: FunctionComponent = () => {
  const { signinMutation } = useSignin();

  const handleSignin = (values: ISignin) => {
    signinMutation.mutate(values);
  };

  const initialValues: ISignin = {
    email: "",
    password: "",
  };

  return (
    <>
      <Helmet>
        <title>Login | learn-hub</title>
      </Helmet>

      <Box
        width={{ base: "100%", md: "35%" }}
        margin={"4rem auto"}
      >
        <Card>
          <CardHeader>
            <Heading as={"h3"} size={"lg"} color={"#0009"}>Welcome back</Heading>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSignin}
              validationSchema={signInValidataionSchema}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <Box my={"15px"}>
                    <FormControl
                      isRequired
                      isInvalid={!!errors.email && touched.email}
                    >
                      <FormLabel htmlFor="email">Email address</FormLabel>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="enter email address"
                      />
                      <FormErrorMessage>{errors.email}</FormErrorMessage>
                    </FormControl>
                  </Box>

                  <Box my={"15px"}>
                    <FormControl
                      isRequired
                      isInvalid={!!errors.password && touched.password}
                    >
                      <FormLabel htmlFor="email">Password</FormLabel>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="enter password"
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
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
              )}
            </Formik>
          </CardBody>
        </Card>
      </Box>
    </>
  )
}

export default Login;
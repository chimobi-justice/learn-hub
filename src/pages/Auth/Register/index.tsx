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
import { Formik, Field } from 'formik'
import { Helmet } from 'react-helmet-async'

import { Button, Input } from '@components/index'
import { colors } from '../../../colors'
import { useSignup } from '@hooks/auth/useSignup'
import { signUpValidataionSchema } from '@validations/signup'
import { ISignup } from 'src/types'

const Register: FunctionComponent = () => {
  const { signupMutation } = useSignup();

  const handleSignup = (values: ISignup) => {
    signupMutation.mutate(values);
  };

  const initialValues: ISignup = {
    fullname: "",
    email: "",
    password: "",
  };

  return (
    <>
      <Helmet>
        <title>Register | learn-hub</title>
      </Helmet>

      <Box
        width={{ base: "100%", md: "35%" }}
        margin={"4rem auto"}
      >
        <Card>
          <CardHeader>
            <Heading as={"h3"} size={"lg"} color={"#0009"}>Sign Up</Heading>
          </CardHeader>
          <CardBody>
            <Formik
              initialValues={initialValues}
              onSubmit={handleSignup}
              validationSchema={signUpValidataionSchema}
            >
              {({ handleSubmit, errors, touched }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={"15px"}>
                    <FormControl
                      isRequired
                      isInvalid={!!errors.fullname && touched.fullname}
                    >
                      <FormLabel htmlFor="fullname">Fullname</FormLabel>
                      <Field
                        as={Input}
                        id="fullname"
                        name="fullname"
                        type="text"
                        placeholder="enter fullname"
                      />
                      <FormErrorMessage>{errors.fullname}</FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box my={"15px"}>
                    <FormControl
                      isRequired
                      isInvalid={!!errors.email && touched.email}
                    >
                      <FormLabel htmlFor="email">Enter Email</FormLabel>
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
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="enter email password"
                      />
                      <FormErrorMessage>{errors.password}</FormErrorMessage>
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
              )}
            </Formik>
          </CardBody>
        </Card>
      </Box>
    </>
  )
}

export default Register;
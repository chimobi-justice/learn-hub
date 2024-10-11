import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react'
import { Formik } from 'formik'
import { Helmet } from 'react-helmet-async'

import { LoginForm } from '@components/index'
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
                <LoginForm
                  handleSubmit={handleSubmit}
                  errors={errors}
                  touched={touched}
                  isSubmitting={signinMutation.isPending}
                />
              )}
            </Formik>

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
          </CardBody>
        </Card>
      </Box>
    </>
  )
}

export default Login;
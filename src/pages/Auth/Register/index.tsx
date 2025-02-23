import { FunctionComponent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Card, CardBody, CardHeader, Heading, Text } from '@chakra-ui/react'
import { Formik } from 'formik'
import { Helmet } from 'react-helmet-async'

import { RegisterForm } from '@components/index'
import { colors } from '../../../colors'
import { useSignup } from '@hooks/auth/useSignup'
import { signUpValidataionSchema } from '@validations/signup'
import { ISignup } from 'src/types'

const Register: FunctionComponent = () => {
  const { signupMutation } = useSignup();
  const navigate = useNavigate();

  const handleSignup = (values: ISignup) => {
    signupMutation.mutate(values, {
      onSuccess: () => {
        navigate('/auth/login');
      }
    });
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
                <RegisterForm
                  handleSubmit={handleSubmit}
                  errors={errors}
                  touched={touched}
                  isSubmitting={signupMutation.isPending}
                />
              )}
            </Formik>

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
    </>
  )
}

export default Register;
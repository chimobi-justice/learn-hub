import { FunctionComponent } from 'react'
import { Box, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { Field } from 'formik'

import { Button, Input } from '@components/index'
import { AuthFormProps } from 'src/types'

const RegisterForm: FunctionComponent<AuthFormProps> = ({
  handleSubmit,
  errors,
  touched,
  isSubmitting
}) => {
  return (
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
          isloading={isSubmitting}
        >
          Sign Up
        </Button>
      </Box>
    </form>
  )
}

export default RegisterForm;
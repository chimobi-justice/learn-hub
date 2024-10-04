import { FunctionComponent } from 'react'
import {
  Box,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  FormLabel
} from '@chakra-ui/react'
import { Formik, Field } from 'formik'

import { Button, Input } from '@components/index'
import { useUpdatePassword } from '@hooks/user/useUpdatePassword'
import { updatePasswordValidationSchema } from '@validations/updatePassword'
import { IPassword } from 'src/types'

const UpdatePassword: FunctionComponent = () => {
  const { updatePasswordMutation } = useUpdatePassword();

  const handleUpdatePassword = (values: IPassword) => {
    updatePasswordMutation.mutate(values)
  };

  const initialValues: IPassword = {
    current_password: "",
    password: "",
    password_confirmation: ""
  };

  return (
    <Card mt={"10"}>
      <CardBody>
        <Formik 
          initialValues={initialValues} 
          onSubmit={handleUpdatePassword} 
          validationSchema={updatePasswordValidationSchema}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Box my={"15px"}>
                <FormControl 
                  isRequired 
                  isInvalid={!!errors.current_password && touched.current_password}
                >
                  <FormLabel htmlFor="current_password">Current Password</FormLabel>
                  <Field 
                    as={Input}
                    id="current_password"
                    name="current_password"
                    type="password"
                    placeholder="enter current password"
                  />
                  <FormErrorMessage>{errors.current_password}</FormErrorMessage>
                </FormControl>
              </Box>

              <Box my={"15px"}>
                <FormControl 
                  isRequired 
                  isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">New Password</FormLabel>
                  <Field 
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="enter new password"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
              </Box>

              <Box my={"15px"}>
                <FormControl 
                  isRequired 
                  isInvalid={!!errors.password_confirmation && touched.password_confirmation}>
                  <FormLabel htmlFor="password_confirmation">Confirm New Password</FormLabel>
                  <Field 
                    as={Input}
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    placeholder="re-enter new password"
                  />
                  <FormErrorMessage>{errors.password_confirmation}</FormErrorMessage>
                </FormControl>
              </Box>

              <Box textAlign={"right"} mt={"10"}>
                <Button
                  variant="solid"
                  size={{ base: "md", lg: "lg" }}
                  width={{ base: "100%", lg: "auto" }}
                  type="submit"
                  fontWeight={"semibold"}
                  rounded="sm"
                  isloading={updatePasswordMutation.isPending}
                >
                  Update Password
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default UpdatePassword;

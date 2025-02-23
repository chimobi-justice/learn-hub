import { FunctionComponent, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react'
import { Formik } from 'formik'

import { LoginForm, RegisterForm } from '@components/index'
import { signInValidataionSchema } from '@validations/signin'
import { signUpValidataionSchema } from '@validations/signup'
import { useSignin } from '@hooks/auth/useSignin'
import { useSignup } from '@hooks/auth/useSignup'
import { ISignin, ISignup } from 'src/types'
import { colors } from '../../colors'

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShowAuthModal: FunctionComponent<IProps> = ({ isOpen, onClose }) => {
  const { signinMutation } = useSignin();
  const { signupMutation } = useSignup();

  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleSignin = (values: ISignin) => {
    signinMutation.mutate(values);
  };

  const handleSignup = (values: ISignup) => {
    signupMutation.mutate(values, {
      onSuccess: () => {
        setTabIndex(0)
      }
    });
  };

  const initialSigninValues: ISignin = {
    email: "",
    password: "",
  }

  const initialSignupValues: ISignup = {
    email: "",
    password: "",
    fullname: ""
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={"lg"}>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <ModalContent>
        <ModalBody>
          <ModalHeader textAlign={"center"}>
            <Tabs
              position='relative'
              variant='unstyled'
              index={tabIndex}
              onChange={(index) => setTabIndex(index)}
            >
              <TabList>
                <Tab>Log In</Tab>
                <Tab>Sign Up</Tab>
              </TabList>
              <TabIndicator mt='-1.5px' height='2px' bg={colors.primary} borderRadius='1px' />

              <TabPanels>
                <TabPanel>
                  <Formik
                    initialValues={initialSigninValues}
                    onSubmit={handleSignin}
                    validationSchema={signInValidataionSchema}
                  >
                    {({ handleSubmit, errors, touched }) => (
                      <>
                        <LoginForm
                          handleSubmit={handleSubmit}
                          errors={errors}
                          touched={touched}
                          isSubmitting={signinMutation.isPending}
                        />

                        <Text
                          fontSize={"14px"}
                          fontWeight={"300"}
                          textAlign={{ base: "center", md: "right" }}
                          color={"#0009"}
                        >
                          Don't have an account? {" "}
                          <Text
                            as={"span"}
                            color={colors.primary}
                            _hover={{ textDecoration: "underline" }}
                            cursor={"pointer"}
                            onClick={() => setTabIndex(1)}
                          >
                            Sign Up
                          </Text>
                        </Text>
                      </>
                    )}
                  </Formik>
                </TabPanel>

                <TabPanel>
                  <Formik
                    initialValues={initialSignupValues}
                    onSubmit={handleSignup}
                    validationSchema={signUpValidataionSchema}
                  >
                    {({ handleSubmit, errors, touched }) => (
                      <>
                        <RegisterForm
                          handleSubmit={handleSubmit}
                          errors={errors}
                          touched={touched}
                          isSubmitting={signinMutation.isPending}
                        />

                        <Text
                          fontSize={"14px"}
                          fontWeight={"300"}
                          textAlign={{ base: "center", md: "right" }}
                          color={"#0009"}
                        >
                          Already have an account? {" "}
                          <Text
                            as={"span"}
                            color={colors.primary}
                            _hover={{ textDecoration: "underline" }}
                            cursor={"pointer"}
                            onClick={() => setTabIndex(0)}
                          >
                            Sign In
                          </Text>
                        </Text>
                      </>
                    )}
                  </Formik>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalHeader>
          <ModalCloseButton />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ShowAuthModal;
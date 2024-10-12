import { FunctionComponent } from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { Formik } from 'formik'

import { LoginForm } from '@components/index'
import { signInValidataionSchema } from '@validations/signin'
import { useSignin } from '@hooks/auth/useSignin'
import { ISignin } from 'src/types'

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShowLoginModal: FunctionComponent<IProps> = ({ isOpen, onClose }) => {
  const { signinMutation } = useSignin();

  const handleSignin = (values: ISignin) => {
    signinMutation.mutate(values);
  };

  const initialValues: ISignin = {
    email: "",
    password: ""
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
      <ModalContent>
        <ModalBody>
          <ModalHeader textAlign={"center"}>Log In</ModalHeader>
          <ModalCloseButton />

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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ShowLoginModal;
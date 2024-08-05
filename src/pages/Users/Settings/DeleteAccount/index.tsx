import { FunctionComponent } from 'react'
import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import { Alert, Button } from '@components/index'
import { useDeleteAccount } from '@hooks/user/useDeleteAccount'

const DeleteAccount: FunctionComponent = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  const { deleteAccountMutation } = useDeleteAccount();

  const hanldeDeleteAccount = () => {
    deleteAccountMutation.mutate();
  }

  return (
    <>
      <Card>
        <CardBody>
          <Heading as={"h5"} size={"md"} color={"red"}>Danger Zone</Heading>
          <Text my={"8px"} fontSize={"17px"} lineHeight={"1.6em"} color={"#0009"}>
            Please be aware that deleting your account will also remove all of your data, including your threads and articles.
          </Text>

          <Box textAlign={"right"} mt={"10"}>
            <Button
              variant="danger"
              size={{ base: "sm", lg: "md" }}
              width={{ base: "100%", lg: "auto" }}
              type="button"
              fontWeight={"semibold"}
              rounded="sm"
              onClick={onOpen}
            >
              Delete Account
            </Button>
          </Box>
        </CardBody>
      </Card>

      <Alert 
        isOpen={isOpen}
        onClose={onClose}
        alertHeader="Delete your account"
        alertBody="Are you sure? You can't undo this action afterwards."
        handleDelete={hanldeDeleteAccount}
        isLoading={deleteAccountMutation.isPending}
      />
    </>
  )
}

export default DeleteAccount
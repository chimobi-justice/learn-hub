import { FunctionComponent, useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  HStack,
} from '@chakra-ui/react'

import Button from '@components/Button'

interface IProps {
  alertHeader: string;
  alertBody: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  handleDelete: () => void;
}

const Alert: FunctionComponent<IProps> = ({
  alertHeader,
  alertBody,
  handleDelete,
  isLoading,
  isOpen,
  onClose
}) => {
  const cancelRef = useRef(null)

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {alertHeader}
          </AlertDialogHeader>

          <AlertDialogBody>
            {alertBody}
          </AlertDialogBody>

          <AlertDialogFooter>
            <HStack spacing={3} textAlign={"center"} margin={"0px auto"}>
              <Button
                variant="outline"
                size="md"
                type="button"
                fontWeight={"semibold"}
                rounded="lg"
                onClick={onClose}
              >
                Cancel

              </Button>

              <Button
                variant="danger"
                size="md"
                type="button"
                fontWeight={"semibold"}
                rounded="lg"
                onClick={handleDelete}
                isloading={isLoading}
              >
                Delete
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default Alert;
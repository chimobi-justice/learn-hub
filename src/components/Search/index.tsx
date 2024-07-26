import { FunctionComponent, useRef } from 'react'
import {
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import Button from '@components/Button'

const Search: FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  return (
    <>
      <Button
        size="md"
        rounded="md"
        type="button"
        variant="outline"
        onClick={onOpen}

      >
        <FiSearch />
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={"2xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody py={6}>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <FiSearch />
              </InputLeftElement>
              <Input type='tel' placeholder="Search..." ref={initialRef} />
            </InputGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Search;
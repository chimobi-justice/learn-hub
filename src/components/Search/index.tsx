import { ChangeEvent, FunctionComponent, useEffect, useRef, useState } from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import Button from '@components/Button'
import { useGetSearch } from '@hooks/search/useGetSearch'
import { Link } from 'react-router-dom'
import truncate from '@helpers/truncate'

const Search: FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchArr, setSearchArr] = useState<any>([]);

  const { data, isLoading, isError } = useGetSearch(searchQuery);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    setSearchQuery(value);

    if (value.length === 0) {
      // Clear the search results if input is cleared
      setSearchArr([]);
    }
  }

  useEffect(() => {
    if (searchQuery?.length > 0 && data) {
      setSearchArr((prev: any) => 
        [...prev, ...data?.articles?.data, ...data?.threads?.data]
      )
    }
  }, [data, searchQuery])

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
          <ModalBody py={6} overflow={"auto"}>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <FiSearch />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search for articles, threads..."
                value={searchQuery}
                onChange={handleInputChange}
                ref={initialRef}
              />
            </InputGroup>

            <Box mt={"10px"}>
              {isLoading ? (
                <Box textAlign={"center"}>
                  <Spinner />
                </Box>
              ) : isError ? (
                <Text color="red.500">Error fetching data</Text>
              ) : (
                <Box width={"100%"} maxH="400px" overflowY="auto">
                  {searchArr?.length > 0 ? (
                    searchArr?.map((d: any, index: number) => (
                      <Text
                        key={index}
                        fontSize={"14px"}
                        my={"12px"}
                        p={"10px"}
                        cursor={"pointer"}
                        _hover={{
                          bg: "#f1f1f1"
                        }}
                      >
                        <Link to={d?.url} onClick={onClose} style={{ display: "block"}}>
                          {truncate(d?.title, 200)}
                        </Link>
                      </Text>
                    ))
                  ) : (
                    <Text>No data found!</Text>
                  )}
                </Box>
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Search;
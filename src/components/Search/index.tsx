import { ChangeEvent, FunctionComponent, useRef, useState } from 'react'
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import Button from '@components/Button'
import { colors } from '../../colors'
import { useGetSearch } from '@hooks/search/useGetSearch'
import { Link } from 'react-router-dom'
import truncate from '@helpers/truncate'

const Search: FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [searchQuery, setSearchQuery] = useState<string>('')

  const { data, isLoading, isError } = useGetSearch(searchQuery);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e?.target?.value)
  }

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
              <Input
                type="text"
                placeholder="Search for articles, threads and users..."
                value={searchQuery}
                onChange={handleInputChange}
                ref={initialRef}
              />
            </InputGroup>

            <Box mt={"10px"}>
              <Tabs isFitted variant='enclosed'>
                <TabList mb='1em' color={colors.primary}>
                  <Tab>Articles {data?.articles?.total}</Tab>
                  <Tab>Threads {data?.threads?.total}</Tab>
                  <Tab>Users {data?.users?.total}</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel p={"5px"}>
                    {isLoading ? (
                      <Box textAlign={"center"}>
                        <Spinner />
                      </Box>
                    ) : isError ? (
                      <Text color="red.500">Error fetching data</Text>
                    ) : (
                      <Box width={"100%"}>
                        {data?.articles?.data?.length > 0 ? (
                          data?.articles?.data?.map((article: any, index: number) => (
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
                              <Link to={`/articles/${article?.slug}/${article?.id}`} onClick={onClose}>
                                {truncate(article?.title, 200)}
                              </Link>
                            </Text>
                          ))
                        ) : (
                          <Text>No articles found</Text>
                        )}
                      </Box>
                    )}
                  </TabPanel>
                  <TabPanel>
                    {isLoading ? (
                      <Box textAlign={"center"}>
                        <Spinner />
                      </Box>
                    ) : isError ? (
                      <Text color="red.500">Error fetching data</Text>
                    ) : (
                      <Box>
                        {data?.threads?.data?.length > 0 ? (
                          data?.threads?.data?.map((thread: any, index: number) => (
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
                              <Link to={`/threads/${thread?.slug}/${thread?.id}`} onClick={onClose}>
                                {truncate(thread?.title, 200)}
                              </Link>
                            </Text>
                          ))
                        ) : (
                          <Text>No threads found</Text>
                        )}
                      </Box>
                    )}
                  </TabPanel>
                  <TabPanel>
                    {isLoading ? (
                      <Box textAlign={"center"}>
                        <Spinner />
                      </Box>
                    ) : isError ? (
                      <Text color="red.500">Error fetching data</Text>
                    ) : (
                      <Box>
                        {data?.users?.data?.length > 0 ? (
                          data?.users?.data?.map((user: any, index: number) => (
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
                              <Link to={`/user/${user?.username}`} onClick={onClose}>
                                {truncate(user?.fullname, 200)}
                              </Link>
                            </Text>
                          ))
                        ) : (
                          <Text>No users found</Text>
                        )}
                      </Box>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Search;
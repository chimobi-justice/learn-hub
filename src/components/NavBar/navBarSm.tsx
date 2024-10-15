import { FunctionComponent, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Box,
  Flex,
  VStack,
  Heading,
  Icon,
  List,
  ListItem,
  Text,
  HStack,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  MenuDivider,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { IoMdList, IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { GoPerson } from 'react-icons/go'
import { RiArticleFill } from 'react-icons/ri'
import { RiChatThreadLine } from 'react-icons/ri'
import { CiViewList } from 'react-icons/ci'
import { IoSettingsOutline } from 'react-icons/io5'
import { FiSearch } from 'react-icons/fi'

import { colors } from '../../colors'
import { Button } from '@components/index'
import { Menu } from '@constant/Menu'
import { useUser } from '@context/userContext'
import { useSignOut } from '@hooks/auth/useSignOut'

const NavBarSm: FunctionComponent = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const buttonRef = useRef(null);

  const { user } = useUser();
  const { signOutMutation } = useSignOut()

  return (
    <>
      <Flex
        as="nav"
        alignItems="center"
        justify="space-between"
        bg={colors.secondary}
        p="8px"
        w="100%"
        display={{ base: 'flex', md: 'none' }}
        borderBottom={"2px solid #f1f1f1"}
      >
        <Link to="/">
          <Heading
            as="h4"
            display={"flex"}
            gap={2}
            size="lg"
            fontStyle={"italic"}
            color={colors.primary}
          >
            Learn <Text color={"#000"}>Hub</Text>
          </Heading>
        </Link>

        <HStack spacing={3}>
          <Link
            to={"/search"}
          >
            <Button
              size="md"
              rounded="md"
              type="button"
              variant="outline"
            >
              <FiSearch />
            </Button>
          </Link>
          <Icon
            as={IoMdList}
            boxSize={10}
            onClick={onOpen}
            cursor="pointer"
          />
        </HStack>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={buttonRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader mb={"10px"}>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <List alignItems="start" mt="2rem" w="100%">
              {Menu?.map((menu) => (
                <ListItem
                  w="100%"
                  mb="20px"
                  key={menu.id}
                >
                  <NavLink
                    to={menu.url}
                    className="aside_link"
                    key={menu.id}
                  >
                    <Text
                      display="flex"
                      pl={"18px"}
                      alignItems="center"
                      gap="3"
                      fontSize={"14px"}
                      fontWeight={"400"}
                    >
                      {menu.name}
                    </Text>
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </DrawerBody>

          <DrawerFooter>
            <Box py="20px" w="100%">
              {user ? (
                <Box position={"absolute"} bottom={"10px"}>
                  <ChakraMenu>
                    {({ isOpen }) => (
                      <>
                        <MenuButton as={Box} cursor="pointer">
                          <Box display={"flex"} alignItems={"center"} gap="20px">
                            <Box display={"flex"} alignItems={"center"} gap="12px">
                              <Avatar
                                size={"sm"}
                                name={user?.data?.fullname}
                                src={user?.data?.avatar}
                              />
                              <Box>
                                <Text
                                  fontSize={"14px"}
                                  fontWeight={400}
                                  color={colors.primary}
                                >
                                  {user?.data?.fullname}
                                </Text>
                              </Box>
                            </Box>
                            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                          </Box>
                        </MenuButton>
                        <MenuList>
                          <Link
                            to={`/${user?.data?.username}`}
                          >
                            <MenuItem color={"blcack"}>
                              <GoPerson style={{ marginRight: "4px" }} /> Your Profile
                            </MenuItem>
                          </Link>
                          <Link
                            to={`/me/articles/${user?.data?.username}`}
                          >
                            <MenuItem color={"black"}>
                              <RiArticleFill style={{ marginRight: "4px" }} /> Your Articles
                            </MenuItem>
                          </Link>
                          <Link
                            to={`/me/threads/${user?.data?.username}`}
                          >
                            <MenuItem color={"black"}>
                              <RiChatThreadLine style={{ marginRight: "4px" }} /> Your Theads
                            </MenuItem>
                          </Link>
                          <Link
                            to={`/${user?.data?.username}/reading-list`}
                          >
                            <MenuItem color={"black"}>
                              <CiViewList style={{ marginRight: "4px" }} /> Reading List
                            </MenuItem>
                          </Link>
                          <Link
                            to="/me/settings/account/edit"
                          >
                            <MenuItem color={"black"}>
                              <IoSettingsOutline style={{ marginRight: "4px" }} /> Settings
                            </MenuItem>
                          </Link>
                          <MenuDivider />
                          <MenuItem color={"black"} onClick={() => signOutMutation.mutate()}>
                            <FaRegUser style={{ marginRight: "4px" }} />  Logout
                          </MenuItem>
                        </MenuList>
                      </>
                    )}
                  </ChakraMenu>
                </Box>
              ) : (
                <VStack spacing={5}>
                  <Link to="/auth/login" style={{ width: "100%" }}>
                    <Button
                      variant="outline"
                      size="lg"
                      width="100%"
                      type="button"
                      fontWeight={"semibold"}
                      rounded="sm"
                    >
                      Sign in
                    </Button>
                  </Link>

                  <Link to="/auth/register" style={{ width: "100%" }}>
                    <Button
                      variant="solid"
                      size="lg"
                      width="100%"
                      type="button"
                      fontWeight={"semibold"}
                      rounded="sm"
                    >
                      Sign up
                    </Button>
                  </Link>
                </VStack>
              )}
            </Box>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/* Box drawer */}
    </>
  )
}

export default NavBarSm;
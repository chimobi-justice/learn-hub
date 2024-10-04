import { FunctionComponent, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Box,
  Flex,
  VStack,
  Heading,
  Icon,
  List,
  ListItem,
  Spacer,
  Text,
  HStack,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  MenuDivider,
} from '@chakra-ui/react'
import {
  IoIosCloseCircleOutline,
  IoMdList,
  IoIosArrowUp,
  IoIosArrowDown
} from 'react-icons/io'
import { FaRegUser } from 'react-icons/fa'
import { GoPerson } from 'react-icons/go'
import { FiSearch } from 'react-icons/fi'
import { RiArticleFill } from 'react-icons/ri'
import { RiChatThreadLine } from 'react-icons/ri'
import { CiViewList } from 'react-icons/ci'
import { IoSettingsOutline } from 'react-icons/io5'

import { colors } from '../../colors'
import { Button } from '@components/index'
import { Menu } from '@constant/Menu'
import { useUser } from '@context/userContext'
import { useSignOut } from '@hooks/auth/useSignOut'

const NavBarSm: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { user } = useUser();
  const { signOutMutation } = useSignOut()

  const handleLoggedOut = () => {
    signOutMutation.mutate();
  };

  const handleDrawerBox = () => {
    setOpen((prevState) => !prevState);
  }

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
          <Icon
            as={IoMdList}
            boxSize={10}
            onClick={handleDrawerBox}
            cursor="pointer"
          />
        </HStack>
      </Flex>

      {/* Box drawer */}
      {open && (
        <>
          <Box
            bg={colors.secondary}
            w="100%"
            h="100%"
            position="fixed"
            top="0"
            zIndex="10"
            display={{ base: 'block', md: 'none' }}
          >
            <Box
              borderColor="gray.300"
              display="flex"
              borderBottom="1px"
              p="8px"
              alignItems="center"
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

              <Spacer />
              <Icon
                as={IoIosCloseCircleOutline}
                boxSize={10}
                onClick={handleDrawerBox}
                cursor="pointer"
              />
            </Box>

            <Box p={"10px"}>
              <Link
                to={"/search"}
                onClick={() => setOpen(false)}
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

              <List alignItems="start" mt="2rem" w="100%">
                {Menu?.map((menu) => (
                  <ListItem w="100%" mb="20px" key={menu.id}>
                    <NavLink
                      to={menu.url}
                      key={menu.id}
                      onClick={() => setOpen(false)}
                    >
                      {menu.name}
                    </NavLink>
                  </ListItem>
                ))}
              </List>

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
                              onClick={() => setOpen(false)}
                            >
                              <MenuItem color={"blcack"}>
                                <GoPerson style={{ marginRight: "4px" }} /> Your Profile
                              </MenuItem>
                            </Link>
                            <Link
                              to={`/me/articles/${user?.data?.username}`}
                              onClick={() => setOpen(false)}
                            >
                              <MenuItem color={"black"}>
                                <RiArticleFill style={{ marginRight: "4px" }} /> Your Articles
                              </MenuItem>
                            </Link>
                            <Link
                              to={`/me/threads/${user?.data?.username}`}
                              onClick={() => setOpen(false)}
                            >
                              <MenuItem color={"black"}>
                                <RiChatThreadLine style={{ marginRight: "4px" }} /> Your Theads
                              </MenuItem>
                            </Link>
                            <Link
                              to={`/${user?.data?.username}/reading-list`}
                              onClick={() => setOpen(false)}
                            >
                              <MenuItem color={"black"}>
                                <CiViewList style={{ marginRight: "4px" }} /> Reading List
                              </MenuItem>
                            </Link>
                            <Link
                              to="/me/settings/account/edit"
                              onClick={() => setOpen(false)}
                            >
                              <MenuItem color={"black"}>
                                <IoSettingsOutline style={{ marginRight: "4px" }} /> Settings
                              </MenuItem>
                            </Link>
                            <MenuDivider />
                            <MenuItem color={"black"} onClick={handleLoggedOut}>
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
                        onClick={() => setOpen(false)}
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
                        onClick={() => setOpen(false)}
                      >
                        Sign up
                      </Button>
                    </Link>
                  </VStack>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}

      {/* Box drawer */}
    </>
  )
}

export default NavBarSm;
import { FunctionComponent } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  HStack,
  Text,
  Menu as ChakraMenu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  MenuDivider,
} from '@chakra-ui/react'
import { FaRegUser } from 'react-icons/fa'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { GoPerson } from 'react-icons/go'
import { FiSearch } from 'react-icons/fi'
import { RiArticleFill } from 'react-icons/ri'
import { RiChatThreadLine } from 'react-icons/ri'
import { CiViewList } from 'react-icons/ci'
import { IoSettingsOutline } from 'react-icons/io5'

import { Button } from '@components/index'
import { colors } from '../../colors'
import { Menu } from '@constant/Menu'
import { useUser } from '@context/userContext'
import { useSignOut } from '@hooks/auth/useSignOut'

const NavBarLg: FunctionComponent = () => {
  const { user } = useUser();
  const { signOutMutation } = useSignOut();

  return (
    <Box
      as="nav"
      bg={colors.secondary}
      display={{ base: 'none', md: 'flex' }}
      borderBottom={"2px solid #f1f1f1"}
    >
      <Container maxW={"container.xl"}>
        <Box
          alignItems="center"
          display={"flex"}
          justifyContent="space-between"
          py={"20px"}
        >
          <Link to="/">
            <Heading
              fontStyle={"italic"}
              fontWeight={"bold"}
              as="h4"
              color={colors.primary}
              size={{ base: "xs", md: "lg", lg: "2xl"}}
            >
              Learn <Text as="span" color={"#000"}>Hub</Text>
            </Heading>
          </Link>

          <Box
            display={"inline-flex"}
            gap={10}
            alignItems={"center"}
            justifyContent={"center"}
            w={"50%"}
            fontSize={"16px"}
            fontWeight={"bold"}
          >
            {Menu?.map((menu) => (
              <NavLink
                to={menu.url}
                key={menu.id}
              >
                {menu.name}
              </NavLink>
            ))}
          </Box>

          <Box display={"flex"} gap={4} alignItems={"center"}>
            <Link to={"/search"}>
              <Button
                size="md"
                rounded="md"
                type="button"
                variant="outline"
              >
                <FiSearch />
              </Button>
            </Link>

            {user ? (
              <Box display={"block"}>
                <ChakraMenu isLazy>
                  {({ isOpen }) => (
                    <>
                      <MenuButton as={Box} cursor="pointer" display={"block"}>
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
                                color={"#000"}
                              >
                                {user?.data?.fullname}
                              </Text>
                            </Box>
                          </Box>
                          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                        </Box>
                      </MenuButton>
                      <MenuList>
                        <Link to={`/${user?.data?.username}`} style={{ display: "block" }}>
                          <MenuItem color={"black"}>
                            <GoPerson style={{ marginRight: "4px" }} /> Your Profile
                          </MenuItem>
                        </Link>
                        <Link to={`/me/articles/${user?.data?.username}`} style={{ display: "block" }}>
                          <MenuItem color={"black"}>
                            <RiArticleFill style={{ marginRight: "4px" }} /> Your Articles
                          </MenuItem>
                        </Link>
                        <Link to={`/me/threads/${user?.data?.username}`} style={{ display: "block" }}>
                          <MenuItem color={"black"}>
                            <RiChatThreadLine style={{ marginRight: "4px" }} /> Your Threads
                          </MenuItem>
                        </Link>
                        <Link to={`/${user?.data?.username}/reading-list`} style={{ display: "block" }}>
                          <MenuItem color={"black"}>
                            <CiViewList style={{ marginRight: "4px" }} /> Reading List
                          </MenuItem>
                        </Link>
                        <Link to="/me/settings/account/edit" style={{ display: "block" }}>
                          <MenuItem color={"black"}>
                            <IoSettingsOutline style={{ marginRight: "4px" }} /> Settings
                          </MenuItem>
                        </Link>
                        <MenuDivider />
                        <MenuItem color={"black"} onClick={() => signOutMutation.mutate()}>
                          <FaRegUser style={{ marginRight: "4px" }} /> Logout
                        </MenuItem>
                      </MenuList>
                    </>
                  )}
                </ChakraMenu>
              </Box>
            ) : (
              <HStack spacing={4}>
                <Link to="/auth/login">
                  <Button
                    variant="outline"
                    size="md"
                    type="button"
                    fontWeight={"semibold"}
                    rounded="lg"
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/auth/register">
                  <Button
                    variant="solid"
                    size="md"
                    type="button"
                    fontWeight={"semibold"}
                    rounded="lg"
                    leftIcon={<FaRegUser />}
                  >
                    Sign up
                  </Button>
                </Link>
              </HStack>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default NavBarLg
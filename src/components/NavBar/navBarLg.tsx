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

import Button from '@components/Button'
import { colors } from '../../colors'
import { Menu } from '@constant/Menu'

const NavBarLg: FunctionComponent = () => {
  const isLoggedIn = false;

  return (
    <Box
      as="nav"
      bg={colors.secondary}
      display={{ base: 'none', md: 'flex' }}
    >
      <Container maxW={"container.xl"}>
        <Box
          alignItems="center"
          display={"flex"}
          justifyContent="space-between"
          py={"20px"}
        >
          <Heading
            fontStyle={"italic"}
            fontWeight={"bold"}
            as="h4"
            color={colors.primary}
          >
            Learn <Text as="span" color={"#000"}>Hub</Text>
          </Heading>

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


          {isLoggedIn ? (
            <Box>
              <ChakraMenu>
                {({ isOpen }) => (
                  <>
                    <MenuButton as={Box} cursor="pointer">
                      <Box display={"flex"} alignItems={"center"} gap="20px">
                        <Box display={"flex"} alignItems={"center"} gap="12px">
                          <Avatar
                            size={"sm"}
                            name="justice chimobi"
                          />
                          <Box>
                            <Text
                              fontSize={"14px"}
                              fontWeight={400}
                              color={colors.primary}
                            >
                              Justice Chimobi
                            </Text>
                          </Box>
                        </Box>
                        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                      </Box>
                    </MenuButton>
                    <MenuList>
                      <Link to="/me/@justice-chimobi">
                        <MenuItem color={"blcack"}>
                          Your Profile
                        </MenuItem>
                      </Link>
                      <Link to="/me/views/@justice-chimobi">
                        <MenuItem color={"black"}>
                          Your Stories
                        </MenuItem>
                      </Link>
                      <Link to="/me/settings/account/edit">
                        <MenuItem color={"black"}>
                          Settings
                        </MenuItem>
                      </Link>
                      <MenuDivider />
                      <MenuItem color={"black"}>
                        Logout
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
      </Container>
    </Box>
  )
}

export default NavBarLg
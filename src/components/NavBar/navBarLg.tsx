import { FunctionComponent } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Box, Container, Heading, HStack, Text } from '@chakra-ui/react'
import { FaRegUser } from 'react-icons/fa'

import Button from '@components/Button'
import { colors } from '../../colors'
import { Menu } from '@constant/Menu'

const NavBarLg: FunctionComponent = () => {
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
        </Box>
      </Container>
    </Box>
  )
}

export default NavBarLg
import { FunctionComponent, useState } from 'react'
import { NavLink } from 'react-router-dom'
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
  HStack
} from '@chakra-ui/react'
import {
  IoIosCloseCircleOutline,
  IoMdList
} from 'react-icons/io'

import { colors } from '../../colors'
import { Button } from '@components/index'
import { Menu } from '@constant/Menu'

const NavBarSm: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);

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

              <Spacer />
              <Icon
                as={IoIosCloseCircleOutline}
                boxSize={10}
                onClick={handleDrawerBox}
                cursor="pointer"
              />
            </Box>

            <Box p={"10px"}>
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
                <VStack spacing={5}>
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
                </VStack>
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